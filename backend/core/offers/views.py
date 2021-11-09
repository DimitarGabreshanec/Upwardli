from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ReadOnlyModelViewSet

from offers.models import Offer
from offers.serializers import OfferSerializer


class OfferViewSet(ReadOnlyModelViewSet):  # pylint: disable=too-many-ancestors
    serializer_class = OfferSerializer
    queryset = Offer.objects.all()
    permission_classes = [
        IsAuthenticated,
    ]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = [
        "category",
    ]
