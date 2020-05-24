var express = require('express');
var route = express.Router();

route.get('/shelter', (req, res) => {
    res.render('shelter-listing');
});

route.get('/food', (req, res) => {
    res.render('request-meal');
});

module.exports = route;