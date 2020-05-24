var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

var firebaseConfig = {
    apiKey: "AIzaSyBqlEPM_ymXQ7LPG5PDwRcRAtgk91fSkSw",
    authDomain: "neighbourhood-bfdcc.firebaseapp.com",
    databaseURL: "https://neighbourhood-bfdcc.firebaseio.com",
    projectId: "neighbourhood-bfdcc",
    storageBucket: "neighbourhood-bfdcc.appspot.com",
    messagingSenderId: "392732004422",
    appId: "1:392732004422:web:9b52c09198731fdbc0fa47",
    measurementId: "G-X1SEJW6XS5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();



app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set("view engine", "ejs");

app.use("/public", express.static(__dirname + '/public'));


// var indexRoute = require('./routes/index');
var covidRoute = require('./routes/covidRoutes');
var requestRoute = require('./routes/requestRoutes');

app.use('/covid', covidRoute);
app.use('/request', requestRoute);




app.get('/', (req, res) => {
    res.render('home.ejs');
});

app.get('/login', (req, res) => {
    res.render('login-signup');
});

app.post('/signup', (req, res) => {
    signUp(req.body);
    // res.render('');
});




app.listen(3000 || process.env.PORT, () => {
    console.log('Server started');
});






function signUp(data) {
    console.log(data)
    console.log(data.fname);


    const promise = auth.createUserWithEmailAndPassword(data.email, data.password);
    promise.catch(e => console.log(e.message));

    console.log('signed up');


}