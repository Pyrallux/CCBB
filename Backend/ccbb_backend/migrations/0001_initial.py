# Generated by Django 5.0.1 on 2024-01-11 02:16

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Warehouses',
            fields=[
                ('warehouses_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Cycles',
            fields=[
                ('cycles_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=20)),
                ('parts', models.CharField(max_length=50)),
                ('bin', models.CharField(max_length=20)),
                ('warehouses_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ccbb_backend.warehouses')),
            ],
        ),
    ]
