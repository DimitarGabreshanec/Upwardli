from django.urls import path
from rest_framework.routers import DefaultRouter

from phones.views import PhoneViewSet, user_phones_numbers

router = DefaultRouter()

router.register("", PhoneViewSet, basename="phones")

app_name = "phones"


urlpatterns = [
    path("<opk>/", user_phones_numbers, name="user_phones"),
]

urlpatterns += router.urls
