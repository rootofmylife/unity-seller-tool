from django.db import models

# Create your models here.
class Email(models.Model):
    email = models.EmailField(max_length=254)
    sub_date = models.DateTimeField(auto_now_add=True)