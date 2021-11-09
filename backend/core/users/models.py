from typing import List

from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractUser
from django.db import models

from users.mixins.opk import OPKMixin


class UpwardliUser(AbstractUser, OPKMixin):
    USERNAME_FIELD: str = "email"
    email = models.EmailField("email address", unique=True)
    REQUIRED_FIELDS: List[str] = []


class UserInfo(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.PROTECT)
    question = models.CharField(max_length=250)
    answer = models.TextField()
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "{} {}".format(self.question, self.user)
