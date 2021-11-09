from django.contrib import admin

from .models import (
    GuideModule,
    GuideStep,
    GuideStaticPage,
    GuideSimpleFormChoices,
    GuideSimpleForm,
    GuideStaticPageListWithIcons,
    Guide,
    GuideMultiChoiceFormChoices,
    GuideMultiChoiceForm,
)


@admin.register(Guide)
class GuideAdmin(admin.ModelAdmin):
    list_display = ("title", "sort_index")
    list_editable = ("sort_index",)


@admin.register(GuideModule)
class GuideModuleAdmin(admin.ModelAdmin):
    list_display = ("title", "sort_index")
    list_editable = ("sort_index",)


@admin.register(GuideStep)
class GuideStepAdmin(admin.ModelAdmin):
    list_display = ("guide_module", "sort_index", "content_type")
    list_editable = ("sort_index",)
    list_filter = ("guide_module",)


@admin.register(GuideStaticPageListWithIcons)
class GuideStaticPageListWithIconsAdmin(admin.ModelAdmin):
    list_display = ("text", "sort_index")
    list_editable = ("sort_index",)


class GuideStaticPageListWithIconsInline(admin.TabularInline):
    model = GuideStaticPageListWithIcons


@admin.register(GuideStaticPage)
class GuideStaticPageAdmin(admin.ModelAdmin):
    inlines = [GuideStaticPageListWithIconsInline]


@admin.register(GuideSimpleFormChoices)
class GuideSimpleFormChoicesAdmin(admin.ModelAdmin):
    list_display = ("text", "sort_index")
    list_editable = ("sort_index",)


class GuideSimpleFormChoicesInline(admin.TabularInline):
    model = GuideSimpleFormChoices


@admin.register(GuideSimpleForm)
class GuideSimpleFormAdmin(admin.ModelAdmin):
    inlines = [
        GuideSimpleFormChoicesInline,
    ]


@admin.register(GuideMultiChoiceFormChoices)
class GuideMultiChoiceFormChoicesAdmin(admin.ModelAdmin):
    list_display = ("text", "sort_index")
    list_editable = ("sort_index",)


class GuideMultiChoiceFormChoicesInline(admin.TabularInline):
    model = GuideMultiChoiceFormChoices


@admin.register(GuideMultiChoiceForm)
class GuideMultiChoiceFormAdmin(admin.ModelAdmin):
    inlines = [
        GuideMultiChoiceFormChoicesInline,
    ]
