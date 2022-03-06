//jshint esversion:6
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine',"ejs");
app.use(express.static("public"));

app.get("/",function(req,res){
  res.render("home");
});

app.get("/login",function(req,res){
  res.render("login");
});

app.get("/register",function(req,res){
  res.render("register");
});

mongoose.connect("mongodb://localhost:27017/userDB");

const userSchema = {
  email: String,
  password: String
}

const User = new mongoose.model("User", userSchema);


app.route("/register")
  .post(function(req,res){
    const user1 = new User({
      email: req.body.username,
      password: req.body.password
    });
    user1.save(function(err){
      if(!err){
        res.render("secrets");
      }else{
        console.log(err);
      }
    });
  });



app.route("/login")
  .post(function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({email:username}, function(err, foundUser){
       if(err){
         console.log(err);
       }else{
         if(foundUser) {
           if(foundUser.password === password) {
             res.render("secrets");
           }
         }
       }
    });
  });

  app.route("/logout")
    .get(function(req,res){
      res.render("home");
    });

app.listen(3000,function(){
  console.log("Server started on port 3000");
});
