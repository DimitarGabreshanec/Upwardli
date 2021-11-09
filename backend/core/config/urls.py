from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, re_path
from django.urls import include
from drf_yasg import openapi
from drf_yasg.views import get_schema_view

from rest_framework import routers, permissions

from guides.urls import router as guides_router
from address.urls import router as addresses_router
from offers.urls import router as offers_router
from financial_profile.urls import router as financial_profile_router

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from users.views import JwtAuthView, UpwardliLogoutView
from users.views import FacebookLogin, GoogleLogin, AppleLogin

router = routers.DefaultRouter()

router.registry.extend(guides_router.registry)
router.registry.extend(addresses_router.registry)
router.registry.extend(offers_router.registry)
router.registry.extend(financial_profile_router.registry)


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/", include(router.urls)),
    path("api/v1/", include("dj_rest_auth.urls")),
    path("api/v1/logout/", UpwardliLogoutView.as_view(), name="rest_logout"),
    path("api/v1/registration/", include("dj_rest_auth.registration.urls")),
    path("api/v1/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/v1/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("jwt-auth/", JwtAuthView.as_view(), name="jwt_auth"),
    path("api/v1/social-login-facebook/", FacebookLogin.as_view(), name="fb_login"),
    path("api/v1/social-login-google/", GoogleLogin.as_view(), name="google_login"),
    path("api/v1/social-login-apple/", AppleLogin.as_view(), name="apple_login"),
    path("api/v1/phones/", include(("phones.urls", "phones"))),
    path("accounts/", include("allauth.urls"), name="socialaccount_signup"),
    path("partners/", include("partners.urls"), name="partners"),
]

urlpatterns = [
    path(settings.BASE_URL, include(urlpatterns)),
]

# swagger

api_info = openapi.Info(
    title="Upwardly API",
    default_version="v1",
    description="Documentation",
)

schema_view = get_schema_view(
    public=True,
    permission_classes=(permissions.AllowAny,),
)

if settings.DEBUG:
    urlpatterns += [
        re_path(
            r"^swagger(?P<format>\.json|\.yaml)$",
            schema_view.without_ui(cache_timeout=0),
            name="schema-json",
        ),
        re_path(
            r"^swagger/$",
            schema_view.with_ui("swagger", cache_timeout=0),
            name="schema-swagger-ui",
        ),
        re_path(
            r"^redoc/$",
            schema_view.with_ui("redoc", cache_timeout=0),
            name="schema-redoc",
        ),
    ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
