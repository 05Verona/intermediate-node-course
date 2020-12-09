const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = 8000;
const app = express();
const User = require('./models/User');
mongoose.connect('mongodb://localhost/userData') // Connect to local Mongoose DB called userData

app.use(bodyParser.json());

app.listen(port, ()=>{
	console.log(`server is listening on port:${port}`)
})

/** 
 * CREATE;
 * Create a new document in MongoDB;
 * First parameter is the object containing the values for the new document (stored in req.body);
 * Second Parameter is the db response handler. 
*/
app.post('/users',(req,res)=>{
  User.create({
    name: req.body.newData.name,
    email: req.body.newData.email,
    password: req.body.newData.password
  },

  (err, data) => {
    if (err){
      res.json({success:false, message: err})
    } else if (!data){
      res.json({success: false, message: 'Not Found!'})
    } else {
      res.json({success: true, message: data})
    }
  })
})

app.route('/users/:id')
// READ
.get((req,res)=>{
  User.findById(
    req.params.id,
    
    (err,data) => {
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
          message: data
        })
      }
  })
})

// UPDATE
.put((req,res)=>{
  User.findByIdAndUpdate(
    req.params.id,
    
    {
      name: req.body.newData.name,
      email: req.body.newData.email,
      password: req.body.newData.password
    },

    {
      new: true // Make sure the update method will return the modified document
    },

    (err, data) => {
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
  )
})

// DELETE
.delete((req,res)=>{
  // User.findByIdAndDelete()
})