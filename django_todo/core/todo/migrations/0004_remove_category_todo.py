# Generated by Django 3.2.7 on 2021-09-29 09:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0003_alter_category_todo'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='category',
            name='todo',
        ),
    ]