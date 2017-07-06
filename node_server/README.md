# misterBIT-simple-rest-server

## install and use
install : clone/download 
 
````
npm install
````
start:   
````
npm start
````
 
 
## Use

### supported REST verbs - POST,PUT,GET,DELETE

point your app to use localhost:3003/data/<collectionName>

where collectionName is whatever object you want to save for example users

CORS is enabled for all routes so you can come from any domain.

POST localhost:3003/data/user ----> adds a user (from json in body) -->returns the new user ID (in an object)
 
GET localhost:3003/data/user -----> gets the list of users

GET localhost:3003/data/user/<id> -----> returns a single user by its ID from the list of users or undefined

PUT localhost:3003/data/user/<id> -----> replaces a single user by its ID in the list of users with the JSON data in the body

DELETE localhost:3003/data/user/<id> -----> deletes a single user by its ID off the list of users

3 Versions of the server:

1.  in-memory, based on files

2.  MongoDB

3.  Configured with Socket.io



## Use with Anuglar 2 - notice students of angular workshop

make sure your user service issues the POST request with the right content-type header (json), else the user data will not be added to the store
eg: (from my saveUser function)
```
...
return this.http.post(url, JSON.stringify(user), {headers: new Headers({'content-type':'application/json'})});
```

Headers is an exported class in the @angular/http package

## Demos

the server comes with cars,pets and monsters collections

## Reset the data store

just restart the server

## Notes 

For development purposes only!!!
if you need something more advance, with abilities to configure routes, save the in-memory data to disk etc use [json-server](https://www.npmjs.com/package/json-server)