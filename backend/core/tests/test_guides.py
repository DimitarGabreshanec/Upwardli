from io import StringIO

import pytest
from django.core.management import call_command

from guides.models import GuideStepContentType
from users.models import UserInfo
from offers.models import Offer


def test_guides(api_client, authenticated_client, guides):
    guide, guide2 = guides
    assert guide.title == "Upwardly Basics"
    assert guide2.title == "Understanding Credit Scores"
    guides_response = api_client.get("/core/api/v1/guides/")
    assert guides_response.status_code == 401
    assert guides_response.status_text == "Unauthorized"

    guides_auth_response = authenticated_client.get("/core/api/v1/guides/")
    assert guides_auth_response.status_code == 200
    assert guides_auth_response.status_text == "OK"

    assert guides_auth_response.json()[0]["slug"] == "basics"
    assert guides_auth_response.json()[0]["title"] == "Upwardly Basics"
    assert guides_auth_response.json()[0]["sort_index"] == 1

    assert guides_auth_response.json()[1]["slug"] == "us-financial-system"
    assert guides_auth_response.json()[1]["title"] == "Understanding Credit Scores"
    assert guides_auth_response.json()[1]["sort_index"] == 2


def test_guide_modules(
    api_client, authenticated_client, guide_modules, guides, guide_steps
):
    assert guides[0].slug == "basics"
    guides_response = api_client.get("/core/api/v1/guides/basics/")
    assert guides_response.status_code == 401
    assert guides_response.status_text == "Unauthorized"

    guide_detail_auth_response = authenticated_client.get("/core/api/v1/guides/basics/")
    assert guide_detail_auth_response.status_code == 200
    assert guide_detail_auth_response.status_text == "OK"
    assert len(guide_detail_auth_response.json()["guide_modules"]) > 0
    assert guide_detail_auth_response.json()["guide_modules"][0]["sort_index"] == 1
    assert (
        guide_detail_auth_response.json()["guide_modules"][0]["steps"][0][
            "content_type"
        ]
        in GuideStepContentType.values
    )


def test_mark_guide_as_read(
    authenticated_client, authenticated_client_2, guide_modules
):
    response = authenticated_client.post(
        "/core/api/v1/guides-modules/mark-guide-as-read/", {"guide_module": 1}
    )
    assert response.status_code == 201

    for module_id in (module.id for module in guide_modules):
        response = authenticated_client.post(
            "/core/api/v1/guides-modules/mark-guide-as-read/",
            {"guide_module": module_id},
        )
        assert response.status_code == 201

    guides_auth_response = authenticated_client.get("/core/api/v1/guides/")
    assert guides_auth_response.json()[0]["read"] is True
    assert guides_auth_response.json()[1]["read"] is False

    guides_auth_response_2 = authenticated_client_2.get("/core/api/v1/guides/")
    assert guides_auth_response_2.json()[0]["read"] is False
    assert guides_auth_response_2.json()[1]["read"] is False


def test_save_simple_form_results(authenticated_client, guide_simple_form):
    response = authenticated_client.post(
        "/core/api/v1/guides-modules/save-simple-form-results/",
        {"simple_form_item_id": 1},
    )
    assert response.status_code == 201


@pytest.mark.django_db(transaction=True)
def test_seed_guides(db):
    Offer.objects.all().delete()
    out = StringIO()
    out_errors = StringIO()
    call_command(
        "dev_seed_users",
        stdout=out,
        stderr=out_errors,
    )
    assert "Seeding auth_user table" in out.getvalue()
    assert "Seeding guides table" in out.getvalue()
    assert "Seeding guides modules table" in out.getvalue()
    assert "Seeding guides modules steps table" in out.getvalue()
    assert out_errors.getvalue() == ""

    out = StringIO()
    out_errors = StringIO()

    call_command(
        "dev_seed_users",
        stdout=out,
        stderr=out_errors,
    )

    assert "Seeding auth_user table" in out.getvalue()
    assert "UNIQUE constraint failed:" in out_errors.getvalue()


def test_guide_multi_choice_form(guide_multi_choice_form, authenticated_client):
    assert (
        guide_multi_choice_form.title
        == "Which of these financial products do you currently use?"
    )

    guide_detail_auth_response = authenticated_client.get("/core/api/v1/guides/basics/")

    assert (
        guide_detail_auth_response.json()["guide_modules"][0]["steps"][2][
            "content_type"
        ]
        == "multiple_choice_form"
    )
    assert (
        guide_detail_auth_response.json()["guide_modules"][0]["steps"][2]["button_text"]
        == "next"
    )
    assert (
        guide_detail_auth_response.json()["guide_modules"][0]["steps"][2]["content"][
            "items"
        ][0]["text"]
        == "Credit building / monitoring"
    )
    assert (
        len(
            guide_detail_auth_response.json()["guide_modules"][0]["steps"][2][
                "content"
            ]["items"]
        )
        == 9
    )


def test_save_multi_form_create_user_info_signal(
    authenticated_client, guide_multi_choice_form
):
    response = authenticated_client.post(
        "/core/api/v1/guides-modules/save-multi-choice-form-results/",
        {"multi_choice_form_item_ids": [1, 2, 3]},
    )
    assert response.status_code == 201

    user_info = UserInfo.objects.all()
    assert user_info.count() == 3
    assert (
        user_info[0].question
        == "Which of these financial products do you currently use?"
    )
    assert user_info[0].user.email == "member@upwardli.com"
    assert user_info[0].answer == "Credit building / monitoring"


def test_save_simple_form_create_user_info_signal(
    authenticated_client, guide_simple_form
):
    response = authenticated_client.post(
        "/core/api/v1/guides-modules/save-simple-form-results/",
        {"simple_form_item_id": 1},
    )
    assert response.status_code == 201

    user_info = UserInfo.objects.all()
    assert user_info.count() == 1
    assert user_info[0].question == "How confident are you in your..."
    assert user_info[0].user.email == "member@upwardli.com"
    assert user_info[0].answer == "test answer"


def test_onboarding(onboarding, guides, authenticated_client):
    response = authenticated_client.get(
        "/core/api/v1/guides/",
        {"guide_type": "onboarding"},
    )
    assert response.status_code == 200
    assert response.json()[0]["title"] == "Personalize Recommendations"
    assert len(response.json()) == 1

    response = authenticated_client.get(
        "/core/api/v1/guides/",
        {"guide_type": "guide"},
    )
    assert response.status_code == 200
    assert response.json()[0]["title"] == "Upwardly Basics"
    assert len(response.json()) == 2
