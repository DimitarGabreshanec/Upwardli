from django.db import models


class SortingModel(models.Model):
    """Sorting abstract model"""

    sort_index = models.PositiveIntegerField()

    class Meta:
        abstract = True
