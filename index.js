var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var firebase = require("firebase/app");
var cookieSession = require('cookie-session')

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");
require("firebase/database");

var covidRoute = require('./routes/covidRoutes');
var requestRoute = require('./routes/requestRoutes');

// app.use('/covid', covidRoute);
app.use('/request', requestRoute);



app.use(cookieSession({
    name: 'session',
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, maxAge: 60000 }
}))

app.use(function (req, res, next) {
    res.locals.currentUser = req.session.user;
    res.locals.isAuthenticated = req.session.isAuthenticated;
    res.locals.role = req.session.role;
    res.locals.msg = req.session.msg;
    console.log(' -> ', req.session.user, req.session.isAuthenticated)
    console.log("msg", req.session.msg)
    next();
})


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

app.listen(3000 || process.env.PORT, () => {
    console.log('Server started');
});

app.get('/', (req, res) => {
    res.render('home.ejs');
});

app.get('/signup', (req, res) => {
    res.render('login-signup');
});

app.post('/login', (req, res) => {
    login(req.body, res);
    // if (flag == 1) {
    //     req.session.msg = "Login Successful";
    //     res.redirect('/');
    // } else {
    //     req.session.msg = "Error in Login";
    //     res.redirect('/login');
    // }
});

app.get('/covid', (req, res) => {

    res.render('covid/main')
    // return res.redirect('https://covid19.who.int/');
});
app.get('/covid/health', (req, res) => {
    res.render('covid/health');
});

app.post('/signup', (req, res) => {

    signUp(req.body, req, res);
    // res.render('');
});

app.get('/logout', (req, res) => {
    logout(res);
    res.redirect('/');
});


//************* authentication ***************
function login(data, req, res) {
    const promise = auth.signInWithEmailAndPassword(data.email, data.password);
    promise.catch(e => alert(e.message));
    initApp(req, res);
    console.log('i am back')
}

function signUp(data, req, res) {
    const promise = auth.createUserWithEmailAndPassword(data.email, data.password);
    promise.catch(e => console.log(e.message));
    formData(data);
    initApp(req, res);
}

function logout(req, res) {

    firebase.auth().signOut();
    console.log(req)
    promise.catch(e => alert(e.message));
    req.session.isAuthenticated = "false"
    res.redirect('/');
    initApp(req, res);
}

function initApp(req, res) {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log("Signed in user!");
            req.session.isAuthenticated = "true"
            res.redirect('/');
        } else {
            console.log("No user!")
            return -1;
        }
    });
}

//************************* database interfacing **********************
function getAllData() {
    var refAllData = firebase.database().ref('Personal Data');
    refAllData.on("value", gotData, errData);
}
function getSpecificData(emailID) {
    var refr = firebase.database().ref('Personal Data');
    refr.orderByChild("email").equalTo(emailID).on("value", gotData, errData);
}
function errData(error) {
    console.log("Something went wrong.");
    console.log(error);
}
// The data comes back as an object
function gotData(data) {
    var user = data.val();
    // Grab all the keys to iterate over the object 
    var keys = Object.keys(user);
    // Loop through array
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var data = user[key];
        console.log(data);
    }
}
function formData(data) {
    var messagesRef = firebase.database().ref('Personal Data');
    console.log(data.fname);
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        fname: data.fname.toLowerCase(),
        email: data.email.toLowerCase(),
        address: data.address.toLowerCase(),
        phone: data.phone,
        city: data.city.toLowerCase(),
        state: data.state.toLowerCase(),
        zip: data.zip,
        lname: data.lname.toLowerCase(),
        signUp_category: data.signUp_category,
        delivery_days: data.delivery_days,
    }).then(function () {
        console.log('Upload succeeded');
    }).catch(function (error) {
        console.log('Upload failed');
    });;
}