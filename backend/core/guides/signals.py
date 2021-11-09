from django.db.models.signals import post_save
from django.dispatch import receiver

from guides.models import UserGuideSimpleFormChoice, UserGuideMultiChoiceFormChoice
from users.models import UserInfo


@receiver(post_save, sender=UserGuideSimpleFormChoice)
def update_user_profile_from_simple_form(**kwargs):
    """
    Save user information for any newly
    created instance of UserGuideSimpleFormChoice.
    """
    UserInfo.objects.create(
        user=kwargs["instance"].user,
        question=kwargs["instance"].simple_form_item_id.guide_simple_form.title,
        answer=kwargs["instance"].simple_form_item_id.text,
    )


@receiver(post_save, sender=UserGuideMultiChoiceFormChoice)
def update_user_profile_from_multi_choice_form(**kwargs):
    """
    Save user information for any newly
    created instance of UserGuideMultiChoiceFormChoice.
    """
    UserInfo.objects.create(
        user=kwargs["instance"].user,
        question=kwargs[
            "instance"
        ].multi_choice_form_item_id.guide_multi_choices_form.title,
        answer=kwargs["instance"].multi_choice_form_item_id.text,
    )
