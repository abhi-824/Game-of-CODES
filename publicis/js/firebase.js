// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
	apiKey: 'AIzaSyBA_HGw5P2DoHT_hx1iVYIN-hw9fZyn56k',
	authDomain: 'haha-f77b6.firebaseapp.com',
	databaseURL: 'https://haha-f77b6.firebaseio.com',
	projectId: 'haha-f77b6',
	appId: '1:178676120776:web:3f72a45ce1153282af39fd',
	measurementId: 'G-RQQ0DX2V89',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
