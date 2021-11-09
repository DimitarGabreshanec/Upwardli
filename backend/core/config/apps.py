DJANGO_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.sites",
]

THIRD_PARTY_APPS = [
    "django_filters",
    "django_extensions",
    "rest_framework",
    "rest_framework.authtoken",
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    "allauth.socialaccount.providers.facebook",
    "allauth.socialaccount.providers.google",
    "allauth.socialaccount.providers.apple",
    "markdownfield",
    "dj_rest_auth",
    "dj_rest_auth.registration",
    "drf_yasg",
    "jsoneditor",
]

LOCAL_APPS = [
    "debug",
    "guides",
    "users",
    "partners",
    "address",
    "offers",
    "phones",
    "financial_profile",
]


INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS
