# Generated by Django 3.2 on 2021-09-15 11:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('offers', '0003_offer_partner_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='offer',
            name='cta_url',
        ),
        migrations.AlterField(
            model_name='offer',
            name='category',
            field=models.CharField(choices=[('money-transfer', 'Money transfer'), ('student-loans', 'Student loans'), ('credit-building-cards', 'credit building cards'), ('credit-cards', 'Credit building cards'), ('credit-builder', 'Credit builder'), ('banking', 'Banking')], max_length=100),
        ),
        migrations.DeleteModel(
            name='OfferCategory',
        ),
    ]
