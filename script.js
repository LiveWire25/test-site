import { auth, db} from "./firebase-config.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { collection, addDoc, getDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


// Login
document.getElementById("login-btn")?.addEventListener("click", async () => {
    const email = document.getElementById("email-form02-10").value;
    const password = document.getElementById("pwd-form02-10").value;
    console.log("1")

    try {
        console.log("2")
        await signInWithEmailAndPassword(auth, email, password);

        const docSnap = await getDoc(doc(db, "users", email))

        if (docSnap.data().userType === "admin" || docSnap.data().userType === "eventHead") {
            window.location.href = "./admin.thelivewire.club"
        } else {
            window.location.href = "./dashboard.thelivewire.club"
        }
    } catch(error) {
        console.error(error.message)
        alert(error.message)
    }
});




// Registration
document.getElementById("register-btn")?.addEventListener("click", async () => {
    const schoolName = document.getElementById("name-form02-13").value;
    const email = document.getElementById("email-form02-13").value;
    const password = document.getElementById("pwd-form02-13").value;
    const cpassword = document.getElementById("cpwd-form02-13").value;

    if (password === cpassword) {

        try {
            // Create user with email and password
            await createUserWithEmailAndPassword(auth, email, password);
            
            // Sign in the user
            await signInWithEmailAndPassword(auth, email, password);
            
            // Add user to Firestore
            await setDoc(doc(db, "users", email), {
                userType: "school",
                schoolName: schoolName,
                events: [],
                submisions: []
            });

            // Redirect to dashboard
            window.location.href = "./dashboard.thelivewire.club";

        } catch (error) {
            console.error(error.message);
            alert(error.message);
        }
    } else {
        alert("passwords don't match")
    }
});






