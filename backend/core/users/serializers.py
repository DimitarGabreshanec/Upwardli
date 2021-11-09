from dj_rest_auth.registration.serializers import SocialLoginSerializer
from rest_framework import serializers
from rest_framework.schemas.openapi import AutoSchema

from users.models import UpwardliUser


class CustomUserDetailsSerializer(serializers.ModelSerializer):  # pylint: disable=W0223
    class Meta:
        model = UpwardliUser
        fields = ("opk", "username", "email", "first_name", "last_name")
        read_only_fields = ("email",)


class JwtAuthSerializer(serializers.Serializer):  # pylint: disable=W0223
    next = serializers.CharField()
    accesstoken = serializers.CharField()
    refreshtoken = serializers.CharField()


class AppleLoginSerializer(SocialLoginSerializer):  # pylint: disable=W0223
    schema = AutoSchema(
        tags=["Apple"],
        component_name="Apple",
        operation_id_base="Apple",
    )


class FaceBookLoginSerializer(SocialLoginSerializer):  # pylint: disable=W0223
    schema = AutoSchema(
        tags=["FaceBook"],
        component_name="FaceBook",
        operation_id_base="FaceBook",
    )


class GoogleLoginSerializer(SocialLoginSerializer):  # pylint: disable=W0223
    schema = AutoSchema(
        tags=["Google"],
        component_name="Google",
        operation_id_base="Google",
    )


class LogoutSerializer(serializers.Serializer):  # pylint: disable=W0223
    body = serializers.JSONField()
