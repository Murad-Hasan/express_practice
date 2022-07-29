# function handler (req, res, next){

    -read request object
    -process request
    -response back to result

}

## Type of request we mainly used: GET, POST, PUT, DELETE, PATCH , HEAD, OPTIONS (we can use more) -----> HTTP method



**Request object:**
  - request
  - response
  - middleware
  - router

**Middleware Can Do Something Before Request:**
  --->> middleware one kind of handler <<---
  - modify request object (add new property, change property, delete property)
  - response back to client from any where in the middleware
  - data filtering, data validation, data sanitization, authentication etc.


**Middleware Responsibility**
  - handle common tasks
  - request logs
  - filter request
  - modify or reshape request
  - validate request body
  - authenticate or authorize request
  - add additional details to request body
  - response bad request
  - pass request to next middleware or response handler

**Morgan** --> logger middleware

**cors** --> cross origin resource sharing middleware

**Route Specific middleware**
 {
 app.get("/about", cors(), (req, res) => {} // single middleware
    or,
  app.get("/about", [cors(), cors()], (req, res)) => {} // array of middleware
}