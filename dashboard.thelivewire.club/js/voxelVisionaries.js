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
            if (events != undefined && events.includes("voxelVisionaries")){
                console.log("here")
                document.getElementById("form02").style.display = "none";
                document.getElementById("form02-1j").style.display = "none";
                document.getElementById("form02-1k").style.display = "none";
                if (submission === undefined || !submission.includes("voxelVisionaries")){
                    console.log("here")
                    document.getElementById("form02-2e").style.display = "block";
                };
            }
        }
    } catch(error) {
        console.error(error.message)
    }
}

document.getElementById("register")?.addEventListener("click", async () => {
    console.log("here")
    const teacherContact = document.getElementById("phone-form02-1i").value;
    const P1Name = document.getElementById("textarea-form02-1i").value;
    const P1Class = document.getElementById("name-form02-1j").value;
    const P1Contact = document.getElementById("phone-form02-1j").value;
    const P2Name = document.getElementById("textarea-form02-1j").value;
    const P2Class = document.getElementById("name-form02-1k").value;
    const P2Contact = document.getElementById("phone-form02-1k").value;

    await setDoc(doc(db, "voxelVisionaries", schoolName), {
        teacherContact: teacherContact,
        P1Name: P1Name,
        P1Class: P1Class,
        P1Contact: P1Contact,
        P2Name: P2Name,
        P2Class: P2Class,
        P2Contact: P2Contact
    })

    try {
        await updateDoc(doc(db, "users", email), {
            events: arrayUnion("voxelVisionaries")
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

    await updateDoc(doc(db, "voxelVisionaries", schoolName), {
        link: link,
    })

    try {
        await updateDoc(doc(db, "users", email), {
            submission: arrayUnion("voxelVisionaries")
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