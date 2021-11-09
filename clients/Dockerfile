FROM node:16-alpine AS base

RUN apk add --no-cache bash

RUN mkdir /app
WORKDIR /app

# Dependencies
COPY package.json .
COPY package-lock.json .

## web
COPY web/package.json web/package.json

## native
COPY native/package.json native/package.json

## shared
COPY shared/package.json shared/package.json

## api - run required install steps for transpile
COPY api/ api/
WORKDIR /app/api
RUN npm install
RUN npm run build
WORKDIR /app

## install
RUN npm install

# OpenAPI Spec
COPY v1-schema.yaml .

###
# Everything from here down should be mounted
# in docker-compose.yml for development
###

# client root files
COPY entrypoint.sh .
COPY tsconfig.json .
COPY .prettierrc.json .
COPY .prettierignore .

# Include in web docker-compose mounts
COPY web/ web/

# Include in native docker-compose mounts
COPY native/ native/

# Include in web+native docker-compose mounts
COPY shared/ shared/

# See entrypoint.sh for required environment variables
ENTRYPOINT [ "/app/entrypoint.sh" ]

ENV CMD dev

FROM base as native_base

# Expo & EAS CLI for React Native
RUN npm install -g expo-cli eas-cli

FROM base as web_base

ARG NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
ARG NEXT_PUBLIC_UPWARDLI_API_HOST

RUN rm shared/env.ts
RUN touch shared/env.ts
# NEXT_PUBLIC_UPWARDLI_API_HOST isn't used on the client-side
RUN echo \
    "export const NEXT_PUBLIC_UPWARDLI_API_HOST = \"${NEXT_PUBLIC_UPWARDLI_API_HOST}\";" \
    >> shared/env.ts
RUN echo \
    "export const NEXT_PUBLIC_UPWARDLI_RUNTIME_CONTEXT = \"web\";" \
    >> shared/env.ts
RUN echo \
    "export const NEXT_PUBLIC_GOOGLE_ANALYTICS_ID = \"${NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}\";" \
    >> shared/env.ts

FROM web_base AS web_prod_full

RUN echo \
    "export const NEXT_PUBLIC_UPWARDLI_WEB_CONTEXT = \"full\";" \
    >> shared/env.ts
RUN npm run build --workspace=web
RUN npm run export --workspace=web

FROM web_base as web_prod_embedded

RUN echo \
    "export const NEXT_PUBLIC_UPWARDLI_WEB_CONTEXT = \"embedded\";" \
    >> shared/env.ts
RUN npm run build --workspace=web
RUN npm run export --workspace=web
