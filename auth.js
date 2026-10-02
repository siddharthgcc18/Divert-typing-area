import { auth, db } from "./firebase-config.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import {
    doc,
    setDoc,
    getDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";


// =====================================================
// CREATE ACCOUNT
// =====================================================

async function signup(name, email, password) {

    try {

        const credential =
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

        const user = credential.user;

        await updateProfile(user, {
            displayName: name
        });

        await setDoc(
            doc(db, "users", user.uid),
            {
                uid: user.uid,
                name: name,
                email: email,

                xp: 0,
                tests: 0,

                bestWpm: 0,
                bestAcc: 0,

                gameBest: 0,

                unlockedLevel: 1,

                dark: false,

                rank: "Bronze",

                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            }
        );

        return {
            success: true,
            user: user
        };

    } catch (error) {

        console.error("Signup error:", error);

        return {
            success: false,
            error: error
        };
    }
}


// =====================================================
// LOGIN
// =====================================================

async function login(email, password) {

    try {

        const credential =
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

        return {
            success: true,
            user: credential.user
        };

    } catch (error) {

        console.error("Login error:", error);

        return {
            success: false,
            error: error
        };
    }
}


// =====================================================
// LOGOUT
// =====================================================

async function logout() {

    try {

        await signOut(auth);

        return true;

    } catch (error) {

        console.error("Logout error:", error);

        return false;
    }
}


// =====================================================
// GET USER DATA
// =====================================================

async function getUserData(uid) {

    try {

        const userRef = doc(db, "users", uid);

        const snapshot = await getDoc(userRef);

        if (snapshot.exists()) {
            return snapshot.data();
        }

        return null;

    } catch (error) {

        console.error(
            "Error loading user data:",
            error
        );

        return null;
    }
}


// =====================================================
// SAVE USER DATA
// =====================================================

async function saveUserData(uid, data) {

    try {

        await setDoc(
            doc(db, "users", uid),
            {
                ...data,
                updatedAt: serverTimestamp()
            },
            {
                merge: true
            }
        );

        return true;

    } catch (error) {

        console.error(
            "Error saving user data:",
            error
        );

        return false;
    }
}


// =====================================================
// CURRENT USER
// =====================================================

let currentUser = null;

onAuthStateChanged(auth, async (user) => {

    currentUser = user;

    if (user) {

        console.log(
            "Logged in:",
            user.email
        );

        const userData =
            await getUserData(user.uid);

        console.log(
            "Firebase user data:",
            userData
        );

        // Main website ko batayenge ki user login hai
        window.dispatchEvent(
            new CustomEvent(
                "firebaseUserReady",
                {
                    detail: {
                        user: user,
                        data: userData
                    }
                }
            )
        );

    } else {

        console.log("No user logged in");

        window.dispatchEvent(
            new CustomEvent(
                "firebaseUserLoggedOut"
            )
        );
    }
});


// =====================================================
// GLOBAL FUNCTIONS
// =====================================================

window.signup = signup;
window.login = login;
window.logout = logout;
window.getUserData = getUserData;
window.saveUserData = saveUserData;

window.getFirebaseUser = () => currentUser;