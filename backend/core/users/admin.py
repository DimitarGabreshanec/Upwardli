from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from users.models import UpwardliUser, UserInfo

admin.site.register(UpwardliUser, UserAdmin)


@admin.register(UserInfo)
class UserInfoAdmin(admin.ModelAdmin):
    list_display = ("user", "question", "answer", "created")
    search_fields = ("user__email", "question", "answer", "created")
