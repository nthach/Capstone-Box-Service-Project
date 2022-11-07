from django.db import models
from authentication.models import User
from tiers.models import Tiers


# Create your models here.
# models.py file is use for setting or formatting of the field of the tables
# models.py is a template for the data defining the fields for the tables and their properties

class Subscription(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    skin_care_product = models.CharField(max_length=30)
    cosmetic_product = models.CharField(max_length=30)
    fragrance_product = models.CharField(max_length=30)
    #tier = models.ForeignKey(Tiers)
    tier = models.IntegerField()

#Could make separate tables for all products + tiers