from django.shortcuts import render
from . import forms
from graphapp.models import Node, Person
from neomodel import (
    StructuredNode,
    StringProperty,
    BooleanProperty,
    RelationshipTo,
    RelationshipFrom,
    config,
)
from neomodel import db


# Create your views here.
def index(request):
    return render(request, "graphapp/index.html")


def form_name_view(request):
    form = forms.FormName()

    if request.method == "POST":
        form = forms.FormName(request.POST)

        if form.is_valid():
            form.save(commit=True)
            print("validated")
            n1 = form.data["name1"]
            n2 = form.data["name2"]
            config.DATABASE_URL = "bolt://neo4j:atharva@localhost:7687"

            shortest_path_text = (
                "MATCH (b1:Person { name:'"
                + n1
                + "'}), (b2:Person{ name:'"
                + n2
                + "'}), path = shortestPath((b1)-[*..15]-(b2)) RETURN path, NODES(path) as ns;"
            )
            results, meta = db.cypher_query(shortest_path_text)
            pp = []
            for x in results[0][1]:
                # print(x)
                pp.append(x["name"])
            pp2 = tuple(pp)
            return render(request, "graphapp/shortest.html", {"path": pp2})

        else:
            print("FORM IS INVALID")

    return render(request, "graphapp/form_page.html", {"form": form})

def mutual(request):
    form = forms.FormName()

    if request.method == "POST":
        form = forms.FormName(request.POST)

        if form.is_valid():
            form.save(commit=True)
            print("validated")
            n1 = form.data["name1"]
            n2 = form.data["name2"]
            config.DATABASE_URL = "bolt://neo4j:atharva@localhost:7687"

            mutual_text = (
                "MATCH (a:Person {name:'"
                + n1
                + "'})-[:KNOWS]->(m)<-[:KNOWS]-(c:Person{name:'"
                + n2
                + "'}) RETURN  m.name"
            )

            results, meta = db.cypher_query(mutual_text)
            pp = []
            for x in results:
                # print(x)
                pp.append(x[0])
            pp2 = tuple(pp)

            return render(request, "graphapp/mutual.html", {"path": pp2})

        else:
            print("FORM IS INVALID")

    return render(request, "graphapp/form_page.html", {"form": form})

def see_nodes(request):

    if request.method == "GET":

        nodes = Node.objects.all()

        args = {"nodes": nodes}
        return render(request, "graphapp/index.html", args)

    return render(request, "graphapp/index.html")

def reco(request):
    form = forms.SingleQueryForm()

    if request.method == "POST":
        form = forms.SingleQueryForm(request.POST)

        if form.is_valid():
            form.save(commit=True)
            print("validated")
            n1 = form.data["name1"]
            config.DATABASE_URL = "bolt://neo4j:atharva@localhost:7687"

            reco_text = (
                "MATCH (p:Person{name:'"
                + n1
                + "'})<-[r:KNOWS]-(b)-[:KNOWS]->(friend:Person) WHERE NOT EXISTS {MATCH (p)-[:KNOWS]->(friend)}RETURN friend.name"
            )

            results, meta = db.cypher_query(reco_text)
            pp = []
            for x in results:
                # print(x)
                pp.append(x[0])
            pp2 = tuple(pp)

            return render(request, "graphapp/reco.html", {"path": pp2, "name":n1})

        else:
            print("FORM IS INVALID")

    return render(request, "graphapp/form_page.html", {"form": form})
