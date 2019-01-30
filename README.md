# Britecore Demo

To run locally:  
sudo pip3 install -r requirements.txt  
python3 app.py

Deployed on website:  
https://britecoredemo.herokuapp.com/  
Authorized user has username: britecore & password britecore

The folder brightcore_tests contains the python file for the online quizes
to reach the demo. Most of the testing for the project was done through Postman
to test the REST APIs.

My overall approach to this project was to make sure every part of my code was
segregated into separate parts. This would allow me to build each section of code
independently from other sections. Some of the features that I wanted to add to 
the project were not explicitly stated but made sense to add. I wanted to add a 
login page since they are pretty universally needed for applications and I wanted
to add a way to view requests that had already been made. I wanted to strictly 
adhere to REST API standards for endpoints. I also wanted to make a main page
that handled all requests of the user and what information was displayed. I set
the database and it's endpoints up in a very strict manner to ensure that any 
requests that would be added, deleted, taken from the database would not be illegal
arguments. I focused on functionality over looks since I think that is more important.


Heroku Deployment:  

heroku.com -> signup  
New -> Create app  
Deployment method -> Github  
Enter Github username & repository  
Deploy master branch  
Resources -> find more add-ons  
Search for postgres  
Pick Heroku Postgres  
Install Heroku Postgres  
App to provision -> name of app  
Provision add-on


