from urllib.parse import quote

from rest_framework import serializers

from offers.models import Offer


class OfferSerializer(serializers.ModelSerializer):
    cta_url = serializers.SerializerMethodField()

    class Meta:
        model = Offer
        fields = (
            "recommended",
            "ssn_required",
            "pros",
            "pros_short",
            "cons",
            "review_count",
            "review_stars",
            "short_title",
            "long_title",
            "cta_text",
            "cta_action",
            "cta_url",
            "category",
            "recipient_gets",
            "total_cost",
            "is_verified",
            "logo",
            "learn_more",
        )

    def get_cta_url(self, obj):  # pylint: disable=no-self-use
        """CTA url"""
        return quote(obj.cta_action)
