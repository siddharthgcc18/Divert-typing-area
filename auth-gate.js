import { auth } from "./firebase-config.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";


// =====================================================
// ELEMENTS
// =====================================================

const $ = (id) => document.getElementById(id);


// =====================================================
// AUTH MODAL
// =====================================================

function openAuthModal() {

    const modal = $("authModal");

    if (!modal) return;

    modal.classList.remove("hidden");

    $("authError")?.classList.add("hidden");

    $("authEmail")?.focus();
}


function closeAuthModal() {

    $("authModal")?.classList.add("hidden");
}


// =====================================================
// LOGIN / SIGNUP MODE
// =====================================================

let signupMode = false;


function updateAuthMode() {

    const title = $("authTitle");
    const subtitle = $("authSubtitle");
    const submit = $("authSubmit");
    const nameBox = $("signupNameBox");
    const switchText = $("authSwitchText");
    const switchButton = $("authSwitch");

    if (signupMode) {

        title.textContent = "Create Account";

        subtitle.textContent =
            "Create your account to start typing.";

        submit.textContent = "Create Account";

        nameBox?.classList.remove("hidden");

        switchText.textContent =
            "Already have an account?";

        switchButton.textContent =
            "Login";

    } else {

        title.textContent = "Welcome Back";

        subtitle.textContent =
            "Login to continue practicing.";

        submit.textContent = "Login";

        nameBox?.classList.add("hidden");

        switchText.textContent =
            "Don't have an account?";

        switchButton.textContent =
            "Create Account";
    }
}


// =====================================================
// FIREBASE ERROR MESSAGE
// =====================================================

function firebaseError(error) {

    const code = error?.code || "";

    switch (code) {

        case "auth/invalid-email":
            return "Please enter a valid email address.";

        case "auth/email-already-in-use":
            return "This email is already registered.";

        case "auth/weak-password":
            return "Password is too weak.";

        case "auth/invalid-credential":
            return "Email or password is incorrect.";

        case "auth/user-not-found":
            return "No account found with this email.";

        case "auth/wrong-password":
            return "Incorrect password.";

        case "auth/too-many-requests":
            return "Too many attempts. Please try again later.";

        default:
            return "Something went wrong. Please try again.";
    }
}


// =====================================================
// SUBMIT LOGIN / SIGNUP
// =====================================================

async function submitAuth() {

    const name =
        $("authName")?.value.trim();

    const email =
        $("authEmail")?.value.trim();

    const password =
        $("authPassword")?.value;

    const errorBox =
        $("authError");

    const button =
        $("authSubmit");


    errorBox?.classList.add("hidden");


    if (signupMode && !name) {

        errorBox.textContent =
            "Please enter your name.";

        errorBox.classList.remove("hidden");

        return;
    }


    if (!email) {

        errorBox.textContent =
            "Please enter your email.";

        errorBox.classList.remove("hidden");

        return;
    }


    if (!password) {

        errorBox.textContent =
            "Please enter your password.";

        errorBox.classList.remove("hidden");

        return;
    }


    button.disabled = true;

    button.textContent =
        signupMode
            ? "Creating Account..."
            : "Logging in...";


    let result;


    try {

        if (signupMode) {

            result =
                await window.signup(
                    name,
                    email,
                    password
                );

        } else {

            result =
                await window.login(
                    email,
                    password
                );
        }


        if (!result.success) {

            throw result.error;
        }


        // Login successful
        closeAuthModal();


        // Clear fields

        if ($("authPassword")) {
            $("authPassword").value = "";
        }


        // If a protected page was requested
        const next =
            sessionStorage.getItem(
                "pendingAuthPath"
            );


        if (next) {

            sessionStorage.removeItem(
                "pendingAuthPath"
            );

            window.location.href = next;
        }


    } catch (error) {

        console.error(error);

        errorBox.textContent =
            firebaseError(error);

        errorBox.classList.remove("hidden");

    } finally {

        button.disabled = false;

        button.textContent =
            signupMode
                ? "Create Account"
                : "Login";
    }
}


// =====================================================
// PROTECTED WEBSITE CLICK
// =====================================================

function protectWebsite() {

    document.addEventListener(
        "click",
        function (event) {

            const target =
                event.target.closest(
                    "[data-page], #profile, a[href*='practice-test.html'], [data-protected]"
                );


            // Protected element nahi hai
            if (!target) return;


            // Intro button public rahega
            if (
                target.id === "enter" ||
                target.id === "enterSite"
            ) {
                return;
            }


            // Theme button ko login ke bina bhi use karne do
            if (
                target.id === "theme"
            ) {
                return;
            }


            // Firebase current user
            const user =
                window.getFirebaseUser?.();


            // User logged in hai
            if (user) {
                return;
            }


            // =========================================
            // USER LOGIN NAHI HAI
            // =========================================

            event.preventDefault();

            event.stopImmediatePropagation();


            // Jis page/feature ko user open kar raha tha
            // usko temporarily remember karo

            let pendingPath =
                window.location.href;


            // Agar link kisi specific page par ja raha hai
            if (target.href) {

                pendingPath =
                    target.href;

            }


            sessionStorage.setItem(
                "pendingAuthPath",
                pendingPath
            );


            // Login popup open
            openAuthModal();

        },
        true
    );
}


// =====================================================
// DIRECT PRACTICE PAGE PROTECTION
// =====================================================

function protectPracticePage() {

    const isPracticePage =
        window.location.pathname
            .toLowerCase()
            .includes("practice-test.html");


    if (!isPracticePage) return;


    onAuthStateChanged(
        auth,
        (user) => {

            if (!user) {

                sessionStorage.setItem(
                    "pendingAuthPath",
                    window.location.href
                );


                window.location.replace(
                    "index.html?login=1"
                );
            }

        }
    );
}


// =====================================================
// EVENTS
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateAuthMode();

        protectWebsite();

        protectPracticePage();


        // Login / signup switch

        $("authSwitch")?.addEventListener(
            "click",
            () => {

                signupMode =
                    !signupMode;

                updateAuthMode();

            }
        );


        // Submit

        $("authSubmit")?.addEventListener(
            "click",
            submitAuth
        );


        // Enter key

        $("authPassword")?.addEventListener(
            "keydown",
            (event) => {

                if (event.key === "Enter") {

                    submitAuth();

                }

            }
        );


        // Close

        $("authClose")?.addEventListener(
            "click",
            closeAuthModal
        );


        // Close when clicking background

        $("authModal")?.addEventListener(
            "click",
            (event) => {

                if (
                    event.target.id ===
                    "authModal"
                ) {

                    closeAuthModal();

                }

            }
        );


        // ?login=1

        const params =
            new URLSearchParams(
                window.location.search
            );


        if (
            params.get("login") === "1"
        ) {

            setTimeout(() => {

                openAuthModal();

            }, 300);

        }

    }
);