import factory

from address import models


class AddressFactory(factory.django.DjangoModelFactory):
    """Address factory."""

    class Meta:
        model = models.Address
