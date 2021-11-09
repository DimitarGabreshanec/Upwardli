from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

from address.address_choices import ISO_3166_CODES, STATE_CHOICES
from address.utils import geocode_latlng_from_location


class Address(models.Model):
    address_line1 = models.CharField("Address line 1", max_length=250)
    address_line2 = models.CharField("Address line 2", max_length=250)
    city = models.CharField("City", max_length=100)
    state = models.CharField("State", choices=STATE_CHOICES, max_length=3)
    country = models.CharField(
        "Country", choices=ISO_3166_CODES, max_length=3, default="US"
    )
    zip = models.CharField("Zip / Postal code", max_length=32)
    lat = models.FloatField(null=True, blank=True)
    lng = models.FloatField(null=True, blank=True)

    def __str__(self):
        return "{} {}".format(self.address_line1, self.address_line2)


@receiver(post_save, sender=Address)
def get_coordinates(sender, instance, **kwargs):
    """The function stores instance latitude and longitude for the address.
    Uses geocoder."""
    address = "{} {} {} {}".format(
        instance.country, instance.city, instance.address_line1, instance.address_line2
    )
    lat, lng = geocode_latlng_from_location(address)
    if lat and lng:
        sender.objects.filter(id=instance.id).update(lat=lat, lng=lng)
