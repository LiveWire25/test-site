import { auth, db} from "../../firebase-config.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { collection, addDoc, getDoc, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


onAuthStateChanged(auth, async (user) => {
    if (user) {
        const email = user.email; // Set the global email variable
        console.log("User  email:", email);
        check(email)

    } else {
        console.log("No user is signed in.");
    }
});


async function check(email) {
    try {
        const docSnap = await getDoc(doc(db, "users", email))
    
        if (docSnap.exists()) {
            const events = docSnap.data().events;
            const submission = docSnap.data().submission;
            if (events != undefined){
                for (const event of events){
                    const box = document.getElementById(event);
                    box.style.display = "block";
                };
                for (const event of submission){
                    if (!["aenigmaSyntax", "hackerRank"].includes(event)) {
                        const btn = document.getElementById(event+"-btn");
                        btn.textContent = "Submited";
                        btn.removeAttribute("href");
                        btn.style.cursor = "not-allowed";
                    }
                    
                };
            };
        };
    } catch(error) {
        console.error(error.message)
    }
}



// Logout
document.getElementById("logout-btn")?.addEventListener("click", () => {
    console.log("clicked")
    signOut(auth).then(() => window.location.href = "../index.html");
});