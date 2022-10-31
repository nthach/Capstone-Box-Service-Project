

from django.db import models
from authentication.models import User

# Create your models here.
# models.py is a template for the data defining the fields for the tables and their properties

# <<<<<<<<<<<<<<<<< EXAMPLE FOR STARTER CODE USE <<<<<<<<<<<<<<<<<


class Car(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    make = models.CharField(max_length=30)
    model = models.CharField(max_length=100)
    year = models.IntegerField()
