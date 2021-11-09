from rest_framework.routers import DefaultRouter

from guides.views import GuideViewSet, GuideModulesViewSet

router = DefaultRouter()

router.register("guides", GuideViewSet, basename="guides")
router.register("guides-modules", GuideModulesViewSet, basename="guides-modules")

app_name = "guides"
urlpatterns = router.urls
