from django.db import models

from symbol import subscript

# Create your models here.

class Car(models.Model):
    user = models.ForeignKey(user, on_delete=models.CASCADE)
    account_detail = models.CharField(max_length=30)
    products = models.CharField(max_length=100)
    subscription = models.IntegerField()
    tiers = models.IntegerField()



