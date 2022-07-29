const express = require("express");
const fs = require("fs");

const cors = require("cors");
const morgan = require("morgan");

const app = express();
const router = express.Router(); //router mainly a middleware

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());
app.use(morgan("dev"));
app.use(globalMiddleware);
app.use(router);

router.get("/", (req, res) => {
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

/*
  Route Specific middleware
  app.get("/about", cors(), (req, res) => {} // single middleware
    or,
  app.get("/about", [cors(), cors()], (req, res)) => {} // array of middleware
*/

// Global middleware create
function globalMiddleware(req, res, next) {
  console.log(`${req.method} - ${req.url}`);
  console.log("Global Middleware");
  if (req.query.bad) res.status(400).send("Something went wrong");
  next();
}

router.get("/about", localMiddleware, (req, res) => {
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

//Local middleware create for about page

function localMiddleware(req, res, next) {
  console.log("Local Middleware");
  next();
}

router.get("/contact", (req, res) => {
  res.send(`<h1> I am Contact Route</h2>`);
});

router.get("/help", (req, res) => {
  res.send(`<h1> I am Help Route</h2>`);
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
