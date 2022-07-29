const express = require("express");
const fs = require("fs");

const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());
app.use(morgan("dev"));


app.get("/", (req, res) => {
  fs.readFile("./pages/index.html", (err, data) => {
    if (err) {
      console.log("Error: ", err);
      res.send(`<h1>Something Went wrong</h1>`);
    } else {
      res.write(data);
      res.end();
    }
  });
});

app.get("/about", (req, res) => {
  fs.readFile("./pages/about.html", (err, data) => {
    if (err) {
      console.log("Error: ", err);
      res.send(`<h1>Something Went wrong</h1>`);
    } else {
      res.write(data);
      res.end();
    }
  });
});

app.get("/contact", (req, res) => {
  res.send(`<h1> I am Contact Route</h2>`);
});

app.get("/help", (req, res) => {
  res.send(`<h1> I am Help Route</h2>`);
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
