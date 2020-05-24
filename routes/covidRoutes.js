var express = require('express')
var route = express.Router();

route.get('/', (req, res) => {
    res.render('covid/main')
})

route.get('/world', (req, res) => {
    res.render('covid/world')
})

route.get('/health', (req, res) => {
    res.render('covid/health')
})
route.get('/chat', (req, res) => {
    res.render('covid/chatbot')
})

route.get('/report', (req, res) => {
    console.log(req)
    res.render('virtual-report');
})




module.exports = route;