# Generated by Django 4.0.6 on 2022-08-01 21:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('page', '0006_tachihome'),
    ]

    operations = [
        migrations.AddField(
            model_name='page',
            name='home',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='posts', to='page.tachihome'),
            preserve_default=False,
        ),
    ]
