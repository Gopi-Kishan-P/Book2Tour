import express from "express";
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import bodyParser from 'body-parser'

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";

const app = express()
const port = 3000;

const firebaseConfig = {
	apiKey: "AIzaSyB5VP4F4mxBh8Y9WrlO8ihLSaccw0xlclw",
	authDomain: "book2tour-new.firebaseapp.com",
	projectId: "book2tour-new",
	storageBucket: "book2tour-new.appspot.com",
	messagingSenderId: "240497947003",
	appId: "1:240497947003:web:96b45d64316fbed2d38dde",
	measurementId: "G-FQC07WJFYV"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(app);



app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

const __dirname = dirname(fileURLToPath(import.meta.url))


app.get("/", (req, res) => {
	res.sendFile(__dirname + "/public/")
})

app.post("/success", async (req, res) => {
	let bookingData = req.body;
	bookingData['bookedOn'] = new Date();
	const docRef = await addDoc(collection(db, "bookings"), bookingData);
	console.log("Document written with ID: ", docRef.id);
	res.sendFile(__dirname + "/public/success.html");
})


app.listen(port, () => {
	console.log('Service is running on port: ' + port);
})