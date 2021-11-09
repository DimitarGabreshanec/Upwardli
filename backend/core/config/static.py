# pylint: disable=wildcard-import, unused-wildcard-import
from .apps import *

# These are unused and get re-defined in settings.py
HASHIDS_SALT = ""
SECRET_KEY = "foobar"
BASE_URL = "core/"

STATIC_URL = BASE_URL + "static/"
STATIC_ROOT = "/app/web/out/"

STATICFILES_FINDERS = (
    "django.contrib.staticfiles.finders.FileSystemFinder",
    "staticfiles_noimport.finders.AppDirectoriesNoImportFinder",
)

STATICFILES_STORAGE = "django.contrib.staticfiles.storage.ManifestStaticFilesStorage"
