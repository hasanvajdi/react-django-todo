# Generated by Django 3.2.7 on 2021-09-29 08:08

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=200)),
                ('count', models.IntegerField()),
                ('todo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='whic_todo', to='todo.todo')),
            ],
        ),
    ]
