from queue import Queue

# Initializing a queue
q = Queue(maxsize=500)

import requests
import sys
from tqdm import tqdm
from urllib.request import urlopen
from bs4 import BeautifulSoup
from neomodel import (
    StructuredNode,
    StringProperty,
    BooleanProperty,
    RelationshipTo,
    RelationshipFrom,
    config,
)


config.DATABASE_URL = "bolt://neo4j:lekhchitra@localhost:7687"


class Person(StructuredNode):
    name = StringProperty(unique_index=True)
    friends = RelationshipTo("Person", "KNOWS")
    politician = BooleanProperty()

NAME = "L. K. Advani"
q.put(NAME)
cnt = 0
while cnt < 50:
    NAME = q.get()
    URL = "https://en.wikipedia.org/wiki/" + NAME.replace(" ", "_")
    page = requests.get(URL)

    soup = BeautifulSoup(page.content, "html.parser")
    # print(soup.get_text())
    dict1 = soup.find_all("table", class_="infobox")
    s = dict1[0].get_text()
    # print(s)
    index = s.find("Born")
    curr = ""
    if index > 0:
        print("PERSON")
        try:
            curr = Person(name=NAME).save()
            cnt = cnt + 1
        except:
            curr = Person.nodes.get(name=NAME)
        # curr = Person.get_or_create(name='Saurav Ganguly').save()
    else:
        print("NOT PERSON")

    url_dict = soup.select("p a[href]")

    ct = 0
    final_dict = {}

    for link in tqdm(url_dict):
        url2 = "https://en.wikipedia.org/" + str(link.get("href"))

        ss = str(link.get("title"))
        x = ss.split(" ")
        if len(x) > 3:
            continue

        page2 = requests.get(url2)
        soup2 = BeautifulSoup(page2.content, "html.parser")

        dict2 = soup2.find_all("table", class_="infobox")

        if len(dict2) == 0:
            continue

        s = dict2[0].get_text()
        # print(s)
        index = s.find("Born")
        if index > 0:
            print(link.get("title"))
            print("PERSON")
            text_dict = soup2.findAll("p")
            c = 0
            for para in text_dict:
                ss = para.get_text()
                sss = ss.split(" ")
                c += len(sss)
            print(c)
            if c < 2500:
                continue
            first_para=text_dict[1].get_text()
            first_para_dict=first_para.split(".")
            line=first_para_dict[0]
            line = soup2.select("table~p")[0].getText()
            line = line.split(".")[0]
            print(f'line is {line}')
            index1=line.find("Indian")
            if index1<0 :
                print("NOT INDIAN")
                continue

            now = Person(name=link.get("title"))

            index2=line.find("cricket")
            if index2>0:
                print("Cricketer")
            index3=line.find("politician")
            if index3>0:
                print("Politician")
                now.politician = True
            else:
                now.politician = False
            try:
                now.save()
                print(f'Saved {link.get("title")}')
                q.put(link.get("title"))
            except:
                now = Person.nodes.get(name=link.get("title"))
                print(f'Not saved {link.get("title")}', sys.exc_info()[0])
            finally:
                curr.friends.connect(now)

    print("Done")
    # final_dict[curr_person]=str(link.get('title'))

