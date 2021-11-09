from typing import Dict, List, Any

from django.db import IntegrityError

from offers.models import OfferCategorySlugChoices
from tests.factories.offers_factories import OfferFactory


OFFERS: List[Dict[str, Any]] = [
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
        "cta_action": "https://www.remitly.com/us/en/users/register",
        "sort_index": 1,
        "partner_name": "partner_name",
    },
    {
        "recommended": True,
        "ssn_required": False,
        "pros": [
            {
                "text": "Refinance up to $35,000 with a loan built specifically for immigrants",
                "icon": "like",
            },
            {"text": "No SSN or credit history required", "icon": "green"},
            {
                "text": "Checking rate won't impact your credit score",
                "icon": "green",
            },
            {"text": "Monthly repayments build credit", "icon": "green"},
            {
                "text": "Interest rates may be higher than the rates on your existing loans",
                "icon": "yellow",
            },
        ],
        "pros_short": [{"text": "Open"}, {"text": "Edit"}],
        "cons": [{"text": "Open"}, {"text": "Edit"}],
        "review_count": 52,
        "review_stars": 4.0,
        "short_title": "Stilt",
        "long_title": "Loans Built For Immigrants",
        "cta_text": "Apply Now",
        "cta_action": "https://www.remitly.com/us/en/users/register",
        "sort_index": 2,
        "partner_name": "partner_name",
    },
    {
        "recommended": True,
        "ssn_required": False,
        "pros": [
            {
                "text": "Builds score with the major bureaus in as little as 6 months",
                "icon": "like",
            },
            {
                "text": "Average user increased credit score 45 points within 6 months",
                "icon": "green",
            },
            {
                "text": "Contribute $10 or more per payday, get 95%+ back at plan end",
                "icon": "green",
            },
            {"text": "Builds $500 cash savings during plan", "icon": "green"},
            {
                "text": "Requires monthly payments of at least $20 during plan period",
                "icon": "yellow",
            },
        ],
        "pros_short": [{"text": "Open"}, {"text": "Edit"}],
        "cons": [{"text": "Open"}, {"text": "Edit"}],
        "review_count": 52,
        "review_stars": 4.0,
        "short_title": "Seed",
        "long_title": "Grow Credit While Building Savings",
        "cta_text": "Apply Now",
        "cta_action": "https://www.remitly.com/us/en/users/register",
        "sort_index": 3,
        "partner_name": "partner_name",
    },
    {
        "recommended": True,
        "ssn_required": False,
        "pros": [
            {
                "text": "Simple, fast and affordable international money transfers",
                "icon": "like",
            },
            {
                "text": "Multiple delivery options at consistently competitive FX rates",
                "icon": "green",
            },
            {
                "text": "Global network supports bank deposit, cash pickup & mobile wallety",
                "icon": "green",
            },
            {
                "text": "App makes repeat transfers easy Economy delivery option takes 2-3 business days to arrive",
                "icon": "yellow",
            },
        ],
        "pros_short": [{"text": "Open"}, {"text": "Edit"}],
        "cons": [{"text": "Open"}, {"text": "Edit"}],
        "review_count": 52,
        "review_stars": 4.0,
        "short_title": "Remitly",
        "long_title": "Fast, secure international transfers",
        "cta_text": "Send Now",
        "cta_action": "https://www.remitly.com/us/en/users/register",
        "sort_index": 4,
        "partner_name": "partner_name",
        "recipient_gets": "6 278 MXN",
        "total_cost": "- 4.99 USD",
        "is_verified": True,
        "learn_more": "learn more text?",
    },
]


class SeedOffers:
    def __init__(self, stdout, stderr):
        self.stdout = stdout
        self.stderr = stderr

    def get_or_create_offers(self) -> None:
        """Get or create offer_categories."""
        self.stdout.write("Seeding offers table")
        for category in OfferCategorySlugChoices.values:
            for offer in OFFERS:
                try:
                    OfferFactory.create(**offer, category=category)
                except IntegrityError:
                    self.stderr.write("Duplicate offer")
