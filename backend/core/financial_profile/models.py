from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class FinancialProfile(models.Model):
    """User profile."""

    user = models.OneToOneField(
        User, on_delete=models.PROTECT, related_name="financial_profile"
    )
    salary = models.FloatField("Salary", null=True)
    occupation = models.CharField("Occupation", null=True, max_length=250)
    live_in_us = models.CharField(
        "Lived in the U.S.",
        null=True,
        max_length=250,
        help_text="How long have you lived in the U.S.?",
    )
    residence_status = models.CharField(
        "Residence status in the U.S.",
        null=True,
        max_length=250,
        help_text="What is your residence status in the U.S.?",
    )
    ssn = models.CharField("Last 4 nums of SSN / ITIN", null=True, max_length=250)
    passport = models.CharField("Passport", null=True, max_length=250)
    country = models.CharField("Country", null=True, max_length=250)

    def __str__(self):
        return "{} financial profile".format(self.user)
