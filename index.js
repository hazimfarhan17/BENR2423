const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

/*
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Hazim:987654321@cluster0.hbjf00x.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
/*
    const database = client.db("BENR2423");
    const collection = database.collection("users");

    const res = await collection.find({
       "username":{ $eq: "Apip"},
       "password":{ $eq: "Apip123"}
      }).toArray();

      console.log(res);
      console.log("Found the following records");

  }
  finally {
    // Ensures that the client will close when you finish/error
    ///   await client.close();
  }
}
run().catch(console.dir);
*/

/// confirmation for pass and username
app.post('/login', (req, res) => {

  if (req.body.username !== 'Apip') {
    res.status(400).send('Invalid username')
    return
  }
  if (req.body.password !== 'Apip123') {
    res.status(401).send('Invalid password')
    return
  }
  res.send('login seccessfully')
})

// ADD USER TO DATABASE
app.post('/register', (req, res) => {
  client.db("BENR2423").collection("users").find({
    "username":{$eq:req.body.username}}).toArray().then((result) =>{
      console.log(result)
    if (result.length > 0){
      res.status(400).send('username already exist')
    }
    else{
      client.db("BENR2423").collection("users").insertOne({
          "username": req.body.username,
          "password": req.body.password
        })
      res.send('register seccessfully')
    }
  })
});

// FIND USER IN DATABASE BY REQUESTING FROM POSTMAN THEN DATABASE WILL SEND RESPONSE
app.get('/list', (req, res) => {

  client.db("BENR2423").collection("users").findOne(
    {
      username: "username",
      password: "password"
    }
  );
  res.send('login seccessfully');
});

//UPDATE USER IN DATABASE
app.patch('/update', (req, res) => {
  client.db("BENR2423").collection("users").updateOne({
      "username": {$eq:req.body.username}
    },{
      $set: {"email": req.body.email},
    }).then((result) =>{
        console.log(result)
        res.send('update seccessfully')
    }
  );
});

app.get('/hello', (req, res) => {
  res.send('Hello World!');
})

/// 404 Not Found
app.use((req, res) => {
  res.status(404);
  res.send('<h1>404 Not Found<h1>')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})