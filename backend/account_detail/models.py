from django.db import models

from authentication.models import User

# Create your models here.
# models.py file is use for setting or formatting of the field of the tables
# models.py is a template for the data defining the fields for the tables and their properties

class Account_Detail(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    total_amount = models.FloatField()



