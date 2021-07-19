# GRAPH.GG
### Live Website -> [https://graph-gg.herokuapp.com/](https://graph-gg.herokuapp.com/)
<hr>
A graph network of Indian celebrities built by scraping Wikipedia and other websites. The graph also includes nodes representing States, Movies, Political Parties, etc and uses Neo4j DBMS to view various celebrities' shortest paths, political connections and so on. 

## Members
- [Shashwat Sharma](https://github.com/svanazar) | [Linkedin](https://www.linkedin.com/in/shashwat-sharma09/) 
- [Atharva Varde](https://github.com/varde2407) | [Linkedin](https://www.linkedin.com/in/atharva-varde-643a05197/) 
- [Aditya Trivedi](https://github.com/ad1tyat) | [Linkedin](https://www.linkedin.com/in/trivedi-aditya/) 

## Tech Stack Used
- Neo4j Database Management System
- React Libraries for FrontEnd.
- Django for Backend

# Functionalities

## Scraping and Building the Database:
The database of the project was populated by extensively scraping the respective person's Wikipedia page. Additional information, like the person's political affiliations were scraped from websites like https://www.myneta.info/ .
- The database has been built in a BFS fashion. The program iterates through the Wikipedia page of the starting node (person) and adds other people mentioned there into a priority queue (based on the "importance" of these people). Links are added between these people and the original node. The original node is then popped from the queue, and this same process takes place for the next node in the queue.
- The graph database is in the form of several nodes(vertices) interconnected by edges.
There are three types of nodes in the database:
- Person
- State (eg. Maharashtra, Delhi, etc). Persons are linked to the states they are associated with using edges.
- Movies : Actors are linked to the movies they acted in using edges.

- An example of viewing the relationships of a 'Person' with other Persons.
![image](https://user-images.githubusercontent.com/77501632/126132923-6eacf284-e767-4e53-b3da-e49e0d136ac0.png)

![image](https://user-images.githubusercontent.com/77501632/126132891-8598e091-6b59-43c4-bee6-0ff3ae3e27c1.png)

- An example of viewing the relationships of a 'State' and the people associated with that state.
![image](https://user-images.githubusercontent.com/77501632/126133220-98515878-e07f-4485-bc73-fee00c3442f0.png)

![image](https://user-images.githubusercontent.com/77501632/126133176-06c38ab4-9e73-411a-9fdc-a148d56dc3fc.png)

- An example of viewing the relationships between a Movie and the actors in it.
![image](https://user-images.githubusercontent.com/77501632/126133716-60b0e5a8-44ba-4beb-b157-4e40eb932137.png)

![image](https://user-images.githubusercontent.com/77501632/126133682-d621df88-be1e-477d-b7a0-4a28666de0dc.png)

# Answering Complex Queries
The main objective of the project was to answer complex queries, like 
- What is the "shortest path" between 2 celebrities, eg. Sachin Tendulkar and Sushant Singh Rajput?
- How many "mutual" friends do 2 celebrities have, eg. Narendra Modi and Atal Bihari Vajpayee?
- Can we find "friend recommendations" for a celebrity, i.e. people who do not currently have any relationships with the person, but are most likely to know him/her?

## Shortest Path:
 The Shortest Path algorithm in Neo4j allows us to specify the nodes between which we want the shortest path, as well as the type of edges and nodes that should appear on the shortest path.
 The same has been done in the hosted site using React.
 - An example query: Shortest Path between Sachin Tendulkar and Sushant Singh Rajput.
  ![image](https://user-images.githubusercontent.com/77501632/126135748-2b567008-492f-4f9b-952a-fcaf757cf027.png)
- The same query in the backend:
 ![image](https://user-images.githubusercontent.com/77501632/126136157-f9cc4eb8-9074-4a67-bbda-c7ad9a2b8c4a.png)
- As we can see, the path goes through MS Dhoni, since Sushant Singh Rajput acted in MS Dhoni's biopic.

## Modifications in Shortest Path:
 A modification we have tried to implement in our project is to show the shortest path between actors only considering the movies they have acted in as links.
 - A sample query: The shortest path between Aamir Khan and Shah Rukh Khan using film links (The two have never worked together).
 
 ![image](https://user-images.githubusercontent.com/77501632/126136920-7e79f709-53f1-4e8c-bb63-c4e4e1712fad.png)

## Mutual Friends
We envisioned this query to be useful when the two celebrities have a large number of contacts in common.
- In such cases, we would like to view who these "common friends" are.
- An example query : Atal Bihari Vajpayee and Narendra Modi, both Prime Ministers of India from the Bhartiya Janata Party.
- ![image](https://user-images.githubusercontent.com/77501632/126137954-310cb64d-22f9-4782-a09a-87d41f241d2d.png)

- As we can see, the answer is a wide range of political figures across the spectrum.
  
 ## Friend Recommendations :
 - Here, the friend recommendations of a person are his "2nd degree connections", i.e. the people he does not know directly but knows through his own direct connections.
 
 Various other features have been implemented and they can be tested on [http://graph-gg.herokuapp.com/](http://graph-gg.herokuapp.com/)!
