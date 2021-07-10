from neomodel import config
from graph_models import Person
from neomodel import db

# config.DATABASE_URL = "bolt://neo4j:heyya@localhost:7687"

# x = Person.nodes.filter(politician=True)
# for person in x:
#     print(person)


n1 = "Shah Rukh Khan"
n2 = "Amitabh Bachchan"
# print(n1, n2)

config.DATABASE_URL = "bolt://neo4j:heyya@localhost:7687"

shortest_path_text = (
    "MATCH (charlie:Person {name: '" + n1 + "'}),"
    "(martin:Person {name: '" + n2 + "'}),"
    "p = shortestPath( (charlie)-[*]-(martin) )"
    "WHERE all(r in relationships(p) WHERE type(r) = 'ACTED_IN')"
    "RETURN p"
)
results, meta = db.cypher_query(shortest_path_text)
# print(shortest_path_text)
print(results)
print("META: ", meta)
# print(meta)
pp = []
# for x in results[0][1]:
#     # print(x)
#     pp.append(x["name"])
pp2 = tuple(pp)
# print(pp2)
# return JsonResponse({"shortestpath": pp2})