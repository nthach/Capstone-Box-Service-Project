
from django.db import models



# Create your models here.



class Tiers(models.Model):
    tier_name = models.CharField(max_length=50)
    tier_price = models.FloatField()

