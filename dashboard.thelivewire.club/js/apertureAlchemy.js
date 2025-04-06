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
            const submission = docSnap.data().submission
            if (events != undefined && events.includes("apertureAlchemy")){
                console.log("here")
                document.getElementById("1").style.display = "none";
                document.getElementById("form02-20").style.display = "none";
                if (submission === undefined || !submission.includes("apertureAlchemy")){
                    document.getElementById("form02-2e").style.display = "block";
                };
                
            };
        };
    } catch(error) {
        console.error(error.message)
    }
}

document.getElementById("register")?.addEventListener("click", async (e) => {
    e.preventDefault()
    console.log("here")
    const teacherContact = document.getElementById("phone-form02-1z").value;
    const P1Name = document.getElementById("textarea-form02-1z").value;
    const P1Class = document.getElementById("name-form02-20").value;
    const P1Contact = document.getElementById("phone-form02-20").value;

    await setDoc(doc(db, "apertureAlchemy", schoolName), {
        teacherContact: teacherContact,
        P1Name: P1Name,
        P1Class: P1Class,
        P1Contact: P1Contact,
    })

    try {
        await updateDoc(doc(db, "users", email), {
            events: arrayUnion("apertureAlchemy")
        })
    } catch (error) {
        console.error(error.message)
    }

    window.location.href = "../dashboard.thelivewire.club"
})


document.getElementById("submit")?.addEventListener("click", async (e) => {
    e.preventDefault()
    console.log("here")
    const link = document.getElementById("phone-form02-2e").value;
    const title = document.getElementById("textarea-form02-2e").value;

    await updateDoc(doc(db, "apertureAlchemy", schoolName), {
        link: link,
        title: title,
    })

    try {
        await updateDoc(doc(db, "users", email), {
            submission: arrayUnion("apertureAlchemy")
        })
    } catch (error) {
        console.error(error.message)
    }

    window.location.href = "./Your Events.html"
})

// Logout
document.getElementById("logout-btn")?.addEventListener("click", () => {
    console.log("clicked")
    signOut(auth).then(() => window.location.href = "../index.html");
});