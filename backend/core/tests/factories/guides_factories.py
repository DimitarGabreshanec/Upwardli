import factory

from guides import models


class GuideFactory(factory.django.DjangoModelFactory):
    """Guide factory."""

    image = factory.django.ImageField(color="blue")

    class Meta:
        model = models.Guide
        django_get_or_create = ("slug",)


class GuideModuleFactory(factory.django.DjangoModelFactory):
    """GuideModule factory."""

    guide = factory.SubFactory(GuideFactory)

    class Meta:
        model = models.GuideModule
        django_get_or_create = ("slug",)


class GuideStepFactory(factory.django.DjangoModelFactory):
    """GuideStep factory."""

    guide_module = factory.SubFactory(GuideModuleFactory)

    class Meta:
        model = models.GuideStep


class GuideSimpleFormFactory(factory.django.DjangoModelFactory):
    """GuideSimpleForm factory."""

    guide_step = factory.SubFactory(GuideStepFactory)

    class Meta:
        model = models.GuideSimpleForm
        django_get_or_create = ("guide_step",)


class GuideSimpleFormChoicesFactory(factory.django.DjangoModelFactory):
    """GuideSimpleFormChoices factory."""

    guide_simple_form = factory.SubFactory(GuideSimpleFormFactory)
    image = factory.django.ImageField(color="blue", width=10)

    class Meta:
        model = models.GuideSimpleFormChoices


class GuideStaticPageFactory(factory.django.DjangoModelFactory):
    """GuideStaticPage factory."""

    guide_step = factory.SubFactory(GuideStepFactory)
    image = factory.django.ImageField(color="blue")

    class Meta:
        model = models.GuideStaticPage
        django_get_or_create = ("guide_step",)


class GuideStaticPageListWithIconsFactory(factory.django.DjangoModelFactory):
    """GuideStaticPageListWithIcons factory."""

    guide_static_page = factory.SubFactory(GuideStaticPageFactory)
    image = factory.django.ImageField(color="blue", width=10)

    class Meta:
        model = models.GuideStaticPageListWithIcons


class GuideMultiChoiceFormFactory(factory.django.DjangoModelFactory):
    """GuideMultiChoiceForm factory."""

    guide_step = factory.SubFactory(GuideStepFactory)

    class Meta:
        model = models.GuideMultiChoiceForm
        django_get_or_create = ("guide_step",)


class GuideMultiChoiceFormChoicesFactory(factory.django.DjangoModelFactory):
    """GuideMultiChoiceFormChoices factory."""

    guide_multi_choices_form = factory.SubFactory(GuideMultiChoiceFormFactory)
    image = factory.django.ImageField(color="blue", width=10)

    class Meta:
        model = models.GuideMultiChoiceFormChoices
