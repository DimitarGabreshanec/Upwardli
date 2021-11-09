from rest_framework import serializers

from phones.models import Phone
from users.serializers import CustomUserDetailsSerializer


class OnlyPhoneSerializer(serializers.ModelSerializer):
    phone = serializers.CharField()

    class Meta:
        model = Phone
        fields = [
            "phone",
        ]


class PhoneBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Phone
        fields = ["id", "user", "phone"]


class PhoneListSerializer(PhoneBaseSerializer):
    user = CustomUserDetailsSerializer(read_only=True)


class PhoneSerializer(PhoneBaseSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
