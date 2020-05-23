var express = require('express');
var bodyParser = require('body-parser');
var app = express();


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set("view engine", "ejs");

app.use("/public", express.static(__dirname + '/public'));



app.get('/', (req, res) => {
    res.render('home.ejs');
});

app.get('/login', (req, res) => {
    res.render('login-signup');
});

app.listen(3000 || process.env.PORT, () => {
    console.log('Server started');
});