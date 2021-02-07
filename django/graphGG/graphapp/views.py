from django.shortcuts import render
from . import forms
from graphapp.models import Node
from neomodel import (
    StructuredNode,
    StringProperty,
    BooleanProperty,
    RelationshipTo,
    RelationshipFrom,
    config,
)
from neomodel import db


class Person(StructuredNode):
    name = StringProperty(unique_index=True)
    friends = RelationshipTo("Person", "KNOWS")
    politician = BooleanProperty()
    cricketer = BooleanProperty()


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
            config.DATABASE_URL = "bolt://neo4j:pass@localhost:7687"

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


def see_nodes(request):

    if request.method == "GET":

        nodes = Node.objects.all()

        args = {"nodes": nodes}
        return render(request, "graphapp/index.html", args)

    return render(request, "graphapp/index.html")
