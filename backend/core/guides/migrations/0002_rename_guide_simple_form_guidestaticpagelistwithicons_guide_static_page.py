# Generated by Django 3.2 on 2021-08-30 08:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('guides', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='guidestaticpagelistwithicons',
            old_name='guide_simple_form',
            new_name='guide_static_page',
        ),
    ]
