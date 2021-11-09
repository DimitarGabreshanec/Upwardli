import {
  getAssetFromKV,
  mapRequestToAsset,
  MethodNotAllowedError,
  NotFoundError,
} from '@cloudflare/kv-asset-handler'

import {
  UPSTREAM_CONTENT_HOSTNAME,
  DEFAULT_BRANCH_BUILD_NAME,
  ENVIRONMENT_PROD,
  WEB_CONTEXT_FULL,
  ENVIRONMENT_STAGING,
  ENVIRONMENT_STAGING_EMBEDDED,
} from './constants'

declare const self: ServiceWorkerGlobalScope & {
  ENVIRONMENT: string
  WEB_CONTEXT: string
  UPSTREAM_CORE_HOSTNAME: string
}

const BLOG_URL_PREFIX = '/building-credit-tips-blog/'

export function getKVNamespacePrefix(hostname: string) {
  let match: RegExpExecArray | null = null
  if (self.ENVIRONMENT === ENVIRONMENT_STAGING) {
    match = /(.*)\-staging.upwardli\.com/.exec(hostname)
  } else if (self.ENVIRONMENT === ENVIRONMENT_STAGING_EMBEDDED) {
    match = /(.*)\-embedded\-staging.upwardli\.com/.exec(hostname)
  }
  if (match !== null) {
    return match[1]
  }
  // Fallback to default branch
  return DEFAULT_BRANCH_BUILD_NAME
}

export function getUpstreamHostname(pathname: string): string {
  if (pathname.startsWith('/core/')) {
    return self.UPSTREAM_CORE_HOSTNAME
  }
  return UPSTREAM_CONTENT_HOSTNAME
}

// based on a lot of examples from Cloudflare: https://developers.cloudflare.com/workers/examples
class RemoveElementHandler {
  async element(element: Element) {
    element.remove()
  }
}

export function getRewriter(request: Request): HTMLRewriter | null {
  if (self.WEB_CONTEXT === WEB_CONTEXT_FULL) {
    return null
  }
  let rewriter = new HTMLRewriter()
    .on('header', new RemoveElementHandler())
    .on('footer', new RemoveElementHandler())
    .on('section.item-pagination', new RemoveElementHandler())

  // For the blog we need an extra rewriter element
  const pathname = new URL(request.url).pathname
  if (pathname.startsWith(BLOG_URL_PREFIX)) {
    rewriter.on('div.blog-item-meta-wrapper', new RemoveElementHandler())
  }
  return rewriter
}

// main handler for the request
export async function handleFetchEvent(event: FetchEvent): Promise<Response> {
  const prependKeyPrefixModifier = (request: Request) => {
    const url = new URL(request.url)
    const prefix = getKVNamespacePrefix(url.hostname)
    url.pathname = prefix + '/' + url.pathname
    return mapRequestToAsset(new Request(url.toString(), request))
  }
  let response: Response | null
  // Try KV lookup except for homepage special-case
  try {
    // Special case bypass for homepage
    if (new URL(event.request.url).pathname === '/') {
      throw new NotFoundError()
    }
    response = await getAssetFromKV(event, {
      mapRequestToAsset: prependKeyPrefixModifier,
      ASSET_NAMESPACE: NEXTJS_SITE,
    })
  } catch (error) {
    // Not found or method not allowed
    if (
      error instanceof NotFoundError ||
      error instanceof MethodNotAllowedError
    ) {
      // Fallback to routed upstream fetch
      const url = new URL(event.request.url)
      const hostname = getUpstreamHostname(url.pathname)
      const request = new Request(event.request.url, {
        body: event.request.body,
        headers: event.request.headers,
        method: event.request.method,
        redirect: event.request.redirect,
      })
      request.headers.append('X-Forwarded-Host', url.hostname)
      url.hostname = hostname
      response = await fetch(url.toString(), request)
    } else {
      console.log(error)
      return new Response('An unexpected error occurred', {
        status: 500,
      })
    }
  }

  // Always include noindex header except for prod/full
  if (
    !(
      self.ENVIRONMENT === ENVIRONMENT_PROD &&
      self.WEB_CONTEXT === WEB_CONTEXT_FULL
    )
  ) {
    response = new Response(response.body, response)
    response.headers.append('X-Robots-Tag', 'noindex')
  }

  const rewriter = getRewriter(event.request)
  if (rewriter !== null) {
    return rewriter.transform(response)
  }

  return response
}
