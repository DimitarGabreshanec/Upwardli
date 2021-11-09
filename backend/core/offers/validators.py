from django.core.exceptions import ValidationError
from jsonschema import validate, ValidationError as SchemaValidationError, SchemaError

props_schema = {
    "type": "array",
    "items": {
        "object": {
            "properties": {
                "text": {"type": "string"},
                "icon": {"type": "string"},
            },
            "required": [
                "text",
            ],
        }
    },
}


def validate_json(value, schema) -> None:
    """Json validator."""
    try:
        validate(instance=value, schema=schema)
    except (SchemaValidationError, SchemaError) as ex:
        raise ValidationError from ex(
            "%(value)s does not match the schema %(schema)s details: %(ex)s",
            params={"value": value, "schema": schema, "ex": str(ex)},
        )


def validate_props(value):
    """Validate json field"""
    return validate_json(value, props_schema)
