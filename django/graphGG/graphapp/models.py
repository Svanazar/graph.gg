from django.db import models

# Create your models here.
class Node(models.Model):
    name1 = models.CharField(("Name 1"), max_length=100)
    name2 = models.CharField(("Name 2"), max_length=100)

