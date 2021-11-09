from urllib.parse import unquote

from rest_framework import serializers

from partners.models import ReferralsTracking


class ReferralsTrackingSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    next = serializers.CharField(source="offer_url")

    class Meta:
        model = ReferralsTracking
        fields = ("user", "partner", "next", "offer_id", "offer_touchpoint")

    def save(self, **kwargs):
        """Unquote offer url."""
        self.validated_data["offer_url"] = unquote(self.validated_data.pop("offer_url"))
        return ReferralsTracking.objects.create(**self.validated_data)
