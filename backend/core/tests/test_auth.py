import json
import re

import jwt
import responses
from datetime import datetime, timedelta

from allauth.socialaccount.providers.apple.tests import (
    TESTING_JWT_KEYSET,
    KEY_SERVER_RESP_JSON,
)
from django.contrib.auth import get_user_model
from django.test import override_settings

from django.http import JsonResponse
from django.urls import path
from rest_framework import status
from config.urls import urlpatterns


@responses.activate
def test_fb_auth(fb_app, api_client):
    fb_login_api_url = "/core/api/v1/social-login-facebook/"
    User = get_user_model()
    # fake response for facebook call
    resp_body = {
        "id": "123123123123",
        "first_name": "John",
        "gender": "male",
        "last_name": "Smith",
        "link": "https://www.facebook.com/john.smith",
        "locale": "en_US",
        "name": "John Smith",
        "timezone": 2,
        "updated_time": "2014-08-13T10:14:38+0000",
        "username": "john.smith",
        "verified": True,
    }

    responses.add(
        responses.GET,
        re.compile("https://graph.facebook.com/v7.0/me*"),
        body=json.dumps(resp_body),
        status=200,
        content_type="application/json",
    )
    payload = {
        "access_token": "123213123",
    }
    resp = api_client.post(fb_login_api_url, payload)
    assert isinstance(resp.json()["access_token"], str)
    assert len(resp.json()["access_token"]) > 0
    assert resp.json()["user"]["first_name"] == "John"

    user = User.objects.last()
    assert user.username == "john.smith"


@responses.activate
def test_google_auth(google_app, api_client):
    google_login_api_url = "/core/api/v1/social-login-google/"

    resp_body = {
        "family_name": "John",
        "name": "Smith",
        "picture": "https://lh5.googleusercontent.com/photo.jpg",
        "locale": "nl",
        "gender": "male",
        "email": "john.smith@gmail.com",
        "link": "https://plus.google.com/108204268033311374519",
        "given_name": "Smith",
        "id": "108204268033311374519",
        "verified_email": True,
    }

    responses.add(
        responses.GET,
        "https://www.googleapis.com/oauth2/v1/userinfo",
        body=json.dumps(resp_body),
        status=200,
        content_type="application/json",
    )
    User = get_user_model()
    payload = {
        "access_token": "123213123",
    }
    resp = api_client.post(google_login_api_url, payload)
    assert isinstance(resp.json()["access_token"], str)
    assert len(resp.json()["access_token"]) > 0
    assert resp.json()["user"]["email"] == "john.smith@gmail.com"
    assert resp.json()["user"]["first_name"] == "Smith"
    assert resp.json()["user"]["last_name"] == "John"

    user = User.objects.last()
    assert user.username == "smith"


def get_apple_id_token_payload():
    now = datetime.utcnow()
    return {
        "iss": "https://appleid.apple.com",
        "aud": "app123id",  # Matches `setup_app`
        "exp": now + timedelta(hours=1),
        "iat": now,
        "sub": "000313.c9720f41e9434e18987a.1218",
        "at_hash": "CkaUPjk4MJinaAq6Z0tGUA",
        "email": "test@privaterelay.appleid.com",
        "email_verified": "true",
        "is_private_email": "true",
        "auth_time": 1234345345,  # not converted automatically by pyjwt
    }


def sign_id_token(payload):
    """
    Sign a payload as apple normally would for the id_token.
    """

    signing_key = jwt.algorithms.RSAAlgorithm.from_jwk(  # type: ignore  # Not in the build
        json.dumps(TESTING_JWT_KEYSET)
    )
    return jwt.encode(
        payload,
        signing_key,
        algorithm="RS256",
        headers={"kid": TESTING_JWT_KEYSET["kid"]},
    )


@override_settings(
    SOCIALACCOUNT_STORE_TOKENS=False,
    SOCIALACCOUNT_PROVIDERS={
        "apple": {
            "APP": {
                "client_id": "app123id",
                "key": "apple",
                "secret": "dummy",
                "certificate_key": """-----BEGIN PRIVATE KEY-----
MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQg2+Eybl8ojH4wB30C
3/iDkpsrxuPfs3DZ+3nHNghBOpmhRANCAAQSpo1eQ+EpNgQQyQVs/F27dkq3gvAI
28m95JEk26v64YAea5NTH56mru30RDqTKPgRVi5qRu3XGyqy3mdb8gMy
-----END PRIVATE KEY-----
""",
            }
        }
    },
)
@responses.activate
def test_apple_auth(apple_app, api_client):
    apple_login_api_url = "/core/api/v1/social-login-apple/"

    responses.add(
        responses.GET,
        "https://appleid.apple.com/auth/keys",
        body=KEY_SERVER_RESP_JSON,
        status=200,
        content_type="application/json",
    )

    id_token = sign_id_token(get_apple_id_token_payload())  # type: ignore  # Not in the build

    response = json.dumps(
        {
            "access_token": "testac",  # Matches OAuth2TestsMixin value
            "expires_in": 3600,
            "id_token": id_token,
            "refresh_token": "testrt",  # Matches OAuth2TestsMixin value
            "token_type": "Bearer",
        }
    )
    responses.add(
        responses.POST,
        "https://appleid.apple.com/auth/token",
        body=response,
        status=200,
        content_type="application/json",
    )
    User = get_user_model()
    payload = {
        "code": "test_code",
        "id_token": "test_token",
    }
    resp = api_client.post(apple_login_api_url, payload)

    assert resp.json()["user"]["email"] == "test@privaterelay.appleid.com"
    assert len(resp.json()["access_token"]) > 0

    user = User.objects.last()
    assert user.username == "test"
    assert user.email == "test@privaterelay.appleid.com"


def dashboard(request):
    if request.user.is_authenticated:
        return JsonResponse({"user_email": request.user.email})
    return JsonResponse(status=status.HTTP_401_UNAUTHORIZED, data={})


urlpatterns += [
    path("dashboard/", dashboard, name="dashboard"),
]


@override_settings(ROOT_URLCONF=__name__)
def test_jwt_auth(api_client, user_2):
    response = api_client.post(
        path="/core/api/v1/login/",
        data={
            "email": user_2.email,
            "password": "upwardli2",
        },
    )
    _next = "/dashboard/"
    response = api_client.get(
        "/core/jwt-auth/",
        {
            "accesstoken": response.data.get("access_token"),
            "refreshtoken": response.data.get("refresh_token"),
            "next": _next,
        },
    )
    assert "jwt-auth" in response.cookies

    response = api_client.get("/dashboard/", follow=True)
    assert response.status_code == 200
