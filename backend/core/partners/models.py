from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class ReferralsTracking(models.Model):
    user = models.ForeignKey(
        User, related_name="passthroughs", on_delete=models.PROTECT
    )
    partner = models.CharField("Partner", max_length=250)
    offer_url = models.CharField("Offer Url", max_length=250)
    offer_id = models.CharField("Offer Id", max_length=250)
    offer_touchpoint = models.CharField("Offer Touchpoint", max_length=250)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "{} {}".format(self.partner, self.created)
