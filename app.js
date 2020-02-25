var express = require("express");
var app = express();
var mongoose = require("mongoose")
var body_parser = require("body-parser")
var passport = require("passport")
var localStrategy = require("passport-local")
var passportLocalMongoose = require("passport-local-mongoose")
var user = require("./models/user")
var authRoutes = require("./routes/auth")

mongoose.connect("mongodb://localhost:27017/simple", { useNewUrlParser: true , useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);

app.use(body_parser.urlencoded({extended: true}))
app.use(express.static("public"))

app.set("view engine","ejs");
passport.use(new localStrategy(user.authenticate()))
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(require("express-session")({
    secret: "zohaib",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(authRoutes)

app.get("/",function(req,res){
    res.render("index")
})

app.get("/secret",isLoggedIn,function(req,res){
    res.render("secret")
})


function isLoggedIn(req,res,next){
     if(req.isAuthenticated()){
         return next();
     }
     else
     {
         res.redirect("/login")
     }
}
    

app.listen(3000,function(){
    console.log("server started")
})