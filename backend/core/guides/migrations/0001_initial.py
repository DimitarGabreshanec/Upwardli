# Generated by Django 3.2 on 2021-08-24 04:19

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import markdownfield.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Guide',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sort_index', models.PositiveIntegerField(unique=True)),
                ('title', models.CharField(default='default title', help_text='Appears as the title for this guide', max_length=100)),
                ('slug', models.SlugField(help_text='Used by the clients to lookup specific guides.', unique=True)),
                ('reading_time', models.CharField(help_text='Time to read the guide.', max_length=10)),
                ('image', models.ImageField(null=True, upload_to='images', verbose_name='Guide module image.')),
            ],
            options={
                'ordering': ['sort_index', 'id'],
            },
        ),
        migrations.CreateModel(
            name='GuideModule',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sort_index', models.PositiveIntegerField(unique=True)),
                ('title', models.CharField(help_text='Appears as the title for this guide module', max_length=100)),
                ('slug', models.SlugField(help_text='Used by the clients to lookup specific guide modules.', unique=True)),
                ('guide', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='guide_modules', to='guides.guide')),
            ],
            options={
                'ordering': ['sort_index', 'id'],
            },
        ),
        migrations.CreateModel(
            name='GuideSimpleForm',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(help_text='Form title for guide simple form', max_length=250)),
            ],
        ),
        migrations.CreateModel(
            name='GuideSimpleFormChoices',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sort_index', models.PositiveIntegerField(unique=True)),
                ('text', models.CharField(help_text='Choices for guide simple form', max_length=250)),
                ('image', models.ImageField(blank=True, null=True, upload_to='', verbose_name='Image for guide simple form')),
                ('guide_simple_form', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='items', to='guides.guidesimpleform')),
            ],
            options={
                'ordering': ['sort_index', 'id'],
            },
        ),
        migrations.CreateModel(
            name='GuideStaticPage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(help_text='Page title for guide static page', max_length=250)),
                ('text', markdownfield.models.MarkdownField(blank=True, help_text='Page text for guide static page', null=True, rendered_field='text_rendered')),
                ('text_rendered', markdownfield.models.RenderedMarkdownField()),
                ('image', models.ImageField(blank=True, null=True, upload_to='pages', verbose_name='Image for  guide static page')),
                ('video_url', models.CharField(blank=True, max_length=250, null=True, verbose_name='Video url')),
            ],
        ),
        migrations.CreateModel(
            name='GuideStep',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sort_index', models.PositiveIntegerField(unique=True)),
                ('content_type', models.CharField(choices=[('static_page', 'Static pages'), ('simple_choice_form', 'Simple choice form'), ('custom', 'Custom content')], default='static_page', max_length=100)),
                ('button_text', models.CharField(blank=True, help_text='Button text for guide step', max_length=100, null=True)),
                ('guide_module', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='steps', to='guides.guidemodule')),
            ],
            options={
                'ordering': ['sort_index', 'id'],
                'unique_together': {('guide_module', 'sort_index')},
            },
        ),
        migrations.CreateModel(
            name='UserGuideSimpleFormChoice',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('simple_form_item_id', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='guides.guidesimpleformchoices')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='GuideStepCustomContent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.SlugField(help_text='The code name for the user content.', max_length=250)),
                ('guide_step', models.OneToOneField(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='custom_content', to='guides.guidestep')),
            ],
        ),
        migrations.CreateModel(
            name='GuideStaticPageListWithIcons',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sort_index', models.PositiveIntegerField(unique=True)),
                ('text', models.CharField(help_text='Option for static page list with icons.', max_length=250)),
                ('image', models.ImageField(blank=True, null=True, upload_to='', verbose_name='Icon for static page list with icons.')),
                ('guide_simple_form', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='options', to='guides.guidestaticpage')),
            ],
            options={
                'ordering': ['sort_index', 'id'],
            },
        ),
        migrations.AddField(
            model_name='guidestaticpage',
            name='guide_step',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='page', to='guides.guidestep'),
        ),
        migrations.AddField(
            model_name='guidesimpleform',
            name='guide_step',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='simple_form', to='guides.guidestep'),
        ),
        migrations.CreateModel(
            name='GuideModuleRead',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('guide_module', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='read', to='guides.guidemodule')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]