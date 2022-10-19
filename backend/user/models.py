
from django.db import models


# Create your models here.


class User(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    address_1 = models.CharField(max_length=30)
    address_2 = models.CharField(max_length=30)
    city = models.CharField(max_length=30)
    state = models.CharField(max_length=30)
    zipcode = models.CharField(max_length=30)
    email = models.CharField(max_length=30)
    phone_number = models.CharField(max_length=30)
    admin = models.CharField(max_length=30)






