from neomodel import config, StructuredNode, Relationship, StringProperty, IntegerProperty, RelationshipTo, RelationshipFrom, BooleanProperty

config.DATABASE_URL = 'bolt://neo4j:lekhchitra@localhost:7687'

class Person(StructuredNode):
    name = StringProperty(unique_index=True)
    friends = Relationship("Person", "KNOWS")
    politician = BooleanProperty()
    cricketer = BooleanProperty()
    bollywood = BooleanProperty()
    alive = BooleanProperty()
    pageLink = StringProperty()
    imgLink = StringProperty()
    indian = BooleanProperty()

class Team(StructuredNode):
    name = StringProperty(unique_index=True)
    players = RelationshipFrom("Person", "RELATED TO")

class Movie(StructuredNode):
    name= StringProperty(unique_index=True)
    actors = RelationshipFrom("Person", "ACTED_IN")
    year=IntegerProperty(default=2000)

class State(StructuredNode):
    name = StringProperty(unique_index=True)
    residents = RelationshipFrom("Person", "FROM")