from django.contrib.auth import get_user_model
from rest_framework import serializers

from financial_profile.models import FinancialProfile

User = get_user_model()


class FinancialProfileSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = FinancialProfile
        fields = (
            "user",
            "salary",
            "occupation",
            "live_in_us",
            "residence_status",
            "residence_status",
            "ssn",
            "passport",
            "country",
        )
