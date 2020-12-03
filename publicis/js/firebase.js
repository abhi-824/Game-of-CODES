// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
	apiKey: 'AIzaSyDdE6xJ0Zq8nWVNZgxR3gpQtGL7t6GF3SI',
	authDomain: 'game-of-codes-824.firebaseapp.com',
	databaseURL: 'https://game-of-codes-824.firebaseio.com',
	projectId: 'game-of-codes-824',
	storageBucket: 'game-of-codes-824.appspot.com',
	messagingSenderId: '424841167122',
	appId: '1:424841167122:web:be7f203203efb36b3d73cb',
	measurementId: 'G-96QDV08GG2',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();
