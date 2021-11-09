from rest_framework import mixins
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import GenericViewSet

from financial_profile.models import FinancialProfile
from financial_profile.serializers import FinancialProfileSerializer


class FinancialProfileViewSet(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.UpdateModelMixin,
    GenericViewSet,
):  # pylint: disable=too-many-ancestors
    """Post request will create a profile if it is missing and update it if the profile already exists.
    Then the response code will be 200."""

    serializer_class = FinancialProfileSerializer
    pagination_class = LimitOffsetPagination
    http_method_names = ("post", "get")
    queryset = FinancialProfile.objects.all()
    permission_classes = [
        IsAuthenticated,
    ]

    def create(self, request, *args, **kwargs):
        try:
            self.get_object = lambda: request.user.financial_profile
            return super().update(request, *args, **kwargs)
        except FinancialProfile.DoesNotExist:
            return super().create(request, *args, **kwargs)
