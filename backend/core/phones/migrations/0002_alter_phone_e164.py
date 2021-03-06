# Generated by Django 3.2 on 2021-08-31 09:40

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('phones', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='phone',
            name='e164',
            field=models.CharField(max_length=15, unique=True, validators=[django.core.validators.RegexValidator(message='Phone number must be entered in the format: +14155552671', regex='^\\+[1-9]\\d{1,14}$')]),
        ),
    ]
