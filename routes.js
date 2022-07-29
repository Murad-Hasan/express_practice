const {
  homeController,
  aboutController,
  contactController,
  helpController,
} = require("./controller");

const router = require("express").Router();

router.get("/", homeController);

/*
  Route Specific middleware
  app.get("/about", cors(), (req, res) => {} // single middleware
    or,
  app.get("/about", [cors(), cors()], (req, res)) => {} // array of middleware
*/

router.get("/about", localMiddleware, aboutController);

//Local middleware create for about page

function localMiddleware(req, res, next) {
  console.log("Local Middleware for about page");
  next();
}

router.get("/contact", contactController);

router.get("/help", helpController);

module.exports = router;
