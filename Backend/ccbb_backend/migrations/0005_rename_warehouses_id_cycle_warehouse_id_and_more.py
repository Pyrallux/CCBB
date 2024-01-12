# Generated by Django 5.0.1 on 2024-01-12 01:47

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ccbb_backend', '0004_alter_cycle_parts'),
    ]

    operations = [
        migrations.RenameField(
            model_name='cycle',
            old_name='warehouses_id',
            new_name='warehouse_id',
        ),
        migrations.RemoveField(
            model_name='cycle',
            name='parts',
        ),
        migrations.AddField(
            model_name='cycle',
            name='date',
            field=models.DateField(default='2024-2-12'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='warehouse',
            name='manual',
            field=models.BooleanField(default=True),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='cycle',
            name='bin',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='cycle',
            name='name',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='warehouse',
            name='name',
            field=models.CharField(max_length=100),
        ),
        migrations.CreateModel(
            name='Parts_in_system',
            fields=[
                ('parts_in_system_id', models.AutoField(primary_key=True, serialize=False)),
                ('number', models.CharField(max_length=100)),
                ('quantity', models.FloatField(max_length=100)),
                ('cycle_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ccbb_backend.cycle')),
            ],
        ),
        migrations.CreateModel(
            name='Parts_present',
            fields=[
                ('parts_present_id', models.AutoField(primary_key=True, serialize=False)),
                ('number', models.CharField(max_length=100)),
                ('quantity', models.FloatField()),
                ('cycle_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ccbb_backend.cycle')),
            ],
        ),
    ]
