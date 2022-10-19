from django.db import models

from authentication.models import User

# Create your models here.
# models.py file is use for setting or formatting of the field of the tables

class Account_Detail(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    account_detail = models.CharField(max_length=30)
    products = models.CharField(max_length=100)
    subscription = models.IntegerField()
    tiers = models.IntegerField()



