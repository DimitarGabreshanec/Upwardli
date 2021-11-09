from django.contrib.auth import get_user_model
from django.db import models
from markdownfield.models import MarkdownField, RenderedMarkdownField
from markdownfield.validators import VALIDATOR_STANDARD

from config.abstract_models import SortingModel

User = get_user_model()


class GuideType(models.TextChoices):
    """Types of guides."""

    GUIDE = "guide", "Guide"
    ONBOARDING = "onboarding", "Onboarding"


class Guide(SortingModel):
    title = models.CharField(
        help_text="Appears as the title for this guide",
        max_length=100,
        default="default title",
    )
    slug = models.SlugField(
        help_text="Used by the clients to lookup specific guides.",
        unique=True,
    )
    reading_time = models.CharField(help_text="Time to read the guide.", max_length=10)
    image = models.ImageField("Guide module image.", null=True, upload_to="images")
    guide_type = models.CharField(
        max_length=30, choices=GuideType.choices, default=GuideType.GUIDE
    )

    class Meta:
        ordering = ["sort_index", "id"]
        unique_together = ["sort_index", "guide_type"]

    def __str__(self) -> str:
        return "{}".format(self.title)


class GuideModule(SortingModel):
    """The guide module."""

    guide = models.ForeignKey(
        Guide, on_delete=models.PROTECT, null=True, related_name="guide_modules"
    )
    title = models.CharField(
        help_text="Appears as the title for this guide module", max_length=100
    )
    slug = models.SlugField(
        help_text="Used by the clients to lookup specific guide modules.",
        unique=True,
    )

    class Meta:
        ordering = ["sort_index", "id"]

    def __str__(self) -> str:
        return "{}".format(self.title)


class GuideStepContentType(models.TextChoices):
    """The content type for the guide step."""

    STATIC_PAGE = "static_page", "Static pages"
    SIMPLE_CHOICE_FORM = "simple_choice_form", "Simple choice form"
    MULTI_CHOICE_FORM = "multiple_choice_form", "Multiple choice form"
    CUSTOM = "custom", "Custom content"


class GuideStep(SortingModel):
    """The step of the guide."""

    guide_module = models.ForeignKey(
        GuideModule, on_delete=models.PROTECT, null=True, related_name="steps"
    )
    content_type = models.CharField(
        choices=GuideStepContentType.choices,
        default=GuideStepContentType.STATIC_PAGE,
        max_length=100,
    )
    button_text = models.CharField(
        help_text="Button text for guide step", max_length=100, blank=True, null=True
    )

    class Meta:
        ordering = ["sort_index", "id"]
        unique_together = ["guide_module", "sort_index"]

    def __str__(self) -> str:
        return 'Module "{}" - step № {}'.format(
            self.guide_module.title, self.sort_index
        )


class GuideStaticPage(models.Model):
    """A static guide page."""

    guide_step = models.OneToOneField(
        GuideStep, on_delete=models.PROTECT, null=True, related_name="page"
    )
    title = models.CharField(
        help_text="Page title for guide static page", max_length=250
    )
    text = MarkdownField(
        rendered_field="text_rendered",
        validator=VALIDATOR_STANDARD,
        help_text="Page text for guide static page",
        null=True,
        blank=True,
    )
    text_rendered = RenderedMarkdownField()
    image = models.ImageField(
        "Image for  guide static page", upload_to="pages", null=True, blank=True
    )
    video_url = models.CharField(
        "Video url",
        null=True,
        blank=True,
        max_length=250,
    )

    def __str__(self) -> str:
        return "{}".format(self.title)


class GuideStaticPageListWithIcons(SortingModel):
    """A list with pictures for a static page."""

    guide_static_page = models.ForeignKey(
        GuideStaticPage, on_delete=models.CASCADE, related_name="options"
    )
    text = models.CharField(
        help_text="Option for static page list with icons.", max_length=250
    )
    image = models.ImageField(
        "Icon for static page list with icons.", null=True, blank=True
    )

    class Meta:
        ordering = ["sort_index", "id"]
        unique_together = ["guide_static_page", "sort_index"]

    def __str__(self) -> str:
        return "{}".format(self.text)


class GuideSimpleForm(models.Model):
    """The selection form for the user."""

    guide_step = models.OneToOneField(
        GuideStep, on_delete=models.PROTECT, null=True, related_name="simple_form"
    )
    title = models.CharField(
        help_text="Form title for guide simple form", max_length=250
    )

    def __str__(self) -> str:
        return "{}".format(self.title)


class GuideSimpleFormChoices(SortingModel):
    """Selection options for a simple form."""

    guide_simple_form = models.ForeignKey(
        GuideSimpleForm, on_delete=models.CASCADE, related_name="items"
    )
    text = models.CharField(help_text="Choices for guide simple form", max_length=250)
    image = models.ImageField("Image for guide simple form", null=True, blank=True)

    class Meta:
        ordering = ["sort_index", "id"]
        unique_together = ["guide_simple_form", "sort_index"]

    def __str__(self) -> str:
        return "{}".format(self.text)


class GuideStepCustomContent(models.Model):
    """The code name for the user content.
    For example: 'user_phone_form'"""

    guide_step = models.OneToOneField(
        GuideStep, on_delete=models.PROTECT, null=True, related_name="custom_content"
    )
    name = models.SlugField(
        help_text="The code name for the user content.", max_length=250
    )

    def __str__(self) -> str:
        return "{}".format(self.name)


class GuideModuleRead(models.Model):
    """Here we will keep a mark that the guide module has been read by the user."""

    guide_module = models.ForeignKey(
        GuideModule, on_delete=models.PROTECT, null=True, related_name="read"
    )
    user = models.ForeignKey(User, on_delete=models.PROTECT)


class UserGuideSimpleFormChoice(models.Model):
    """Here we will save the results of the user's choice."""

    user = models.ForeignKey(User, on_delete=models.PROTECT)
    simple_form_item_id = models.ForeignKey(
        GuideSimpleFormChoices, on_delete=models.PROTECT
    )


class GuideMultiChoiceForm(models.Model):
    """The multi selection form for the user."""

    guide_step = models.OneToOneField(
        GuideStep, on_delete=models.PROTECT, null=True, related_name="multi_choice_form"
    )
    title = models.CharField(
        help_text="Form title for guide multi choice form", max_length=250
    )

    def __str__(self) -> str:
        return "{}".format(self.title)


class GuideMultiChoiceFormChoices(SortingModel):
    """Selection options for a GuideMultiChoiceForm."""

    guide_multi_choices_form = models.ForeignKey(
        GuideMultiChoiceForm, on_delete=models.CASCADE, related_name="items"
    )
    text = models.CharField(
        help_text="Choices for guide multi choices form", max_length=250
    )
    image = models.ImageField(
        "Image for guide multi choices form", null=True, blank=True
    )

    class Meta:
        ordering = ["sort_index", "id"]
        unique_together = ["guide_multi_choices_form", "sort_index"]

    def __str__(self) -> str:
        return "{}".format(self.text)


class UserGuideMultiChoiceFormChoice(models.Model):
    """Here we will save the results of the user's multiple selection."""

    user = models.ForeignKey(User, on_delete=models.PROTECT)
    multi_choice_form_item_id = models.ForeignKey(
        GuideMultiChoiceFormChoices, on_delete=models.PROTECT
    )
