import os

import django
from django.core.management import call_command

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()


# pylint: disable=unused-argument
def command_handler(event, context) -> None:
    """Handle django management commands in a lambda."""
    print(event)
    print(event["command"])
    call_command(event["command"])


# pylint: disable=unused-argument
def task_handler(event, context) -> None:
    """Handle Celery tasks invoked via SQS in a lambda."""
