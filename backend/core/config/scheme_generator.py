from rest_framework.schemas.openapi import SchemaGenerator as JSONAPISchemaGenerator


class SchemaGenerator(JSONAPISchemaGenerator):
    """
    Extend the schema to include some documentation and override not-yet-implemented security.
    """

    def get_schema(self, request=None, public=False):
        schema = super().get_schema(request, public)

        # temporarily add securitySchemes until implemented upstream
        if "securitySchemes" not in schema["components"]:
            schema["components"]["securitySchemes"] = {
                "basicAuth": {
                    "type": "http",
                    "scheme": "basic",
                    "description": "basic authentication",
                },
                "bearerAuth": {
                    "type": "http",
                    "scheme": "bearer",
                    "bearerFormat": "JWT",
                },
            }

        if "security" not in schema:
            schema["security"] = [{"basicAuth": []}, {"bearerAuth": []}]

        return schema
