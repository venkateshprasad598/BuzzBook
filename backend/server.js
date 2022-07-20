const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const { readdirSync } = require("fs");
const app = express();

//MiddleWare
app.use(express.json());
app.use(cors());
readdirSync("./routes").map((route) =>
  app.use("/app/v1/buzzbook", require(`./routes/${route}`))
);

//DATABASE
mongoose
  .connect(process.env.DATABASE, { useNewUrlParser: true })
  .then(() => console.log("Database connected succesfully"))
  .catch((err) => console.log("Error connecting mongoDB", { err }));

//SERVER
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is listening to port ${port}...`));

console.log();
