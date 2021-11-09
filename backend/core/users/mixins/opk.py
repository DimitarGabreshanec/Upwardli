from django.conf import settings
from hashids import Hashids

hashids = Hashids(salt=settings.HASHIDS_SALT)


class OPKMixin:
    id: int

    @property
    def opk(self):
        """Transform id into a hashid"""
        return hashids.encode(self.id)
