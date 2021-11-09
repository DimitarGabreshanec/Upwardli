# Generate OpenAPI Interface

```
$ docker run --rm -v ${PWD}:/local openapitools/openapi-generator-cli generate -i /local/v1-schema.yaml -g typescript-fetch -o /local/api --additional-properties=typescriptThreePlus=true --additional-properties=npmName='@upwardli/api'
$ sudo chown -R ${USER}:${USER} api/
```
