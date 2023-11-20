const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

app.use(express.json())



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
        client.db("BENR2423").collection("users").then(result => {
          console.log(result);
        });
    */
  }
  finally {
    // Ensures that the client will close when you finish/error
    ///   await client.close();
  }
}
run().catch(console.dir);

app.get('/hello', (req, res) => {
  res.send('Hello World!');
})

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

app.post('/register', (req, res) => {

  client.db("BENR2423").collection("users").insertOne(
    {
      "username": req.body.username,
      "password": req.body.password
    }
  );
});

app.get('/list', (req, res) => {

  client.db("BENR2423").collection("users").findOne(
    {
      username: "username",
      password: "password"
    }
  );
  res.send('login seccessfully');
});


/// 404 Not Found
app.use((req, res) => {
  res.status(404);
  res.send('<h1>404 Not Found<h1>')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})