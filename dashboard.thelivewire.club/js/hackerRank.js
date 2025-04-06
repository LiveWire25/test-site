import { auth, db} from "../../firebase-config.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { arrayUnion, getDoc, doc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


let schoolName = null;
let email = null;

onAuthStateChanged(auth, async (user) => {
    if (user) {
        email = user.email; // Set the global email variable
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
            schoolName = docSnap.data().schoolName
            const events = docSnap.data().events
            if (events != undefined && events.includes("hackerRank")){
                console.log(events)
                document.getElementById("1").style.display = "none";
                document.getElementById("form02-2l").style.display = "none";
            }
        }
    } catch(error) {
        console.error(error.message)
    }
}

document.getElementById("register")?.addEventListener("click", async (e) => {
    e.preventDefault()
    console.log("here")
    const teacherContact = document.getElementById("phone-form02-2k").value;
    const P1Name = document.getElementById("textarea-form02-2k").value;
    const P1Class = document.getElementById("name-form02-2l").value;
    const P1Contact = document.getElementById("email-form02-2l").value;
    const hID = document.getElementById("phone-form02-2l").value;

    await setDoc(doc(db, "hackerRank", schoolName), {
        teacherContact: teacherContact,
        P1Name: P1Name,
        P1Class: P1Class,
        P1Contact: P1Contact,
        hID: hID,
    })

    try {
        await updateDoc(doc(db, "users", email), {
            events: arrayUnion("hackerRank")
        })
    } catch (error) {
        console.error(error.message)
    }

    window.location.href = "../dashboard.thelivewire.club"
})

// Logout
document.getElementById("logout-btn")?.addEventListener("click", () => {
    console.log("clicked")
    signOut(auth).then(() => window.location.href = "../index.html");
});