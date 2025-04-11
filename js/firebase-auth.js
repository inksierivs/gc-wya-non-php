import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKCPHRHBeM2SjfESk3RDHFWdpFhEllrOY",
  authDomain: "wya-gc.firebaseapp.com",
  projectId: "wya-gc",
  storageBucket: "wya-gc.firebasestorage.app",
  messagingSenderId: "326895130760",
  appId: "1:326895130760:web:e7da3fa44c5a2f4467e73d",
  measurementId: "G-4R9KV6799T"
};
// firebase-auth.js

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Function to sign up new users
async function signupUser(event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const passwordConfirm = document.getElementById("password-confirm").value;

  const fname = document.getElementById("fname").value.trim();
  const lname = document.getElementById("lname").value.trim();

  if (password !== passwordConfirm) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save additional user details to Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: email,
      firstName: fname,
      lastName: lname,

    });

    alert("Signup successful!");
    window.location.href = "login.html"; // Redirect to login page after successful signup
  } catch (err) {
    alert("Signup error: " + err.message);
  }
}

// Function to log in users
async function loginUser(event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {
    // ✅ Sign in user first
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // ✅ Then fetch their Firestore profile
    const userDoc = await getDoc(doc(db, "users", user.uid));

    if (userDoc.exists()) {
      const userData = userDoc.data();

      // ✅ Store full info in sessionStorage
      sessionStorage.setItem("user", JSON.stringify({
        uid: user.uid,
        email: user.email,
        firstName: userData.firstName,
        lastName: userData.lastName
      }));

      window.location.href = "dashboard.html";
    } else {
      alert("User profile not found in Firestore.");
    }

  } catch (err) {
    alert("Login error: " + err.message);
  }
}

// Function to log out users
function logoutUser() {
  signOut(auth).then(() => {
    window.location.href = "login.html"; // Redirect to login page after logout
  }).catch((err) => {
    console.log(err.message);
  });
}


// Export functions for usage in HTML
export { signupUser, loginUser, logoutUser };
