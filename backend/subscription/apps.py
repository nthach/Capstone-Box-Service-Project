from django.apps import AppConfig


#apps.py file is use for making the table database available for the frontend


class SubscriptionConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'subscription'
