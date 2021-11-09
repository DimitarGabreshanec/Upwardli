from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from address.models import Address
from address.serializers import AddressSerializer


class AddressViewSet(ModelViewSet):  # pylint: disable=too-many-ancestors
    serializer_class = AddressSerializer
    pagination_class = None
    queryset = Address.objects.all()
    permission_classes = [
        IsAuthenticated,
    ]
