var express = require('express')
var route = express.Router({ mergeParams: true });

route.get('/', (req, res) => {
    res.render('request-meal');
});

route.post('/', isLoggedIn, (req, res) => {

});


function isLoggedIn(req, res, next) {
    if (req.session.isAuthenticated && req.session.role == "normal") {
        req.session.msg = "Logged_in";
        return next();
    } else {
        req.session.msg = "Error !!!. Please Login";
        res.redirect('/login');
    }
}
module.exports = route;