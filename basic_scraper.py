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
    cricketer = BooleanProperty()

# stores occupation and corresponding keywords
occupation_filters = {
    "politician": ['politician', 'statesman'],
    "cricketer": ['cricket'],
}

MAX_ADDITION_SOURCES = 1
additionSourceCount = 0
source = "L. K. Advani"
q.put(source)

while not q.empty():
    source = q.get()
    tqdm.write(f'SOURCE: {source}')
    curr = None
    additionSourceCount += 1
    try:
        curr = Person(name=source).save()
    except:
        curr = Person.nodes.get(name=source)

    URL = "https://en.wikipedia.org/wiki/" + source.replace(" ", "_")
    page = requests.get(URL)
    soup = BeautifulSoup(page.content, "html.parser")
    url_dict = soup.select("p a[href]")

    for link in tqdm(url_dict):
        url2 = "https://en.wikipedia.org/" + str(link.get("href"))
        ss = str(link.get("title"))
        x = ss.split(" ")
        if len(x) > 3:
            continue
        person_name = link.get("title")
        
        if person_name == source:
            continue

        # Check if node already exists        
        person_node = Person.nodes.get_or_none(name=person_name)
        if person_node is not None:
            tqdm.write(f'{person_name} EXISTS')
            curr.friends.connect(person_node)
            continue

        # Check if maximum limit on addition sources is crossed
        if additionSourceCount > MAX_ADDITION_SOURCES:
            continue

        page2 = requests.get(url2)
        soup2 = BeautifulSoup(page2.content, "html.parser")

        #Born check
        dict2 = soup2.find_all("table", class_="infobox")
        if len(dict2) == 0:
            continue
        s = dict2[0].get_text()
        index = s.find("Born")
        if index < 0:
            continue
        tqdm.write(f'\n{person_name}')
        tqdm.write("FOUND Born")

        #Text length check
        text_dict = soup2.select(".mw-parser-output > p")
        c = 0
        for para in text_dict:
            ss = para.get_text()
            sss = ss.split(" ")
            c += len(sss)
        if c < 1700:
            continue
        tqdm.write(f'Text length is {c}')

        first_para = ''
        for el in text_dict:
            first_para = el.getText(strip=True)
            if len(first_para) > 0:
                break

        line = first_para.split('\n')[0]
        tqdm.write(f'Line is : {line}')

        #Indian check
        index1=line.find("Indian")
        if index1 < 0 :
            tqdm.write("NOT INDIAN")
            continue

        now = Person(name=link.get("title"))
        
        # Adding occupation information
        for occupation, keywords in occupation_filters.items():
            setattr(now, occupation, False)
            for keyword in keywords:
                if(line.find(keyword) > 0):
                    tqdm.write(f'OCCUPATION: {occupation}')
                    setattr(now, occupation, True)
                    break

        #Saving into database
        now.save()
        tqdm.write(f'SAVED {person_name}')
        curr.friends.connect(now)

        q.put(person_name)

print("Done")

