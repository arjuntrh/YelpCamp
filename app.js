// =================Package setups===============================
var express               = require("express"),
    bodyParser            = require("body-parser"),
    mongoose              = require("mongoose"),
    methodOverride        = require("method-override"),
    passport              = require("passport"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    userSession           = require("express-session"),
    flash                 = require("connect-flash"),
    seedDB                = require("./seeds");
    
// requiring models
var Campground            = require("./models/campground"),
    Comment               = require("./models/comment"),
    User                  = require("./models/user");
    
// requiring routes
var indexRoutes       = require("./routes/index"),
    campgroundRoutes  = require("./routes/campgrounds"),
    commentRoutes     = require("./routes/comments");
    
//====================Application Config==========================
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// create/connect to YelpCamp Database
mongoose.connect(process.env.DATABASEURL, {useNewUrlParser: true});

// seed the database
//seedDB();

// Passport configuration
app.use(userSession({
    secret: "Hans Zimmer",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// the below code ensures that the properties defined on res.local are available in every single template in the project
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes); // the first param appends is appended in all the respective routes
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

//==============================================================

// add listner
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("YelpCamp Server started!"); 
});