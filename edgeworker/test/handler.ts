import * as chai from 'chai'
import * as chaiFetchMock from 'chai-fetch-mock'

import * as fetch from 'isomorphic-fetch'

import { getKVNamespacePrefix, getUpstreamHostname } from '../src/handler'
import {
  DEFAULT_BRANCH_BUILD_NAME,
  ENVIRONMENT_STAGING,
  ENVIRONMENT_STAGING_EMBEDDED,
  UPSTREAM_CONTENT_HOSTNAME,
} from '../src/constants'

declare var global: any
global.fetch = fetch

const expect = chai.expect
chai.use(chaiFetchMock)

describe('getKVNamespacePrefix derives branchname from the hostname', () => {
  it('should return main for staging.upwardli.com', () => {
    global.self.ENVIRONMENT = ENVIRONMENT_STAGING
    expect(getKVNamespacePrefix('staging.upwardli.com')).to.equal('main')
  })
  it('should return main for embedded-staging.upwardli.com', () => {
    global.self.ENVIRONMENT = ENVIRONMENT_STAGING_EMBEDDED
    expect(getKVNamespacePrefix('embedded-staging.upwardli.com')).to.equal(
      'main',
    )
  })
  it('should return issue-20 is branch build with issue-20-staging.upwardli.com', () => {
    global.self.ENVIRONMENT = ENVIRONMENT_STAGING
    expect(getKVNamespacePrefix('issue-20-staging.upwardli.com')).to.equal(
      'issue-20',
    )
  })
  it('should return issue-20 is branch build with issue-20-embedded-staging.upwardli.com', () => {
    global.self.ENVIRONMENT = ENVIRONMENT_STAGING_EMBEDDED
    expect(
      getKVNamespacePrefix('issue-20-embedded-staging.upwardli.com'),
    ).to.equal('issue-20')
  })
})

describe('getUpstreamHostname respects /core subpath', () => {
  it('should return UPSTEAM_CORE_HOSTNAME for /core/foo', () => {
    global.self.UPSTREAM_CORE_HOSTNAME = 'foo.bar.com'
    expect(getUpstreamHostname('/core/foo')).to.equal(
      global.self.UPSTREAM_CORE_HOSTNAME,
    )
  })

  it('should return UPSTREAM_CONTENT_HOSTNAME for other paths', () => {
    expect(getUpstreamHostname('/foo/bar')).to.equal(UPSTREAM_CONTENT_HOSTNAME)
  })
})
