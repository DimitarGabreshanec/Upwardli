from rest_framework.routers import DefaultRouter

from financial_profile.views import FinancialProfileViewSet

router = DefaultRouter()

router.register(
    "financial-profile", FinancialProfileViewSet, basename="financial-profile"
)

app_name = "financial_profile"
urlpatterns = router.urls
