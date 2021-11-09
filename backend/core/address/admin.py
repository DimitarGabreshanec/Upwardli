from django.contrib import admin

from address.models import Address


@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ("address_line1", "city", "country")
    list_filter = ("country",)
    search_fields = ("address_line1", "address_line2", "city", "country", "zip")
