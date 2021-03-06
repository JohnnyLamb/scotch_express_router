// server.js

// BASE SETUP
// ==============================================
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
// ROUTES
// ==============================================

// sample route with a route the way we're used to seeing it
app.route('/login')
  // show the form (GET http://localhost:8080/login)
  .get(function(req,res){
    res.send('this is the login form');
  })
  // process the form (POST http://localhost:8080/login)
  .post(function(req,res){
    console.log('processing');
    res.send('processing the login form!');
  });


app.get('/sample', function(req, res) {
  res.send('this is a sample!');
});

// we'll create our routes here

//  get an instance of router
var router = express.Router();

// route middleware that will happen on every request

router.use(function(req, res, next) {
  // log each request to the console
  console.log('coming from middleware--  ' + req.method, req.url);
  // continue doing what we were doing and go to the route
  next();
});
// route middleware to validate :name
router.param('name', function(req, res, next, name) {
  // do validation on name here
  // blah blah validation
  // log something so we know its working
  console.log('doing name validations on ' + name);
  // once validation is done save the new item in the req
  req.name = name;
  // go to the next thing
  next();
});


// home page route (http://localhost:8080)
router.get('/', function(req, res) {
  res.send('Im the home page!');
});
// about page route (http://localhost:8080/about)
router.get('/about', function(req, res) {
  res.send('im the about page!');
});
// route with parameters (http://localhost:8080/hello/:name)
router.get('/hello/:name', function(req, res) {

  res.send('hello ' + req.name + '!');
});

// apply the routes to our application
app.use('/', router);

// START THE SERVER
// ==============================================

app.listen(port);
console.log('Magic happens on port ' + port);
