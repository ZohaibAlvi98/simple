var express = require("express")

var passport = require("passport"),
user = require("../models/user")
var router = express.Router()

router.get("/register",function(req,res){
    res.render("register")
})

router.post("/register",function(req,res){
    var User = req.body.username,
    password = req.body.password
    user.register(new user({username: User}),password,function(err,user){
        if(err){
            res.redirect("back")
        }
        else
        {
            passport.authenticate("local")(req,res,function(){
                res.redirect("/secret")
            })
        }
    })
})

//login 

router.get("/login",function(req,res){
    res.render("login")
})

router.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function(req,res){
   
})

router.get("/logout",function(req,res){
    req.logout()
    res.redirect("/")
})

module.exports = router;