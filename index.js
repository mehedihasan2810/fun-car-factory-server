const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASS}@project1.lispgny.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const carToysCollection = client.db("carToys").collection("cars");

    app.get("/allToys", async (req, res) => {
      const result = await carToysCollection.find().toArray();
      res.send(result);
    });

    app.get("/myToys", async (req, res) => {
      console.log(req.query.email);
      let query = {};
      if (req.query?.email) {
        query = { email: req.query.email };
      }
      const result = await carToysCollection.find(query).toArray();
      res.send(result);
    });

    app.get("/toy-details/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      // const options = {
      //   projection: { title: 1, price: 1, service_id: 1, img: 1 },
      // };

      const result = await carToysCollection.findOne(query);
      res.send(result);
    });

    app.post("/addToy", async (req, res) => {
      const toy = req.body;
      console.log(toy);
      const result = await carToysCollection.insertOne(toy);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
