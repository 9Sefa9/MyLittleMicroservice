# MyLittleMicroservice
## This Project represents a networked/connected Microservice written in NodeJS and MongoDB by using docker-compose.

The first container (NodeServer) includes the NodeJS Server which calls an single entry from the dockerized MongoDB database called "MongolianData".
Its collection name is "myNewCollection" and includes the single Entry [{_id:2}] which is about a book, as an example.
The aim here is not just to retrieve that single entry. Moreover it was about networking the NodeJS and MongoDB images inside a shared container through using "Docker Networking" and "Docker-compose.yml". 

This combination represent 1 Microservice which can be used to create multiple duplicated containers or adding some great features/images containing LoadBalanicng, CircuitBreakers or even better: Kubernetes, NGINX and so on.

At the end, an alias for the database was used to access the database. That alias("mongoservice") was set inside the "Docker-compose.yml" file. 

```javascript
MongoClient.connect("mongodb://mongoservice:27017/",{useNewUrlParser: true,useUnifiedTopology:true},function(err, client) {
  if (err) throw err;
  var query = {"_id": 2};
  var db = client.db('MongolianData');
  db.collection("myNewCollection").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    client.close();
  });
});
```
# My biggest problem

was that i FORGET to do first:
```javascript
docker-compose build
```
and after that :
```javascript
docker-compose up
```

Code changes on your local PC/IDE will surely applied and saved on your pc. But if you donÄt write "docker-compose build", the changes will NOT be applied inside your shared container!!! Always "build" first and then type "up". That issue has been led me to many bugs. 
