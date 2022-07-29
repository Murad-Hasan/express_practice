const express = require("express");


const cors = require("cors");
const morgan = require("morgan");

const app = express();//router mainly a middleware

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());
app.use(morgan("dev"));
app.use(globalMiddleware);
app.use(require("./routes"));

// Global middleware create
function globalMiddleware(req, res, next) {
  console.log(`${req.method} - ${req.url}`);
  console.log("Global Middleware");
  if (req.query.bad) res.status(400).send("Something went wrong");
  next();
}

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
