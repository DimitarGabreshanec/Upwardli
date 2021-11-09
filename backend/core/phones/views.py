import phonenumbers
from django.conf import settings
from django.contrib.auth import get_user_model
from hashids import Hashids
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import get_object_or_404
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from phones.models import Phone
from phones.serializers import PhoneListSerializer, PhoneSerializer, OnlyPhoneSerializer

User = get_user_model()


def valid_phone_number(raw_phone: str) -> str:
    """Phone to the e164 format"""
    if not raw_phone.startswith("+"):
        raw_phone = f"+{raw_phone}"
    phone = phonenumbers.parse(raw_phone, None)
    formatted_phone = phonenumbers.format_number(
        phone, phonenumbers.PhoneNumberFormat.E164
    )
    return formatted_phone


class PhoneViewSet(ModelViewSet):  # pylint: disable=too-many-ancestors
    serializer_class = PhoneSerializer
    queryset = Phone.objects.all()
    permission_classes = [
        IsAuthenticated,
    ]
    pagination_class = LimitOffsetPagination

    def list(self, request, *args, **kwargs):
        self.serializer_class = PhoneListSerializer
        return super().list(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        data["phone"] = valid_phone_number(data["phone"])
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_phones_numbers(request, opk):
    """User's phone numbers."""
    hashids = Hashids(salt=settings.HASHIDS_SALT)
    user_id_tuple = hashids.decode(opk)
    if user_id_tuple:
        user = get_object_or_404(User, id=user_id_tuple[0])
        serializer = OnlyPhoneSerializer(instance=user.phones, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(status=status.HTTP_404_NOT_FOUND)
