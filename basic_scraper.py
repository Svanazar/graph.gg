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
    RelationshipTo,
    RelationshipFrom,
    config,
)


config.DATABASE_URL = "bolt://neo4j:pass@localhost:7687"


class Person(StructuredNode):
    name = StringProperty(unique_index=True)
    friends = RelationshipTo("Person", "KNOWS")


NAME = "Virender Sehwag"
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
            now = Person(name=link.get("title"))
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

