const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("helloooooo");
});

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
