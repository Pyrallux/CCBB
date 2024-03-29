# Generated by Django 5.0.1 on 2024-01-12 02:25

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ccbb_backend', '0007_rename_parts_in_system_partsinsystem_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='partspresent',
            name='bin_id',
        ),
        migrations.CreateModel(
            name='PresentPart',
            fields=[
                ('PresentPart_id', models.AutoField(primary_key=True, serialize=False)),
                ('number', models.CharField(max_length=100)),
                ('quantity', models.FloatField()),
                ('bin_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ccbb_backend.cycle')),
            ],
        ),
        migrations.CreateModel(
            name='SystemPart',
            fields=[
                ('SystemPart_id', models.AutoField(primary_key=True, serialize=False)),
                ('number', models.CharField(max_length=100)),
                ('quantity', models.FloatField(max_length=100)),
                ('bin_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ccbb_backend.cycle')),
            ],
        ),
        migrations.DeleteModel(
            name='PartsInSystem',
        ),
        migrations.DeleteModel(
            name='PartsPresent',
        ),
    ]
