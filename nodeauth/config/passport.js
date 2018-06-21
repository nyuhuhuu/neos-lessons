const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;

const user = {
    username: 'gabor',
    password: '123456',
    id: 1
};

passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log("Checking credentials...");
        if (username != "gabor") {
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (password != "123456") {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    done(null, user);
});
