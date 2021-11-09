from datetime import datetime, timedelta

import jwt
from allauth.socialaccount.adapter import get_adapter
from allauth.socialaccount.providers.apple.client import AppleOAuth2Client
from allauth.socialaccount.providers.apple.views import AppleOAuth2Adapter
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from dj_rest_auth.jwt_auth import set_jwt_cookies
from dj_rest_auth.views import LogoutView
from django.core.exceptions import ImproperlyConfigured
from django.shortcuts import redirect
from rest_framework.generics import GenericAPIView

from rest_framework.permissions import AllowAny

from rest_framework.views import APIView

from users.serializers import (
    AppleLoginSerializer,
    FaceBookLoginSerializer,
    GoogleLoginSerializer,
    JwtAuthSerializer,
    LogoutSerializer,
)


class JwtAuthView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        """
        Redirect with jwt_token in get params
        """
        serializer = JwtAuthSerializer(data=request.GET)
        serializer.is_valid(raise_exception=True)

        response = redirect(serializer.data.get("next"))

        set_jwt_cookies(
            response, serializer.data["accesstoken"], serializer.data["refreshtoken"]
        )

        return response


class UpwardliAppleOAuth2Client(AppleOAuth2Client):
    """
    Custom client because `Sign In With Apple`:
        * requires `response_mode` field in redirect_url
        * requires special `client_secret` as JWT
    """

    def generate_client_secret(self):
        """Create a JWT signed with an apple provided private key"""
        now = datetime.utcnow()
        app = get_adapter().get_app(self.request, "apple")
        if not app.key:
            raise ImproperlyConfigured("Apple 'key' missing")
        if not app.certificate_key:
            raise ImproperlyConfigured("Apple 'certificate_key' missing")
        claims = {
            "iss": app.key,
            "aud": "https://appleid.apple.com",
            "sub": self.get_client_id(),
            "iat": now,
            "exp": now + timedelta(hours=1),
        }
        headers = {"kid": self.consumer_secret, "alg": "ES256"}
        client_secret = jwt.encode(
            payload=claims, key=app.certificate_key, algorithm="ES256", headers=headers
        )
        return client_secret


class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter
    serializer_class = FaceBookLoginSerializer


class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    serializer_class = GoogleLoginSerializer


class AppleLogin(SocialLoginView):
    adapter_class = AppleOAuth2Adapter
    client_class = UpwardliAppleOAuth2Client
    serializer_class = AppleLoginSerializer


class UpwardliLogoutView(LogoutView, GenericAPIView):
    serializer_class = LogoutSerializer
