from bs4 import BeautifulSoup
import requests

url = "https://en.wikipedia.org/wiki/Narendra_Modi"

page = requests.get(url).content
soup  = BeautifulSoup(page, 'html.parser')

imagebox = soup.select_one(".infobox-image")
src = imagebox.find("img")['src']

print(src[2:])