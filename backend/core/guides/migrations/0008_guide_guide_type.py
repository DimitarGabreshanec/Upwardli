# Generated by Django 3.2 on 2021-10-14 09:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('guides', '0007_rename_simple_form_item_id_userguidemultichoiceformchoice_multi_choice_form_item_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='guide',
            name='guide_type',
            field=models.CharField(choices=[('guide', 'Guide'), ('onboarding', 'Onboarding')], default='guide', max_length=30),
        ),
    ]
