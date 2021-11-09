from types import MappingProxyType
from typing import Mapping, Union, Any

from django.contrib.auth.hashers import make_password

DEFAULT_USER_PARAMS: Mapping[str, Union[Any]] = MappingProxyType(
    {
        "email": "member@upwardli.com",
        "username": "upwardli-member",
        "password": make_password("upwardli"),
        "is_staff": False,
        "is_superuser": False,
    }
)

DEFAULT_USER_PARAMS_2: Mapping[str, Union[Any]] = MappingProxyType(
    {
        "email": "member2@upwardli.com",
        "username": "upwardli-member-2",
        "password": make_password("upwardli2"),
        "is_staff": False,
        "is_superuser": False,
    }
)

GUIDE_BASIC: Mapping[str, Union[Any]] = MappingProxyType(
    {
        "title": "Upwardly Basics",
        "slug": "basics",
        "reading_time": "5min",
        "image": "images/19.jpg",
        "sort_index": 1,
    }
)

GUIDE_CREDIT: Mapping[str, Union[Any]] = MappingProxyType(
    {
        "title": "Understanding Credit Scores",
        "slug": "us-financial-system",
        "reading_time": "5min",
        "image": "images/19_MnXxck0.jpg",
        "sort_index": 2,
    }
)

GUIDE_MODULE_1: Mapping[str, Union[Any]] = MappingProxyType(
    {"sort_index": 1, "title": "Upwardly Basics", "slug": "basics"}
)

GUIDE_MODULE_2: Mapping[str, Union[Any]] = MappingProxyType(
    {
        "sort_index": 2,
        "title": "Understanding Credit Scores",
        "slug": "us-financial-system",
    }
)

GUIDE_STEP_1: Mapping[str, Union[Any]] = MappingProxyType(
    {"sort_index": 1, "content_type": "static_page", "button_text": "Button text"}
)

GUIDE_STEP_2: Mapping[str, Union[Any]] = MappingProxyType(
    {"sort_index": 2, "content_type": "static_page", "button_text": "Button text"}
)

GUIDE_SIMPLE_FORM: Mapping[str, Union[Any]] = MappingProxyType(
    {"title": "How confident are you in your..."}
)

FACEBOOK_APP: Mapping[str, str] = MappingProxyType(
    {
        "provider": "facebook",
        "name": "Facebook",
        "client_id": "123123123",
        "secret": "321321321",
    }
)

GOOGLE_APP: Mapping[str, str] = MappingProxyType(
    {
        "provider": "google",
        "name": "Google",
        "client_id": "123123123",
        "secret": "321321321",
    }
)

APPLE_APP: Mapping[str, str] = MappingProxyType(
    {
        "provider": "apple",
        "name": "Apple",
        "client_id": "com.upwardli.app",
        "secret": "321321321",
    }
)

ADDRESS_1: Mapping[str, str] = MappingProxyType(
    {
        "address_line1": "95 Western Road",
        "address_line2": "Kearny, NJ 07032",
        "city": "New York",
        "state": "NY",
        "country": "US",
        "zip": "07032",
    }
)
BAD_ADDRESS: Mapping[str, str] = MappingProxyType(
    {
        "address_line1": "20095 Western Roads",
        "address_line2": "Kearny, NJ 07032",
        "city": "York New",
        "state": "NY",
        "country": "US",
        "zip": "07032",
    }
)

OFFER: Mapping[str, Any] = MappingProxyType(
    {
        "recommended": True,
        "ssn_required": False,
        "pros": [
            {
                "text": "A no-fee cash back card for those with little to no prior credit history",
                "icon": "like",
            },
            {"text": "No SSN or credit history required", "icon": "green"},
            {
                "text": "Automated limit increases with repayment history",
                "icon": "green",
            },
            {"text": "No intro APR period or sign-up bonus", "icon": "yellow"},
        ],
        "pros_short": [{"text": "Open"}, {"text": "Edit"}],
        "cons": [{"text": "Open"}, {"text": "Edit"}],
        "review_count": 0,
        "review_stars": 0.0,
        "short_title": "Petal",
        "long_title": "Built for Newcomers to Credit",
        "cta_text": "Get Pre-Approved",
        "cta_action": "https://www.google.com/search?q=cta+action",
        "sort_index": 1,
        "recipient_gets": "6 278 MXN",
        "total_cost": "- 4.99 USD",
        "is_verified": True,
        "learn_more": "learn more text?",
    }
)

GUIDE_STEP_WITH_MULTI_CHOICE_FORM: Mapping[str, Union[Any]] = MappingProxyType(
    {"sort_index": 3, "content_type": "multiple_choice_form", "button_text": "next"}
)

ONBOARDING: Mapping[str, Union[Any]] = MappingProxyType(
    {"sort_index": 6, "title": "Personalize Recommendations", "slug": "new-module"}
)

GUIDE_MULTI_CHOICE_FORM: Mapping[str, str] = MappingProxyType(
    {"title": "Which of these financial products do you currently use?"}
)
