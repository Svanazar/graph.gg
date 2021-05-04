from queue import PriorityQueue
import asyncio

import aiohttp

# Initializing a queue
q = PriorityQueue(maxsize=500)

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
    Relationship,
    config,
)

config.DATABASE_URL = "bolt://neo4j:password@localhost:7687"


class Person(StructuredNode):
    name = StringProperty(unique_index=True)
    friend = Relationship("Person", "KNOWS")
    politician = BooleanProperty()
    cricketer = BooleanProperty()
    actor = BooleanProperty()
    entertainment = BooleanProperty()
    team = BooleanProperty()


class Team(StructuredNode):
    name = StringProperty(unique_index=True)
    players = Relationship("Person", "RELATED TO")


class Party(StructuredNode):
    name = StringProperty(unique_index=True)
    friend = Relationship("Person", "KNOWS")


# stores occupation and corresponding keywords
occupation_filters = {
    "politician": ["politician", "statesman"],
    "cricketer": ["cricket"],
    "actor": ["actor", "actress"],
    "singer": ["singer"],
    "entertainment": ["actor", "actress", "singer", "director", "producer"],
}

ipl_team_dict = {
    "Mumbai Indians",
    "Delhi Daredevils",
    "Chennai Super Kings",
    "Royal Challengers Bangalore",
    "Rajasthan Royals",
    "Sunrisers Hyderabad",
    "Deccan Chargers",
    "Kings XI Punjab",
    "Kolkata Knight Riders",
    "Kochi Tuskers Kerala",
    "Pune Warriors India",
    "Rising Pune Supergiants",
    "Delhi Capitals",
}

organisation_dict = {"Padma", "Bharat Ratna", "Rashtriya Swayamsevak Sangh"}

# indirectly
party_dict = {
    "Bhartiya Janata Party",
    "Indian National Congress",
    "Prime Ministers",
    "Union Ministers",
    "Chief Ministers",
}


async def main():

    bjp = Party(name="Bhartiya Janata Party")
    bjp.save()

    cong = Party(name="Indian National Congress")
    cong.save()

    curr = Person.nodes.get(name="Atal Bihari Vajpayee")
    bjp.friend.connect(curr)

    curr = Person.nodes.get(name="Syama Prasad Mookerjee")
    bjp.friend.connect(curr)

    curr = Person.nodes.get(name="Indira Gandhi")
    cong.friend.connect(curr)

    curr = Person.nodes.get(name="Jagjivan Ram")
    cong.friend.connect(curr)

    curr = Person.nodes.get(name="VP Singh")
    bjp.friend.connect(curr)

    curr = Person.nodes.get(name="I. K. Gujral")
    cong.friend.connect(curr)

    curr = Person.nodes.get(name="J. Jayalalitha")
    bjp.friend.connect(curr)

    curr = Person.nodes.get(name="Manmohan Singh")
    cong.friend.connect(curr)

    curr = Person.nodes.get(name="Rajnath Singh")
    bjp.friend.connect(curr)

    curr = Person.nodes.get(name="Narendra Modi")
    bjp.friend.connect(curr)

    curr = Person.nodes.get(name="Pranab Mukherjee")
    cong.friend.connect(curr)

    curr = Person.nodes.get(name="George Fernandes")
    bjp.friend.connect(curr)

    curr = Person.nodes.get(name="K. R. Narayanan")
    cong.friend.connect(curr)

    curr = Person.nodes.get(name="Sonia Gandhi")
    cong.friend.connect(curr)

    curr = Person.nodes.get(name="Lal Krishna Advani")
    bjp.friend.connect(curr)

    curr = Person.nodes.get(name="Pramod Mahajan")
    bjp.friend.connect(curr)

    curr = Person.nodes.get(name="Navjot Sidhu")
    bjp.friend.connect(curr)
    cong.friend.connect(curr)

    curr = Person.nodes.get(name="Sardar Patel")
    cong.friend.connect(curr)

    curr = Person.nodes.get(name="Sharad Pawar")
    cong.friend.connect(curr)

    curr = Person.nodes.get(name="Sharad Pawar")
    cong.friend.connect(curr)

    curr = Person.nodes.get(name="P. Chidambaram")
    cong.friend.connect(curr)

    curr = Person.nodes.get(name="Lal Bahadur Shastri")
    cong.friend.connect(curr)

    curr = Person.nodes.get(name="Rajiv Gandhi")
    cong.friend.connect(curr)

    curr = Person.nodes.get(name="Sanjay Gandhi")
    cong.friend.connect(curr)

    curr = Person.nodes.get(name="Madan Mohan Malviya")
    cong.friend.connect(curr)

    curr = Person.nodes.get(name="Rahul Gandhi")
    cong.friend.connect(curr)

    curr = Person.nodes.get(name="Arun Jaitley")
    bjp.friend.connect(curr)

    curr = Person.nodes.get(name="Gautam Gambhir")
    bjp.friend.connect(curr)

    curr = Person.nodes.get(name="Ravi Shankar Prasad")
    bjp.friend.connect(curr)

    curr = Person.nodes.get(name="Bal Thackeray")
    bjp.friend.connect(curr)

    curr = Person.nodes.get(name="Ram Jethmalani")
    bjp.friend.connect(curr)

    curr = Person.nodes.get(name="Amitabh Bachchan")
    cong.friend.connect(curr)

    curr = Person.nodes.get(name="Vijayakanth")
    bjp.friend.connect(curr)

    curr = Person.nodes.get(name="Jaya Prada")
    bjp.friend.connect(curr)

    curr = Person.nodes.get(name="Govinda (actor)")
    cong.friend.connect(curr)

    curr = Person.nodes.get(name="Rajesh Khanna")
    cong.friend.connect(curr)

    curr = Person.nodes.get(name="Urmila Matondkar")
    cong.friend.connect(curr)

    curr = Person.nodes.get(name="Sushma Swaraj")
    bjp.friend.connect(curr)

    curr = Person.nodes.get(name="Arun Jaitley")
    bjp.friend.connect(curr)

    curr = Person.nodes.get(name="Digvijaya Singh")
    cong.friend.connect(curr)

    curr = Person.nodes.get(name="Vilasrao Deshmukh")
    cong.friend.connect(curr)

    curr = Person.nodes.get(name="Smriti Irani")
    bjp.friend.connect(curr)

    curr = Person.nodes.get(name="Pranab Mukherjee")
    cong.friend.connect(curr)

    curr = Person.nodes.get(name="Mamata Bannerjee")
    cong.friend.connect(curr)

    curr = Person.nodes.get(name="Laloo Prasad Yadav")
    cong.friend.connect(curr)

    curr = Person.nodes.get(name="Ravi Shankar Prasad")
    bjp.friend.connect(curr)


"""
    # Initialising progressbar
    pbar = tqdm(total=1)

    while not q.empty():
        source = q.get()[1]
        tqdm.write(f'\nSOURCE: {source}')
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
"""
