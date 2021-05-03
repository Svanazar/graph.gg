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
from neomodel import config

from graph_models import Person, Movie

config.DATABASE_URL = "bolt://neo4j:lekhchitra@localhost:7687"

# stores occupation and corresponding keywords
occupation_filters = {
    "politician": ['politician', 'statesman', 'Minister'],
    "cricketer": ['cricket']
}


MAX_ADDITION_SOURCES = 100
additionSourceCount = 0



async def scrape(link, source, iterred):
   
    url2 = "https://en.wikipedia.org/" + str(link.get("href"))
    person_name = str(link.get("title"))
    #print(person_name)

    cont = ""
    async with session.get(url2) as resp:
        cont = await resp.text()
    soup2 = BeautifulSoup(cont, "html.parser")

   #Text length check
    text_dict = soup2.select(".mw-parser-output > p")
    c = 0
    for para in text_dict:
        ss = para.get_text()
        sss = ss.split(" ")
        c += len(sss)

    first_para = ''
    for el in text_dict:
        first_para = el.getText(strip=True)
        if len(first_para) > 0:
            break

    line = first_para
    print(person_name)
    print(line)

    #film check
    index1=line.find("film")
    if index1 < 0 :
        tqdm.write("not film")
        return None
    index2=line.find("directed")
    if index2 < 0 :
        tqdm.write("not film")
        return None
    
    print(int(source))
    film = Movie(name=link.get("title"), year=int(source))
    
    # Adding occupation information

    #Saving into database
    film.save()
    tqdm.write(f'SAVED {person_name}')

    #Get cast
    castList = soup2.select_one('#Cast').find_next('ul')
    names = []
    for el in castList.select('li > a:nth-of-type(1)'):
        actorName = el['title']
        if actorName is not None:
            actorNode = Person.nodes.get_or_none(name=actorName)
            if actorNode is not None:
                film.actors.connect(actorNode)
                actorName += ' CON'
        names.append(actorName)
    
    print(len(names))
    print('\n'.join(names))
    print('--')

    return person_name

async def main():
    global session, additionSourceCount
    session = aiohttp.ClientSession()
    
    dic={"2000", "2001", "2004", "2005", "2008","2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2019", "2020" }

    #dic = {"2002", "2003", "2007", "2018", "2006"}

    
    for num in dic:
        q.put(num)
    

    # Initialising progressbar
    pbar = tqdm(total=1)

    while not q.empty():
        source = q.get()
        tqdm.write(f'\nSOURCE: {source}')
        additionSourceCount += 1
        
        
        URL = "https://en.wikipedia.org/wiki/List_of_Bollywood_films_of_" + source
        content = ""
        async with session.get(URL) as resp:
            content = await resp.text()
        soup = BeautifulSoup(content, "html.parser")
        soup_inter=soup.find("table", class_="wikitable")
        url_dict = soup_inter.select("a[href]")

        #print (url_dict)
        # set for tracking names already iterated over
        iterred = set()
        names = await asyncio.gather(*[scrape(link, source, iterred) for link in url_dict])

    pbar.close()
    await session.close()

asyncio.run(main())