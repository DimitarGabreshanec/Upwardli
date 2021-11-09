from django.contrib import admin

from partners.models import ReferralsTracking


@admin.register(ReferralsTracking)
class ReferralsTrackingAdmin(admin.ModelAdmin):
    list_filter = ("partner", "offer_url")
