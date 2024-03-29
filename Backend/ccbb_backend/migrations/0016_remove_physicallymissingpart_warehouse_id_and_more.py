# Generated by Django 5.0.1 on 2024-03-16 19:08

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ccbb_backend', '0015_rename_warehouse_cycle_warehouse_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='physicallymissingpart',
            name='warehouse_id',
        ),
        migrations.RemoveField(
            model_name='systematicallymissingpart',
            name='warehouse_id',
        ),
        migrations.AddField(
            model_name='physicallymissingpart',
            name='bin_id',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='ccbb_backend.bin'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='systematicallymissingpart',
            name='bin_id',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='ccbb_backend.bin'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='presentpart',
            name='bin_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ccbb_backend.bin'),
        ),
        migrations.AlterField(
            model_name='systempart',
            name='bin_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ccbb_backend.bin'),
        ),
    ]
