from io import StringIO

import pytest
from django.core.management import call_command
from rest_framework.reverse import reverse

from offers.models import Offer


def test_offers_api(offer, authenticated_client):
    offers_all = authenticated_client.get(reverse("offers-list"))
    assert offers_all.status_code == 200

    assert (
        offers_all.json()["results"][0]["long_title"] == "Built for Newcomers to Credit"
    )
    category = offers_all.json()["results"][0]["category"]
    category_offers_url = "%s?category=%s" % (reverse("offers-list"), category)
    offers = authenticated_client.get(category_offers_url)

    assert offers.status_code == 200
    assert offers.json()["results"][0]["long_title"] == "Built for Newcomers to Credit"
    assert offers.json()["results"][0]["pros"] == [
        {
            "text": "A no-fee cash back card for those with little to no prior credit history",
            "icon": "like",
        },
        {"text": "No SSN or credit history required", "icon": "green"},
        {"text": "Automated limit increases with repayment history", "icon": "green"},
        {"text": "No intro APR period or sign-up bonus", "icon": "yellow"},
    ]
    assert offers.json()["results"][0]["recipient_gets"] == "6 278 MXN"


@pytest.mark.django_db(transaction=True)
def test_seed_offers(db):
    Offer.objects.all().delete()
    out = StringIO()
    out_errors = StringIO()
    call_command(
        "dev_seed_users",
        stdout=out,
        stderr=out_errors,
    )

    assert "Seeding offers table" in out.getvalue()
    assert Offer.objects.count() == 24
    assert out_errors.getvalue() == ""
