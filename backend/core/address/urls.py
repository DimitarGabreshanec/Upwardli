from rest_framework.routers import DefaultRouter

from address.views import AddressViewSet

router = DefaultRouter()

router.register("addresses", AddressViewSet, basename="addresses")
