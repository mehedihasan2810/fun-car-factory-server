const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;

// const corsConfig = {
//   origin: "*",
//   credentials: true,
//   methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS", "PUT"],
// };

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
     client.connect();

    const carToysCollection = client.db("carToys").collection("cars");

    app.get("/all-toys", async (req, res) => {
      const result = await carToysCollection.find().limit(20).toArray();
      res.send(result);
    });

    app.get("/my-toys", async (req, res) => {
      const sortMethod = req.query.sort;
      let query = {};
      if (req.query?.email) {
        query = { email: req.query.email };
      }

      let result;
      if (sortMethod === "default") {
        result = await carToysCollection.find(query).toArray();
      } else {
        const sortNum = sortMethod === "highest" ? -1 : 1;
        result = await carToysCollection
          .find(query)
          .sort({ price: sortNum })
          .toArray();
      }
      res.send(result);
    });

    app.get("/toy-details/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };

      const result = await carToysCollection.findOne(query);
      res.send(result);
    });

    app.get("/search", async (req, res) => {
      const searchTerm = req.query.term;

      const result = await carToysCollection
        .find({ name: { $regex: new RegExp(searchTerm, "i") } })
        .toArray();

      res.send(result);
    });

    app.post("/add-toy", async (req, res) => {
      const toy = req.body;
      const result = await carToysCollection.insertOne(toy);
      res.send(result);
    });

    app.put("/update/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const info = req.body;

      const updateDoc = {
        $set: info,
      };

      const result = await carToysCollection.updateOne(filter, updateDoc);

      res.send(result);
    });

    app.delete("/my-toys/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await carToysCollection.deleteOne(query);
      res.send(result);
    });

    app.get("/check", (req, res) => {
      res.send("funCarFactory is checking!");
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

app.get("/", (req, res) => {
  res.send("funCarFactory is running");
});

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});

module.exports = app;
