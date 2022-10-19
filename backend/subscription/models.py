from django.db import models
from authentication.models import User
# Create your models here.
class Subscription(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    skin_care_product = models.CharField(max_length=30)
    cosmetic_product = models.CharField(max_length=30)
    fragrance_product = models.CharField(max_length=30)
    tier = models.IntegerField()

#Could make separate tables for all products + tiers