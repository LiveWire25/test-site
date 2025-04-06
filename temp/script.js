import { auth, db} from "./firebase-config.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


// **User Authentication (Login & Register)**
document.getElementById("login")?.addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    signInWithEmailAndPassword(auth, email, password)
        .then(() => window.location.href = "dashboard.html")
        .catch(error => alert(error.message));
});

document.getElementById("register")?.addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    createUserWithEmailAndPassword(auth, email, password)
        .then(() => alert("Registered Successfully!"))
        .catch(error => alert(error.message));
});

// **Logout Function**
document.getElementById("logout")?.addEventListener("click", () => {
    signOut(auth).then(() => window.location.href = "index.html");
});

// **Event Registration**
document.getElementById("event-form")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const eventName = document.getElementById("eventName").value;
    const userEmail = auth.currentUser?.email;

    if (!userEmail) {
        alert("User not logged in!");
        return;
    }

    try {
        await addDoc(collection(db, "registrations"), {
            user: userEmail,
            event: eventName,
            timestamp: new Date()
        });
        alert("Registered Successfully!");
    } catch (error) {
        console.error("Firestore Error:", error);
        alert("Error saving registration: " + error.message);
    }
});



// **Admin Dashboard: Fetch Event Registrations**
async function loadRegistrations() {
    try {
        console.log("Fetching registrations..."); // Debugging

        const querySnapshot = await getDocs(collection(db, "registrations"));
        console.log(querySnapshot)
        const list = document.getElementById("registrations-list");

        if (querySnapshot.empty) {
            console.log("No registrations found!");
            list.innerHTML = "<p>No registrations yet.</p>";
            return;
        }

        list.innerHTML = ""; // Clear old entries
        querySnapshot.forEach(doc => {
            const data = doc.data();
            console.log("Fetched Data:", data); // Debugging
            const li = document.createElement("li");
            li.textContent = `${data.user} registered for ${data.event}`;
            list.appendChild(li);
        });

    } catch (error) {
        console.error("Firestore Fetch Error:", error);
    }
}

// Ensure it runs only on admin.html
document.getElementById("registrations-list") && loadRegistrations();
