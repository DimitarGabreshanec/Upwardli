from django.db import models

from config.abstract_models import SortingModel
from offers.validators import validate_props


class OfferCategorySlugChoices(models.TextChoices):
    """Slugs of offer categories."""

    MONEY_TRANSFER = "money-transfer", "Money transfer"
    STUDENT_LOANS = "student-loans", "Student loans"
    CREDIT_BUILDING_CARDS = "credit-building-cards", "Credit building cards"
    CREDIT_CARDS = "credit-cards", "Credit cards"
    CREDIT_BUILDER = "credit-builder", "Credit builder"
    BANKING = "banking", "Banking"


class Offer(SortingModel):
    recommended = models.BooleanField(default=False)
    ssn_required = models.BooleanField(default=False)
    pros = models.JSONField(
        validators=[
            validate_props,
        ],
        default=dict,
    )
    pros_short = models.JSONField(
        validators=[
            validate_props,
        ],
        default=dict,
    )
    cons = models.JSONField(
        validators=[
            validate_props,
        ]
    )
    review_count = models.IntegerField(default=0)
    review_stars = models.FloatField(default=0.0)
    short_title = models.CharField(max_length=100)
    long_title = models.CharField(max_length=250)
    cta_text = models.CharField(max_length=50)
    cta_action = models.URLField()
    category = models.CharField(
        max_length=100, choices=OfferCategorySlugChoices.choices
    )
    partner_name = models.CharField(max_length=250)
    recipient_gets = models.CharField(max_length=250, null=True)
    total_cost = models.CharField(max_length=250, null=True)
    is_verified = models.BooleanField(default=True)
    logo = models.ImageField(upload_to="offers_logo", null=True)
    learn_more = models.TextField(null=True)

    def __str__(self):
        return self.long_title

    class Meta:
        ordering = ["sort_index", "id"]
        unique_together = ["sort_index", "category"]
