from django.urls import path

from partners.views import partner

urlpatterns = [
    path("<partner_name>/", partner, name="redirect_tracking"),
]
