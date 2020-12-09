const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = 8000;
const app = express();
const User = require('./models/User');
mongoose.connect('mongodb://localhost/userData') // Connect to local Mongoose DB called userData

app.use(bodyParser.json());

app.listen(port, () => {
	console.log(`server is listening on port:${port}`)
})


/**
  {
    name: req.body.newData.name,
    email: req.body.newData.email,                                    is equal to {...req.body.newData} using JS spread syntax
    password: req.body.newData.password
  }
*/

function sendResponse(res, err, data){
  if (err){
    res.json({
      success: false,
      message: err
    })
  } else if (!data){
    res.json({
      success: false,
      message: "Not Found!"
    })
  } else{
    res.json({
      success: true,
      data: data
    })
  }
}


/** 
 * CREATE;
 * Create a new document in MongoDB;
 * First parameter is the object containing the values for the new document (stored in req.body);
 * Second Parameter is the db response handler. 
*/
app.post('/users',(req,res)=>{
  User.create(// Takes a newData and a callback
  {...req.body.newData},
  (err, data) => sendResponse(res, err, data))
})

app.route('/users/:id')
// READ
.get((req,res) => { // Takes an ID and callback
  User.findById(
    req.params.id,
    (err,data) => sendResponse(res, err, data))
})

// UPDATE
.put((req,res) => {
  User.findByIdAndUpdate( // Takes an ID, newData, options (optional), callback
    req.params.id,
    {...req.body.newData},
    
    {
      new: true // Make sure the update method will return the modified document
    },
    
    (err, data) => sendResponse(res, err, data))
})

// DELETE
.delete((req,res) => {
  User.findByIdAndDelete( // Takes an ID and a callback
    req.params.id,
    (err, data) => sendResponse(res, err, data))
})
