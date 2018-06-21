const express = require("express");
const passport = require('passport');
const router = express.Router();

router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.send(`Welcome back, ${req.user.username}!`);
    } else {
        res.send('Hello World!');
    }
});

router.post('/login',
            passport.authenticate('local', { successRedirect: '/',
                                             failureRedirect: '/login' }));

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
