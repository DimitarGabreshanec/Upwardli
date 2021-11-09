import json
import os
from typing import Mapping, Dict

import pytest
from allauth.socialaccount.models import SocialApp
from django.contrib.sites.models import Site
from pytest_factoryboy import register
from rest_framework.test import APIClient

from guides.models import GuideType
from offers.models import OfferCategorySlugChoices
from tests.defaults import (
    GUIDE_BASIC,
    GUIDE_CREDIT,
    DEFAULT_USER_PARAMS,
    DEFAULT_USER_PARAMS_2,
    GUIDE_MODULE_1,
    GUIDE_MODULE_2,
    GUIDE_STEP_1,
    GUIDE_STEP_2,
    GUIDE_SIMPLE_FORM,
    FACEBOOK_APP,
    GOOGLE_APP,
    APPLE_APP,
    ADDRESS_1,
    OFFER,
    ONBOARDING,
    GUIDE_MULTI_CHOICE_FORM,
    GUIDE_STEP_WITH_MULTI_CHOICE_FORM,
)
from tests.factories.address_factories import AddressFactory
from tests.factories.guides_factories import (
    GuideFactory,
    GuideModuleFactory,
    GuideStepFactory,
    GuideSimpleFormFactory,
    GuideSimpleFormChoicesFactory,
    GuideMultiChoiceFormFactory,
    GuideMultiChoiceFormChoicesFactory,
)
from tests.factories.offers_factories import OfferFactory
from tests.factories.users_factories import UserFactory

register(GuideFactory)
register(GuideModuleFactory)
register(GuideStepFactory)
register(GuideSimpleFormFactory)
register(GuideSimpleFormChoicesFactory)
register(AddressFactory)
register(OfferFactory)
register(GuideMultiChoiceFormFactory)
register(GuideMultiChoiceFormChoicesFactory)


def load_params_from_json(json_path) -> Dict[str, str]:
    with open(json_path) as f:
        return json.load(f)


@pytest.fixture()
def api_client():
    """Api client."""
    return APIClient()


@pytest.fixture
def user(db):
    return UserFactory(**DEFAULT_USER_PARAMS)


@pytest.fixture
def user_2(db):
    return UserFactory(**DEFAULT_USER_PARAMS_2)


@pytest.fixture
def authenticated_client(user):
    client = APIClient()
    response = client.post(
        path="/core/api/v1/token/",
        data={
            "email": user.email,
            "password": "upwardli",
        },
    )
    assert response.status_code == 200
    client.defaults.update(HTTP_AUTHORIZATION=f'Bearer {response.data.get("access")}')
    return client


@pytest.fixture
def authenticated_client_2(user_2):
    client = APIClient()
    response = client.post(
        path="/core/api/v1/token/",
        data={
            "email": user_2.email,
            "password": "upwardli2",
        },
    )
    assert response.status_code == 200
    client.defaults.update(HTTP_AUTHORIZATION=f'Bearer {response.data.get("access")}')
    return client


@pytest.fixture
def guides(guide_factory, db):
    return guide_factory(**GUIDE_BASIC), guide_factory(**GUIDE_CREDIT)


@pytest.fixture
def guide_modules(guide_module_factory, guides):
    return (
        guide_module_factory(**GUIDE_MODULE_1, guide=guides[0]),
        guide_module_factory(**GUIDE_MODULE_2, guide=guides[0]),
    )


@pytest.fixture
def guide_steps(guide_step_factory, guide_modules):
    return (
        guide_step_factory(**GUIDE_STEP_1, guide_module=guide_modules[0]),
        guide_step_factory(**GUIDE_STEP_2, guide_module=guide_modules[0]),
    )


@pytest.fixture
def guide_simple_form(
    guide_steps, guide_simple_form_factory, guide_simple_form_choices_factory
):
    guide_simple_form = guide_simple_form_factory(
        **GUIDE_SIMPLE_FORM, guide_step=guide_steps[0]
    )
    for i in range(3):
        GuideSimpleFormChoicesFactory.create(
            guide_simple_form=guide_simple_form, sort_index=i, text="test answer"
        )
    return guide_simple_form


def get_social_app(data: Mapping[str, str]):
    app = SocialApp.objects.create(**data)
    site = Site.objects.get_current()
    app.sites.add(site)
    return app


@pytest.fixture
def fb_app(db):
    return get_social_app(FACEBOOK_APP)


@pytest.fixture
def google_app(db):
    return get_social_app(GOOGLE_APP)


@pytest.fixture
def apple_app(db):
    return get_social_app(APPLE_APP)


@pytest.fixture
def address(db, address_factory):
    address = address_factory(**ADDRESS_1)
    return address


@pytest.fixture
def map_box_response():
    path = os.path.join(
        os.path.dirname(__file__), "tests", "fixtures", "map_box_response.json"
    )
    return load_params_from_json(path)


@pytest.fixture(autouse=True)
def use_mapbox_key(settings):
    settings.MAPBOX_PUBLIC_API_KEY = "123123123212"


@pytest.fixture
def guide_multi_choice_form(
    guide_multi_choice_form_factory,
    guide_multi_choice_form_choices_factory,
    guide_steps,
    guide_step_factory,
    guide_modules,
):
    guide_step = guide_step_factory(
        **GUIDE_STEP_WITH_MULTI_CHOICE_FORM, guide_module=guide_modules[0]
    )
    guide_multi_choice_form = guide_multi_choice_form_factory(
        **GUIDE_MULTI_CHOICE_FORM, guide_step=guide_step
    )
    choices = [
        "Credit building / monitoring",
        "Credit card",
        "Bank Account",
        "Refinance / Personal loan",
        "Student Loan",
        "International money transfer",
        "Saving / Investment",
        "Car loan",
        "Mortgage",
    ]

    for ind, text in enumerate(choices):
        guide_multi_choice_form_choices_factory.create(
            guide_multi_choices_form=guide_multi_choice_form, text=text, sort_index=ind
        )
    return guide_multi_choice_form


@pytest.fixture
def offer(db, offer_factory):
    return offer_factory(**OFFER, category=OfferCategorySlugChoices.MONEY_TRANSFER)


@pytest.fixture
def onboarding(db, guide_factory):
    return guide_factory(**ONBOARDING, guide_type=GuideType.ONBOARDING)
