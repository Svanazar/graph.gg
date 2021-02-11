from queue import Queue
import asyncio
import aiohttp

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

config.DATABASE_URL = "bolt://neo4j:atharva@localhost:7687"

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

MAX_ADDITION_SOURCES = 10
additionSourceCount = 0

async def scrape(link, curr, iterred):
    '''
    Scrapes link and creates Node appropriately
        Parameters:
            link: Wikipedia URL
            curr: Node of the source person
            iterred: set of names already iterated (usually empty)

        Returns:
            Name of the person if their Node is created (str)
            else None
    '''

    url2 = "https://en.wikipedia.org/" + str(link.get("href"))
    person_name = str(link.get("title"))
    x = person_name.split(" ")
    if len(x) > 3:
        return None

    # If link points to the person themselves
    if person_name == curr.name:
        return None

    # Check if already iterated over
    if person_name in iterred:
        return None
    else:
        iterred.add(person_name)

    # Check if node already exists        
    person_node = Person.nodes.get_or_none(name=person_name)
    if person_node is not None:
        tqdm.write(f'{person_name} EXISTS')
        curr.friends.connect(person_node)
        return None

    # Check if maximum limit on addition sources is crossed
    if additionSourceCount > MAX_ADDITION_SOURCES:
        return None

    cont = ""
    async with session.get(url2) as resp:
        cont = await resp.text()
    soup2 = BeautifulSoup(cont, "html.parser")

    #Born check
    dict2 = soup2.find_all("table", class_="infobox")
    if len(dict2) == 0:
        return None
    s = dict2[0].get_text()
    index = s.find("Born")
    if index < 0:
        return None
    tqdm.write(f'\n{person_name}')

    #Text length check
    text_dict = soup2.select(".mw-parser-output > p")
    c = 0
    for para in text_dict:
        ss = para.get_text()
        sss = ss.split(" ")
        c += len(sss)
    if c < 1700:
        return None
    tqdm.write(f'Text length is {c}')

    first_para = ''
    for el in text_dict:
        first_para = el.getText(strip=True)
        if len(first_para) > 0:
            break

    line = first_para.split('\n')[0]

    #Indian check
    index1=line.find("Indian")
    if index1 < 0 :
        tqdm.write("NOT INDIAN")
        return None

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

    return person_name

async def main():
    global session, additionSourceCount
    session = aiohttp.ClientSession()
    source = "Sachin Tendulkar"
    q.put(source)
    
    # Initialising progressbar
    pbar = tqdm(total=1)

    while not q.empty():
        source = q.get()
        tqdm.write(f'\nSOURCE: {source}')
        curr = None
        additionSourceCount += 1
        try:
            curr = Person(name=source).save()
        except:
            curr = Person.nodes.get(name=source)
        URL = "https://en.wikipedia.org/wiki/" + source.replace(" ", "_")
        content = ""
        async with session.get(URL) as resp:
            content = await resp.text()
        soup = BeautifulSoup(content, "html.parser")
        url_dict = soup.select("p a[href]")

        # set for tracking names already iterated over
        iterred = set()
        names = await asyncio.gather(*[scrape(link, curr, iterred) for link in url_dict])

        # Adds newly created names into queue
        if not additionSourceCount > MAX_ADDITION_SOURCES:
            for name in names:
                if name is not None:
                    q.put(name)
                    pbar.total += 1
        pbar.update(1)
    pbar.close()
    await session.close()

asyncio.run(main())