# Generated by Django 3.2 on 2021-09-02 10:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('address', '0002_auto_20210902_1023'),
    ]

    operations = [
        migrations.RenameField(
            model_name='address',
            old_name='lon',
            new_name='lng',
        ),
    ]
