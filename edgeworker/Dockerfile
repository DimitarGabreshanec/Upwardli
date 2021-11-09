# Defined globally so it can be used in upload stage
# but unused during other usage.
# Should be modified for use
ARG WEB_SOURCE_IMAGE=node:16
FROM node:16 as base

# Wrangler for Cloudflare uploads
RUN npm i @cloudflare/wrangler -g

RUN mkdir /app
WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm i

COPY .prettierrc .
COPY wrangler.toml .
COPY webpack.config.js .
COPY tsconfig.json .

COPY README.md .
COPY src/ src/
COPY test/ test/
COPY bin/ bin/

FROM base as dev

# Need to run unit tests
RUN mkdir /app/transpiled
RUN chown -R node:node .

ENV DEBIAN_FRONTEND="noninteractive"
RUN apt-get update -q

RUN apt-get install -y python3-pip
RUN pip3 install requests black

# Intermediate stage for assets
FROM $WEB_SOURCE_IMAGE as upload

# Used to upload assets to KV store
FROM base as cf_upload

COPY --from=upload /app/web/out/ /out/
