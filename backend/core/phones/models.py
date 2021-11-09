from django.contrib.auth import get_user_model
from django.core.validators import RegexValidator
from django.db import models

User = get_user_model()


class Phone(models.Model):
    user = models.ForeignKey(User, related_name="phones", on_delete=models.PROTECT)
    phone_regex = RegexValidator(
        regex=r"^\+[1-9]\d{1,14}$",
        message="Phone number must be entered in the format: +14155552671",
    )
    phone = models.CharField(
        unique=True,
        max_length=15,
        validators=[
            phone_regex,
        ],
    )

    def __str__(self):
        return self.phone
