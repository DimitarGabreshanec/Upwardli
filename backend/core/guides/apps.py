from django.apps import AppConfig


class GuidesConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "guides"

    def ready(self):
        import guides.signals  # noqa  pylint: disable=C0415,W0611
