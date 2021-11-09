from typing import Any, Dict

from django.db.models import Count, Q
from rest_framework import serializers

from .models import (
    GuideModule,
    GuideStep,
    GuideStaticPage,
    GuideSimpleForm,
    GuideSimpleFormChoices,
    GuideStepContentType,
    GuideStaticPageListWithIcons,
    GuideModuleRead,
    UserGuideSimpleFormChoice,
    GuideStepCustomContent,
    Guide,
    UserGuideMultiChoiceFormChoice,
    GuideMultiChoiceForm,
    GuideMultiChoiceFormChoices,
)


class GuideSimpleFormChoicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = GuideSimpleFormChoices
        fields = ("id", "text", "image")


class GuideSimpleFormSerializer(serializers.ModelSerializer):
    items = GuideSimpleFormChoicesSerializer(many=True)

    class Meta:
        model = GuideSimpleForm
        fields = ("id", "title", "items")


class GuideStaticPageListWithIconsSerializer(serializers.ModelSerializer):
    class Meta:
        model = GuideStaticPageListWithIcons
        fields = ("id", "text", "image", "sort_index")


class GuideStaticPageSerializer(serializers.ModelSerializer):
    options = GuideStaticPageListWithIconsSerializer(many=True)

    class Meta:
        model = GuideStaticPage
        fields = ("id", "title", "text", "text_rendered", "image", "options")


class GuideStepCustomContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = GuideStepCustomContent
        fields = ("name",)


class GuideGuideModuleReadSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = GuideModuleRead
        fields = ("guide_module", "user")


class UserGuideSimpleFormChoiceSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = UserGuideSimpleFormChoice
        fields = ("simple_form_item_id", "user")


class GuideSerializer(serializers.ModelSerializer):
    read = serializers.SerializerMethodField()

    class Meta:
        model = Guide
        fields = ("id", "title", "slug", "reading_time", "image", "read", "sort_index")

    def get_read(self, guide) -> bool:
        """A mark that the guide has been read by the user."""
        all_modules = guide.guide_modules.all().annotate(
            is_read=Count("read", filter=Q(read__user=self.context["request"].user))
        )
        if not all_modules:
            return False
        return all(module.is_read for module in all_modules)


class UserGuideMultiChoiceFormChoiceSerializer(serializers.ModelSerializer):
    """A serializer for saving results in multiple-choice forms."""

    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = UserGuideMultiChoiceFormChoice
        fields = ("multi_choice_form_item_id", "user")


class GuideMultiChoiceFormChoicesSerializer(serializers.ModelSerializer):
    """Guide multiChoice form"""

    class Meta:
        model = GuideMultiChoiceFormChoices
        fields = ("id", "text", "image")


class GuideMultiChoiceFormSerializer(serializers.ModelSerializer):
    """Guide multiChoice form items"""

    items = GuideMultiChoiceFormChoicesSerializer(many=True)

    class Meta:
        model = GuideMultiChoiceForm
        fields = ("id", "title", "items")


class UserGuideMultiChoiceFormSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = UserGuideMultiChoiceFormChoice
        fields = ("multi_choice_form_item_id", "user")


class UserGuideMultiChoiceFormSerializerItems(
    serializers.Serializer
):  # pylint: disable=W0223
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    multi_choice_form_item_ids = serializers.ListField()


class GuideStepSerializer(serializers.ModelSerializer):
    content = serializers.SerializerMethodField()

    class Meta:
        model = GuideStep
        fields = ("id", "sort_index", "content_type", "content", "button_text")

    # pylint: disable=no-self-use
    def get_content(self, step) -> Dict[str, Any]:
        """Gets the content of a guide step based on its type."""
        content = {}
        if step.content_type == GuideStepContentType.STATIC_PAGE:
            try:
                serializer = GuideStaticPageSerializer(
                    instance=step.page, context={"request": self.context["request"]}
                )
                content = serializer.data
            except GuideStaticPage.DoesNotExist:
                pass
        elif step.content_type == GuideStepContentType.MULTI_CHOICE_FORM:
            try:
                serializer = GuideMultiChoiceFormSerializer(
                    instance=step.multi_choice_form,
                    context={"request": self.context["request"]},
                )
                content = serializer.data
            except GuideMultiChoiceForm.DoesNotExist:
                pass
        elif step.content_type == GuideStepContentType.SIMPLE_CHOICE_FORM:
            try:
                serializer = GuideSimpleFormSerializer(
                    instance=step.simple_form,
                    context={"request": self.context["request"]},
                )
                content = serializer.data
            except GuideSimpleForm.DoesNotExist:
                pass
        elif step.content_type == GuideStepContentType.CUSTOM:
            try:
                serializer = GuideStepCustomContentSerializer(
                    instance=step.custom_content,
                    context={"request": self.context["request"]},
                )
                content = serializer.data
            except GuideStepCustomContent.DoesNotExist:
                pass
        return content


class GuideModuleSerializer(serializers.ModelSerializer):
    steps = GuideStepSerializer(many=True)

    class Meta:
        model = GuideModule
        fields = ("id", "title", "slug", "sort_index", "steps")


class GuideModuleDetailSerializer(serializers.ModelSerializer):
    steps = GuideStepSerializer(many=True)

    class Meta:
        model = GuideModule
        fields = ("id", "title", "slug", "steps")


class GuideDetailSerializer(serializers.ModelSerializer):
    guide_modules = GuideModuleSerializer(many=True)

    class Meta:
        model = Guide
        fields = ("id", "title", "slug", "guide_modules")
