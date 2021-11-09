from django.contrib import admin

from financial_profile.models import FinancialProfile


@admin.register(FinancialProfile)
class FinancialProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "salary", "occupation")
