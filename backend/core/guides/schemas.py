from typing import Dict, Any, List

from rest_framework import serializers
from rest_framework.schemas.openapi import AutoSchema

from guides.serializers import (
    GuideStaticPageSerializer,
    GuideSimpleFormSerializer,
    GuideStepCustomContentSerializer,
)

CONTENT_SERIALIZERS = [
    GuideStaticPageSerializer,
    GuideSimpleFormSerializer,
    GuideStepCustomContentSerializer,
]  # pylint: disable=unbalanced-tuple-unpacking


class ContentTypeSchema(AutoSchema):
    """Extension of ``AutoSchema`` to add support for custom field schemas."""

    def map_field(self, field):
        """Override map_field for content type."""
        if isinstance(field, serializers.SerializerMethodField):
            data: Dict[str, Any] = {}
            properties: List[Dict[str, Any]] = []
            for serializer in CONTENT_SERIALIZERS:
                not_required_serializer = serializer()
                not_required_serializer.required = False  # type: ignore
                field_properties = self.map_serializer(not_required_serializer).get(
                    "properties"
                )
                if field_properties:
                    properties.append(field_properties)
            type1, type2, type3 = properties
            data["properties"] = {**type1, **type2, **type3}
            data["required"] = []
            data["type"] = "object"
            return data
        return super().map_field(field)
