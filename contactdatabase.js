import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getDatabase, ref, push, set, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDc74JnSrfxw9wgi_DUDzi9FUMhONC0zxU",
    authDomain: "team-website-a5c15.firebaseapp.com",
    databaseURL: "https://team-website-a5c15-default-rtdb.firebaseio.com",
    projectId: "team-website-a5c15",
    storageBucket: "team-website-a5c15.firebasestorage.app",
    messagingSenderId: "496696422229",
    appId: "1:496696422229:web:506c5f43ff4614af7c09dc",
    measurementId: "G-NWFYM3B7MZ"
};

// Initializing Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Form submission event listener
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById("contactForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form from reloading the page

        // Get form values
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        // Save data to Firebase Realtime Database
        const userRef = ref(database, 'messages'); // Reference to 'messages' node
        const newUserRef = push(userRef); // Push a new child to 'messages' node

        set(newUserRef, {
            name: name,
            email: email,
            message: message,
            timestamp: serverTimestamp() // Optional: save submission time
        }).then(() => {
            // Show success message
            const responseMessage = document.getElementById("formResponseMessage");
            responseMessage.textContent = "Response sent successfully!";
            responseMessage.style.color = "green";  // Green color for success message

            // Hide the message after 5 seconds
            setTimeout(() => {
                responseMessage.textContent = ''; // Clear the message
            }, 5000);

            // Reset form
            document.getElementById("contactForm").reset();
        }).catch((error) => {
            // Show error message
            const responseMessage = document.getElementById("formResponseMessage");
            responseMessage.textContent = "Error saving data: " + error.message;
            responseMessage.style.color = "red";  // Red color for error message

            // Hide the message after 5 seconds
            setTimeout(() => {
                responseMessage.textContent = ''; // Clear the message
            }, 5000);
        });
    });
});
