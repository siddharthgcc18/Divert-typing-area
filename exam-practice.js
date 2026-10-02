/* =========================================================
   DEDICATED EXAM TYPING PAGE
   ========================================================= */

const params =
    new URLSearchParams(window.location.search);

const examId =
    params.get("exam") || "ssc-chsl";

let selectedSet =
    Number(params.get("set")) || 1;


/* =========================================================
   EXAM FILES
   ========================================================= */

const examFiles = {

    "ssc-chsl":
        "practice/ssc-chsl.js",

    "ssc-cgl":
        "practice/ssc-cgl.js",

    "railway-typing":
        "practice/railway-typing.js",

    "rrb-clerk":
        "practice/rrb-clerk.js",

    "upsssc-junior-assistant":
        "practice/upsssc-junior-assistant.js",

    "government-clerk":
        "practice/government-clerk.js"

};


/* =========================================================
   EXAM INFO
   ========================================================= */

const examInfo = {

    "ssc-chsl": {
        name: "SSC CHSL",
        tag: "SSC CHSL",
        logo: "CHSL",
        description:
            "Dedicated typing practice for SSC CHSL preparation."
    },

    "ssc-cgl": {
        name: "SSC CGL",
        tag: "SSC CGL",
        logo: "CGL",
        description:
            "Dedicated data-entry style practice for SSC CGL preparation."
    },

    "railway-typing": {
        name: "Railway Typing Test",
        tag: "RAILWAY",
        logo: "RR",
        description:
            "Railway-style typing practice with separate editable sets."
    },

    "rrb-clerk": {
        name: "RRB Clerk",
        tag: "RRB",
        logo: "RRB",
        description:
            "Separate clerical typing practice sets for RRB preparation."
    },

    "upsssc-junior-assistant": {
        name: "UPSSSC Junior Assistant",
        tag: "UPSSSC",
        logo: "UP",
        description:
            "Typing practice for Junior Assistant preparation."
    },

    "government-clerk": {
        name: "Government Clerk Mock",
        tag: "GOVT",
        logo: "GOV",
        description:
            "General government clerk and assistant typing mock tests."
    }

};


/* =========================================================
   LOAD SCRIPT
   ========================================================= */

function loadExamFile() {

    const file =
        examFiles[examId];

    if (!file) {

        showError(
            "Exam file not found."
        );

        return;

    }


    const script =
        document.createElement("script");

    script.src = file;

    script.onload = () => {

        setTimeout(
            initializeExam,
            50
        );

    };


    script.onerror = () => {

        showError(
            `Could not load ${file}`
        );

    };


    document.body.appendChild(script);

}


/* =========================================================
   ERROR
   ========================================================= */

function showError(message) {

    const passage =
        document.getElementById("passage");

    if (passage) {

        passage.innerHTML = `
            <div style="
                color:#dc2626;
                font-family:Arial;
                font-weight:800;">
                ${message}
            </div>
        `;

    }

}


/* =========================================================
   GET CURRENT SET ARRAY
   ========================================================= */

function getPracticeSets() {

    const variableNameMap = {

        "ssc-chsl":
            "SSC_CHSL_PRACTICE",

        "ssc-cgl":
            "SSC_CGL_PRACTICE",

        "railway-typing":
            "RAILWAY_TYPING_PRACTICE",

        "rrb-clerk":
            "RRB_CLERK_PRACTICE",

        "upsssc-junior-assistant":
            "UPSSSC_JUNIOR_ASSISTANT_PRACTICE",

        "government-clerk":
            "GOVERNMENT_CLERK_PRACTICE"

    };


    const variableName =
        variableNameMap[examId];

    return window[variableName] || [];

}


/* =========================================================
   INITIALIZE
   ========================================================= */

let sets = [];
let currentSet = null;

let typing = {
    text: "",
    value: "",
    started: false,
    finished: false,
    remaining: 600,
    timer: null
};


function initializeExam() {

    sets = getPracticeSets();

    if (!sets.length) {

        showError(
            "No practice sets found in this exam file."
        );

        return;

    }


    if (
        selectedSet < 1 ||
        selectedSet > sets.length
    ) {

        selectedSet = 1;

    }


    setupExamHeader();

    createSetSelector();

    loadSet(selectedSet);

}


/* =========================================================
   HEADER
   ========================================================= */

function setupExamHeader() {

    const info =
        examInfo[examId];

    if (!info) return;

    document.title =
        `${info.name} | Typing Area by Siddhu`;


    document.getElementById(
        "examTitle"
    ).textContent =
        info.name;


    document.getElementById(
        "examTag"
    ).textContent =
        info.tag;


    document.getElementById(
        "examLogo"
    ).textContent =
        info.logo;


    document.getElementById(
        "examDescription"
    ).textContent =
        info.description;

}


/* =========================================================
   SET SELECTOR
   ========================================================= */

function createSetSelector() {

    const select =
        document.getElementById(
            "setSelect"
        );

    select.innerHTML = "";


    sets.forEach((set, index) => {

        const option =
            document.createElement(
                "option"
            );

        option.value =
            index + 1;

        option.textContent =
            `${set.title || "Set " + (index + 1)}${
                set.difficulty
                    ? " · " + set.difficulty
                    : ""
            }`;

        select.appendChild(option);

    });


    select.value =
        selectedSet;


    select.onchange = () => {

        selectedSet =
            Number(select.value);

        const url =
            new URL(window.location.href);

        url.searchParams.set(
            "set",
            selectedSet
        );

        window.history.replaceState(
            {},
            "",
            url
        );

        loadSet(selectedSet);

    };

}


/* =========================================================
   LOAD SET
   ========================================================= */

function loadSet(number) {

    clearInterval(
        typing.timer
    );


    currentSet =
        sets[number - 1];


    if (!currentSet) return;


    typing.text =
        cleanText(
            currentSet.text || ""
        );

    typing.value = "";

    typing.started = false;

    typing.finished = false;


    typing.remaining =
        Number(
            currentSet.duration || 10
        ) * 60;


    document.getElementById(
        "setName"
    ).textContent =
        currentSet.title ||
        `Set ${number}`;


    document.getElementById(
        "difficulty"
    ).textContent =
        currentSet.difficulty ||
        "Exam Style";


    document.getElementById(
        "durationLabel"
    ).textContent =
        `${currentSet.duration || 10} min`;


    document.getElementById(
        "target"
    ).textContent =
        currentSet.targetWPM
            ? `${currentSet.targetWPM} WPM`
            : "Typing";


    document.getElementById(
        "time"
    ).textContent =
        formatTime(
            typing.remaining
        );


    document.getElementById(
        "wpm"
    ).textContent = "0";


    document.getElementById(
        "accuracy"
    ).textContent =
        "100%";


    document.getElementById(
        "errors"
    ).textContent = "0";


    document.getElementById(
        "status"
    ).textContent =
        "Ready";


    document.getElementById(
        "input"
    ).value = "";


    document.getElementById(
        "input"
    ).disabled = false;


    document.getElementById(
        "result"
    ).classList.add("hidden");


    renderPassage("");

}


/* =========================================================
   CLEAN TEXT
   ========================================================= */

function cleanText(text) {

    return text
        .replace(/\r\n/g, "\n")
        .replace(/\t/g, " ")
        .trim();

}


/* =========================================================
   RENDER PASSAGE
   ========================================================= */

function renderPassage(value) {

    const box =
        document.getElementById(
            "passage"
        );

    box.innerHTML = "";


    [...typing.text]
        .forEach((char, index) => {

            const span =
                document.createElement(
                    "span"
                );


            span.textContent =
                char;


            if (char === " ") {

                span.classList.add(
                    "space"
                );

            }


            if (index < value.length) {

                if (
                    value[index] === char
                ) {

                    span.classList.add(
                        "correct"
                    );

                }
                else {

                    span.classList.add(
                        "wrong"
                    );

                }

            }


            if (
                index === value.length &&
                !typing.finished
            ) {

                span.classList.add(
                    "current"
                );

            }


            box.appendChild(
                span
            );

        });

}


/* =========================================================
   STATS
   ========================================================= */

function calculateStats(value) {

    let correct = 0;
    let errors = 0;


    for (
        let i = 0;
        i < value.length;
        i++
    ) {

        if (
            value[i] ===
            typing.text[i]
        ) {

            correct++;

        }
        else {

            errors++;

        }

    }


    const elapsed =
        Math.max(
            1,
            (
                Number(
                    currentSet?.duration || 10
                ) * 60
            ) -
            typing.remaining
        );


    const wpm =
        Math.round(
            (correct / 5) /
            (elapsed / 60)
        ) || 0;


    const accuracy =
        value.length === 0
            ? 100
            : Math.round(
                correct /
                value.length *
                100
            );


    document.getElementById(
        "wpm"
    ).textContent =
        wpm;


    document.getElementById(
        "accuracy"
    ).textContent =
        accuracy + "%";


    document.getElementById(
        "errors"
    ).textContent =
        errors;


    return {
        wpm,
        accuracy,
        errors
    };

}


/* =========================================================
   TIMER
   ========================================================= */

function startTimer() {

    if (typing.started) return;

    typing.started = true;

    document.getElementById(
        "status"
    ).textContent =
        "Typing...";


    typing.timer =
        setInterval(() => {

            typing.remaining--;


            document.getElementById(
                "time"
            ).textContent =
                formatTime(
                    typing.remaining
                );


            calculateStats(
                typing.value
            );


            if (
                typing.remaining <= 0
            ) {

                finishTest();

            }

        }, 1000);

}


/* =========================================================
   INPUT
   ========================================================= */

document.getElementById(
    "input"
).addEventListener(
    "input",
    event => {

        if (typing.finished) return;


        typing.value =
            event.target.value;


        startTimer();


        renderPassage(
            typing.value
        );


        const stats =
            calculateStats(
                typing.value
            );


        if (
            typing.value.length >=
            typing.text.length
        ) {

            finishTest();

        }

    }
);


/* =========================================================
   FINISH
   ========================================================= */

function finishTest() {

    if (typing.finished) return;

    typing.finished = true;

    clearInterval(
        typing.timer
    );


    const stats =
        calculateStats(
            typing.value
        );


    document.getElementById(
        "input"
    ).disabled = true;


    document.getElementById(
        "status"
    ).textContent =
        "Completed";


    document.getElementById(
        "resultText"
    ).textContent =
        `${stats.wpm} WPM · ${stats.accuracy}% accuracy · ${stats.errors} errors`;


    document.getElementById(
        "result"
    ).classList.remove(
        "hidden"
    );


    /* SAVE MAIN ACCOUNT PROGRESS */

    const saved =
        JSON.parse(
            localStorage.getItem(
                "tasData"
            ) || "null"
        ) || {
            name: "Guest",
            xp: 0,
            tests: 0,
            bestWpm: 0,
            bestAcc: 0,
            dark: false,
            gameBest: 0,
            unlockedLevel: 1
        };


    const earnedXP =
        Math.max(
            15,
            Math.round(
                stats.wpm * 1.5 +
                stats.accuracy * .3
            )
        );


    saved.xp += earnedXP;

    saved.tests++;

    saved.bestWpm =
        Math.max(
            saved.bestWpm || 0,
            stats.wpm
        );

    saved.bestAcc =
        Math.max(
            saved.bestAcc || 0,
            stats.accuracy
        );


    localStorage.setItem(
        "tasData",
        JSON.stringify(saved)
    );


    document.getElementById(
        "resultText"
    ).textContent =
        `${stats.wpm} WPM · ${stats.accuracy}% accuracy · +${earnedXP} XP`;

}


/* =========================================================
   RESTART
   ========================================================= */

document.getElementById(
    "restart"
).onclick = () => {

    loadSet(
        selectedSet
    );

};


/* =========================================================
   RETRY
   ========================================================= */

document.getElementById(
    "retry"
).onclick = () => {

    loadSet(
        selectedSet
    );

};


/* =========================================================
   FORMAT TIME
   ========================================================= */

function formatTime(seconds) {

    const min =
        Math.floor(
            seconds / 60
        );

    const sec =
        seconds % 60;

    return (
        String(min).padStart(2, "0") +
        ":" +
        String(sec).padStart(2, "0")
    );

}


/* =========================================================
   START
   ========================================================= */

loadExamFile();
/* =================================================
   PRACTICE DARK MODE
================================================= */

const practiceTheme =
    document.getElementById("practiceTheme");


function applyPracticeTheme() {

    const data =
        JSON.parse(
            localStorage.getItem("tasData") || "{}"
        );

    const dark =
        data.dark === true;

    document.body.classList.toggle(
        "dark",
        dark
    );

    if (practiceTheme) {

        practiceTheme.textContent =
            dark ? "☀" : "☾";

    }
}


applyPracticeTheme();


if (practiceTheme) {

    practiceTheme.onclick = () => {

        const data =
            JSON.parse(
                localStorage.getItem("tasData") || "{}"
            );

        data.dark =
            !document.body.classList.contains("dark");

        localStorage.setItem(
            "tasData",
            JSON.stringify(data)
        );

        applyPracticeTheme();

    };

}