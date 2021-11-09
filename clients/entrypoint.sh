#!/bin/bash

rm /app/shared/env.ts
touch /app/shared/env.ts
echo \
    "export const NEXT_PUBLIC_UPWARDLI_API_HOST = \"${NEXT_PUBLIC_UPWARDLI_API_HOST}\";" \
    >> /app/shared/env.ts
echo \
    "export const NEXT_PUBLIC_UPWARDLI_RUNTIME_CONTEXT = \"${NEXT_PUBLIC_UPWARDLI_RUNTIME_CONTEXT}\";" \
    >> /app/shared/env.ts
echo \
    "export const NEXT_PUBLIC_GOOGLE_ANALYTICS_ID = \"${NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}\";" \
    >> /app/shared/env.ts

# Required if NEXT_PUBLIC_UPWARDLI_RUNTIME_CONTEXT = web
echo \
    "export const NEXT_PUBLIC_UPWARDLI_WEB_CONTEXT = \"${NEXT_PUBLIC_UPWARDLI_WEB_CONTEXT}\";" \
    >> /app/shared/env.ts

exec "$@"
