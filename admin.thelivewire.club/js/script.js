import { auth, db} from "../../firebase-config.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Logout
document.getElementById("logout-btn")?.addEventListener("click", () => {
    console.log("clicked")
    signOut(auth).then(() => window.location.href = "../index.html");
});