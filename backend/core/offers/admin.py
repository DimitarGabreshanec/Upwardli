from django.contrib import admin
from django.db.models import JSONField
from jsoneditor.forms import JSONEditor

from offers.models import Offer


@admin.register(Offer)
class OfferAdmin(admin.ModelAdmin):
    formfield_overrides = {
        JSONField: {"widget": JSONEditor},
    }
