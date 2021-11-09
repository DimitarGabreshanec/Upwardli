# Generated by Django 3.2 on 2021-10-14 10:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('financial_profile', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='financialprofile',
            name='live_in_us',
            field=models.CharField(help_text='How long have you lived in the U.S.?', max_length=250, null=True, verbose_name='Lived in the U.S.'),
        ),
        migrations.AddField(
            model_name='financialprofile',
            name='residence_status',
            field=models.CharField(help_text='What is your residence status in the U.S.?', max_length=250, null=True, verbose_name='Residence status in the U.S.'),
        ),
    ]
