from django.contrib.auth.hashers import make_password
from django.core.management.base import BaseCommand

from debug.management.commands._seed_guides import SeedGuides
from debug.management.commands._seed_offers import SeedOffers
from debug.test.factories import UserFactory


class Command(BaseCommand):
    help = "Seed User fixtures for use in development"

    def handle(self, *args, **options):
        self.stdout.write("Seeding auth_user table")
        UserFactory.create(
            email="staff@upwardli.com",
            username="upwardli-staff",
            password=make_password("upwardli"),
            is_staff=True,
            is_superuser=True,
        )
        UserFactory.create(
            email="member@upwardli.com",
            username="upwardli-member",
            password=make_password("upwardli"),
            is_staff=False,
            is_superuser=False,
        )

        seed_guides = SeedGuides(self.stdout, self.stderr)
        seed_guides.create_guides()

        seed_channels = SeedOffers(self.stdout, self.stderr)
        seed_channels.get_or_create_offers()

        self.stdout.write(self.style.SUCCESS("Done"))
