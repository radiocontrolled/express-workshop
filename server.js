
/* 
  The Server.js file
   is where all our server code 
   is going to live 
*/

// In Node.js, when you want to access the functionality of a library or module in another file, you require it.
var express = require('express');

// Body Parser is needed to parse the data in the request
var bodyParser = require('body-parser');

// To initialise our server, we just need to call the express() function. 
// This will create an Express application for us to work with.
var app = express();

// node's file system module to write to the hard drive (so blog posts can be saved)
var fs = require('fs');


// serve assets from the public/ folder
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));



/* 
  When a request reaches the server, 
  we need a way of responding to it. In comes the handler function. 
  The handler function is just a function which receives requests 
  and handles them, hence the name.

  The handler function always takes a request and response object, 
and sends the response back to the client along with some information.
*/

// app.get("/", function(request, response){

//   // telling our server to respond with "Hello World!" when someone tries to access the webpage.
//   response.send("Hello world");
// });


// app.get("/cat", function(request, response){
//   response.send("I love cats");
// });


app.post("/create-post", function(request, response){
  // the request he req object represents the HTTP request and has 
  // properties for the request query string, parameters, body, HTTP headers, and so on.

  // read the existing json 
  fs.readFile(__dirname + '/data/posts.json', function(error, file){

  
    // take the existing posts.json file (which is a buffer) and parse this as a JSON, and save it to parsed file
    var parsedFile = JSON.parse(file);
    


    // get the current time    
    var time = Date.now();
 
    // save the user submitted data (request.body) in the newPost variable
    var newPost = request.body; 


    // key is time, value is blogpost. we're adding this key/value pair to the original file
   // parsedFile[time] = newPost.blogpost;

    parsedFile[time] = {
      "blogtitle" : newPost.blogtitle,
      "blogpost": newPost.blogpost
    };

    // console.log("title", newPost.blogtitle);
    // console.log("blogpost", newPost.blogpost);




    // parsedFile is an JS object that needs to be changed into a JSON strings
    updatedBlog = JSON.stringify(parsedFile);

    fs.writeFile(__dirname + '/data/posts.json', updatedBlog, function (error) {

    
    });

  });

  response.redirect('/'); // this will redirect the end user to the root of the application once the form is submitted
});

// when there is a get request for the /get-posts endpoint
// send posts.json to the client so it can be rendered using script.js

app.get("/get-posts", function(request, response){

  var options = {
    root: __dirname,
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  };

  response.sendFile('/data/posts.json', options, function (error) {
    if(error) {
      console.log(error);  
    }

  });
});



// we need to set a port for our server to listen to. Think of a port as a door number; 
// any requests that come to the server will come via that door. 
// Setting a port will allow us to find where our server is running.
// We're going to run our server on port 3000, and run a simple console.log as our callback function.

app.listen(3000, function () {

  // when you run `node server.js` in the terminal this statement should be printed to the console:
  console.log('Server is listening on port 3000. Ready to accept requests!');
});
