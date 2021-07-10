from django.shortcuts import render
from . import forms
import json
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
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
from django.http import JsonResponse
import os

URL_NEO4J = os.getenv('NEO4J_URL')


class Person(StructuredNode):
    name = StringProperty(unique_index=True)
    friends = RelationshipTo("Person", "KNOWS")
    politician = BooleanProperty()
    cricketer = BooleanProperty()


# Create your views here.
def index(request):
    return render(request, "index.html")


@csrf_exempt
def collect_all(request):
    if request.method == "POST":
        config.DATABASE_URL = URL_NEO4J

        show_all_text = "MATCH (n : Person) RETURN n.name"

        results, meta = db.cypher_query(show_all_text)
        mylist = []

        for x in results:
            mylist.append(x[0])

        pp2 = tuple(mylist)

        return JsonResponse({"alltext": pp2})


@csrf_exempt
def collect_bolly(request):
    if request.method == "POST":
        config.DATABASE_URL = URL_NEO4J

        show_all_text = "MATCH (n : Person{bollywood:true}) RETURN n.name"

        results, meta = db.cypher_query(show_all_text)
        mylist = []

        for x in results:
            mylist.append(x[0])

        pp2 = tuple(mylist)

        return JsonResponse({"alltext": pp2})


@csrf_exempt
def adduser(request):
    if request.method == "POST":
        config.DATABASE_URL = URL_NEO4J
        received_json_data = json.loads(request.body)
        # print(received_json_data)
        user_name = received_json_data["value"]
        wiki_link = received_json_data["value2"]
        feedback = received_json_data["value3"]
        print(user_name, wiki_link, feedback)
        return HttpResponse(status=200)


@csrf_exempt
def friendrecs(request):
    if request.method == "POST":
        received_json_data = json.loads(request.body)
        # print(received_json_data)
        n1 = received_json_data["name1"]

        config.DATABASE_URL = URL_NEO4J
        recostext = (
            "MATCH (p:Person{name:'"
            + n1
            + "'})-[r:KNOWS]-(b)-[:KNOWS]-(friend:Person) WHERE NOT EXISTS { MATCH (p)-[:KNOWS]-(friend) } AND (friend.name<>p.name) RETURN friend.name,friend.imgLink, count(*) order by -count(*)"
        )
        #

        results, meta = db.cypher_query(recostext)

        results = results[:10]

        pp2 = tuple(results)
        return JsonResponse({"recos": pp2})

    else:
        return render(request, "graphapp/index.html")


@csrf_exempt
def collect_mutuals(request):
    if request.method == "POST":
        # print("HEllo")
        received_json_data = json.loads(request.body)
        print(received_json_data)
        # return render(request, "graphapp/index.html")
        n1 = received_json_data["name1"]
        n2 = received_json_data["name2"]
        # print(n1, n2)

        config.DATABASE_URL = URL_NEO4J

        mutual_text = (
            "MATCH (a:Person {name:'"
            + n1
            + "'})-[:KNOWS]-(m)-[ :KNOWS]-(c:Person{name:'"
            + n2
            + "'}) RETURN  m"
        )

        results, meta = db.cypher_query(mutual_text)
        pp = []
        for x in results:
            tmp = []
            tmp.append(x[0]["name"])
            tmp.append(x[0]["imgLink"])
            pp.append(tmp)
        pp2 = tuple(pp)
        return JsonResponse({"mutuals": pp2})

    else:
        return render(request, "graphapp/index.html")


@csrf_exempt
def bollymovies(request):
    if request.method == "POST":
        # print("HEllo")
        received_json_data = json.loads(request.body)
        print(received_json_data)
        # return render(request, "graphapp/index.html")
        n1 = received_json_data["name1"]
        n2 = received_json_data["name2"]
        # print(n1, n2)

        config.DATABASE_URL = URL_NEO4J

        shortest_path_text = (
            "MATCH (charlie:Person {name: '" + n1 + "'}),"
            "(martin:Person {name: '" + n2 + "'}),"
            "p = shortestPath( (charlie)-[*]-(martin) )"
            "WHERE all(r in relationships(p) WHERE type(r) = 'ACTED_IN')"
            "RETURN p, NODES(p) as ns"
        )
        results, meta = db.cypher_query(shortest_path_text)
        print(shortest_path_text)
        # print(results[0][1])
        # print(meta)
        pp = []
        for x in results[0][1]:
            # print(x)
            tmp = []
            tmp.append(x["name"])
            tmp.append(x["imgLink"])
            pp.append(tmp)
        pp2 = tuple(pp)
        # print(pp2)
        return JsonResponse({"path": pp2})

    else:
        return render(request, "graphapp/index.html")


@csrf_exempt
def collect_from_react(request):
    if request.method == "POST":
        # print("HEllo")
        received_json_data = json.loads(request.body)
        print(received_json_data)
        # return render(request, "graphapp/index.html")
        n1 = received_json_data["name1"]
        n2 = received_json_data["name2"]
        # print(n1, n2)

        config.DATABASE_URL = URL_NEO4J

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
            tmp = []
            tmp.append(x["name"])
            # print(x["imgLink"])
            tmp.append(x["imgLink"])
            pp.append(tmp)
        pp2 = tuple(pp)
        print(pp2)
        return JsonResponse({"shortestpath": pp2})

    else:
        return render(request, "graphapp/index.html")


@csrf_exempt
def collect_node_given_name(request):
    if request.method == "POST":
        # print("HEllo")
        received_json_data = json.loads(request.body)
        print(received_json_data)
        # return render(request, "graphapp/index.html")
        n1 = received_json_data["name1"]
        n2 = received_json_data["name2"]

        config.DATABASE_URL = URL_NEO4J
        pp = []
        name_to_img = "MATCH (b1:Person { name:'" + n1 + "'}) RETURN b1;"
        results, meta = db.cypher_query(name_to_img)
        pp.append(results[0][0]["imgLink"])

        name_to_img = "MATCH (b1:Person { name:'" + n2 + "'}) RETURN b1;"
        results, meta = db.cypher_query(name_to_img)
        pp.append(results[0][0]["imgLink"])

        pp2 = tuple(pp)
        print(pp2)
        return JsonResponse({"nodes": pp2})

    else:
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
            config.DATABASE_URL = URL_NEO4J

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
