const express = require("express");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const session = require("express-session");
const routes = require('./routes.js');

require("./config/passport.js");

const app = express();

// here be middlewares
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

app.listen(3000, () => console.log('Auth Service listening on port 3000!'));
