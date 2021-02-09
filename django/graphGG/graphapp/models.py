from django.db import models
from neomodel import (
    StructuredNode,
    StringProperty,
    BooleanProperty,
    RelationshipTo,
    RelationshipFrom,
    config,
)

# Create your models here.
class Node(models.Model):
    name1 = models.CharField(("Name 1"), max_length=100)
    name2 = models.CharField(("Name 2"), max_length=100)

class Person(StructuredNode):
    name = StringProperty(unique_index=True)
    friends = RelationshipTo("Person", "KNOWS")
    politician = BooleanProperty()
    cricketer = BooleanProperty()

class SingleQuery(models.Model):
    name1 = models.CharField(("Name 1"), max_length=100)