#!/bin/bash
docker-compose run --rm --no-deps backend python3 manage.py generateschema --generator_class='config.scheme_generator.SchemaGenerator' --file v1-schema.yaml
cd clients
docker run --rm -v ${PWD}:/local openapitools/openapi-generator-cli generate -i /local/v1-schema.yaml -g typescript-fetch -o /local/api --additional-properties=typescriptThreePlus=true --additional-properties=npmName='@upwardli/api'