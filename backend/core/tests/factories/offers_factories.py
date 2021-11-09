import factory

from offers.models import Offer


class OfferFactory(factory.django.DjangoModelFactory):
    logo = factory.django.ImageField(color="blue", width=10)

    class Meta:
        model = Offer
