const express = require("express");
const fs = require("fs");
const app = express();

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
