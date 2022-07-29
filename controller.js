const fs = require("fs");

exports.homeController = (req, res) => {
  fs.readFile("./pages/index.html", (err, data) => {
    if (err) {
      console.log("Error: ", err);
      res.send(`<h1>Something Went wrong</h1>`);
    } else {
      res.write(data);
      res.end();
    }
  });
};

exports.aboutController = (req, res) => {
  fs.readFile("./pages/about.html", (err, data) => {
    if (err) {
      console.log("Error: ", err);
      res.send(`<h1>Something Went wrong</h1>`);
    } else {
      res.write(data);
      res.end();
    }
  });
};

exports.contactController = (req, res) => {
  res.send(`<h1> I am Contact Route</h2>`);
};

exports.helpController = (req, res) => {
  res.send(`<h1> I am Help Route</h2>`);
};
