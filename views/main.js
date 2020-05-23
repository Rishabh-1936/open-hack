// Your web app's Firebase configuration


// Your web app's Firebase configuration
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


function signUp() {

	// var email = document.getElementById("email");
	// var password = document.getElementById("password");

	// const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
	// promise.catch(e => alert(e.message));

	// window.alert("Signed Up");
	

}



function signIn() {

	var email = document.getElementById("email");
	var password = document.getElementById("password");

	const promise = auth.signInWithEmailAndPassword(email.value, password.value);
	promise.catch(e => alert(e.message));




}


function signOut() {

	auth.signOut();
	window.alert("Signed Out");

}



auth.onAuthStateChanged(function (user) {

	if (user) {

		var email = user.email;
		window.alert("Active User " + email);

		//Take user to a different or home page

		//is signed in

	} else {

		window.alert("No Active User");
		//no user is signed in
	}



});
