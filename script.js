/* =========================================================
   TYPING AREA BY SIDDHU
   MAIN WEBSITE JAVASCRIPT
   ========================================================= */

const $ = id => document.getElementById(id);

/* =========================================================
   USER DATA
   ========================================================= */

let data = JSON.parse(localStorage.getItem("tasData")) || {
    name: "Guest",
    xp: 0,
    tests: 0,
    bestWpm: 0,
    bestAcc: 0,
    dark: false,
    gameBest: 0,
    unlockedLevel: 1
};


/* =========================================================
   RANK SYSTEM
   ========================================================= */

const ranks = [
    { name: "Bronze", icon: "🥉", min: 0 },
    { name: "Silver", icon: "🥈", min: 500 },
    { name: "Gold", icon: "🥇", min: 1500 },
    { name: "Platinum", icon: "💎", min: 3000 },
    { name: "Diamond", icon: "🔷", min: 6000 },
    { name: "Master", icon: "👑", min: 10000 }
];

function getRank() {

    let current = ranks[0];

    for (const rank of ranks) {
        if (data.xp >= rank.min) {
            current = rank;
        }
    }

    return current;
}

function saveData() {

    localStorage.setItem(
        "tasData",
        JSON.stringify(data)
    );

}


/* =========================================================
   PROFILE + RANK UPDATE
   ========================================================= */

function updateProfile() {

    const rank = getRank();
    const index = ranks.indexOf(rank);
    const next = ranks[index + 1];

    if ($("name")) {
        $("name").textContent = data.name;
    }

    if ($("avatar")) {

        $("avatar").textContent =
            (data.name || "G")
                .charAt(0)
                .toUpperCase();

    }

    if ($("accountRank")) {

        $("accountRank").textContent =
            rank.icon + " " + rank.name;

    }

    if ($("bestWpm")) {
        $("bestWpm").textContent = data.bestWpm;
    }

    if ($("bestAcc")) {
        $("bestAcc").textContent =
            data.bestAcc + "%";
    }

    if ($("tests")) {
        $("tests").textContent = data.tests;
    }

    if ($("xp")) {
        $("xp").textContent =
            data.xp.toLocaleString();
    }


    /* HOME */

    if ($("homeRank")) {
        $("homeRank").textContent =
            rank.name;
    }

    const level =
        Math.floor(data.xp / 250) + 1;

    if ($("homeLevel")) {

        $("homeLevel").textContent =
            `Level ${level} · ${data.xp.toLocaleString()} XP`;

    }


    /* RANK PROGRESS */

    let percent = 100;

    if (next) {

        percent =
            ((data.xp - rank.min) /
            (next.min - rank.min)) * 100;

        percent =
            Math.max(
                0,
                Math.min(100, percent)
            );

    }


    if ($("homeFill")) {
        $("homeFill").style.width =
            percent + "%";
    }

    if ($("rankfill")) {
        $("rankfill").style.width =
            percent + "%";
    }


    if ($("homeNext")) {

        $("homeNext").textContent =
            next
                ? `${(next.min - data.xp).toLocaleString()} XP to ${next.name}`
                : "Maximum rank";

    }


    if ($("rprog")) {

        $("rprog").textContent =
            next
                ? `${data.xp.toLocaleString()} / ${next.min.toLocaleString()} XP`
                : `${data.xp.toLocaleString()} XP`;

    }


    if ($("rnext")) {

        $("rnext").textContent =
            next ? next.name : "MAX";

    }


    if ($("medal")) {
        $("medal").textContent =
            rank.icon;
    }

    if ($("rank")) {
        $("rank").textContent =
            rank.name;
    }

    if ($("rankxp")) {

        $("rankxp").textContent =
            `${data.xp.toLocaleString()} XP · Level ${level}`;

    }


    document.body.classList.toggle(
        "dark",
        data.dark
    );

    if ($("theme")) {

        $("theme").textContent =
            data.dark ? "☀" : "☾";

    }

}


/* =========================================================
   NAVIGATION
   ========================================================= */

function openPage(pageName) {

    document
        .querySelectorAll(".page")
        .forEach(page => {

            page.classList.remove("active");

        });


    const page =
        document.getElementById(pageName);

    if (!page) return;

    page.classList.add("active");


    document
        .querySelectorAll("[data-page]")
        .forEach(item => {

            item.classList.toggle(
                "active",
                item.dataset.page === pageName
            );

        });


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


document.addEventListener(
    "click",
    function(event) {

        const button =
            event.target.closest(
                "[data-page]"
            );

        if (!button) return;


        const pageName =
            button.dataset.page;


        if (!pageName) return;


        /*
           NORMAL TYPING PRACTICE
           opens on separate page
        */

        if (
            pageName === "practice"
        ) {

            event.preventDefault();

            window.location.href =
                "practice-test.html";

            return;

        }


        /*
           Other existing pages
           continue normally.
        */

        event.preventDefault();

        openPage(
            pageName
        );

    }
);
/* =========================================================
   OPEN GOVERNMENT EXAMS DIRECTLY
   ========================================================= */

if (window.location.hash === "#exams") {

    const intro = $("intro");
    const app = $("app");

    if (intro) {
        intro.remove();
    }

    if (app) {
        app.classList.remove("hidden");
    }

    openPage("exams");

}


/* =========================================================
   INTRO
   ========================================================= */

if ($("enter")) {

    $("enter").onclick = () => {

        const intro = $("intro");

        if (!intro) return;

        intro.style.opacity = "0";

        setTimeout(() => {

            intro.remove();

            if ($("app")) {
                $("app").classList.remove("hidden");
            }

            startTypingTest();

        }, 400);

    };

}


/* =========================================================
   DARK MODE
   ========================================================= */

if ($("theme")) {

    $("theme").onclick = () => {

        data.dark = !data.dark;

        saveData();

        updateProfile();

    };

}


/* =========================================================
   PROFILE
   ========================================================= */

if ($("profile")) {

    $("profile").onclick = () => {

        if ($("profileName")) {

            $("profileName").value =
                data.name === "Guest"
                    ? ""
                    : data.name;

        }

        if ($("mavatar")) {

            $("mavatar").textContent =
                (data.name || "G")
                    .charAt(0)
                    .toUpperCase();

        }

        $("modal")?.classList.remove("hidden");

    };

}


if ($("close")) {

    $("close").onclick = () => {

        $("modal")?.classList.add("hidden");

    };

}


if ($("save")) {

    $("save").onclick = () => {

        const name =
            $("profileName")?.value.trim();

        data.name =
            name || "Guest";

        saveData();
        updateProfile();

        $("modal")?.classList.add("hidden");

    };

}


if ($("reset")) {

    $("reset").onclick = () => {

        if (!confirm("Reset all typing progress?")) {
            return;
        }

        data = {
            name: data.name,
            xp: 0,
            tests: 0,
            bestWpm: 0,
            bestAcc: 0,
            dark: data.dark,
            gameBest: 0,
            unlockedLevel: 1
        };

        saveData();
        updateProfile();

        $("modal")?.classList.add("hidden");

        startTypingTest();

    };

}


/* =========================================================
   GENERAL TYPING LEVELS
   ========================================================= */

const levels = [

    {
        id: 1,
        name: "Home Row",
        xp: 0,
        desc: "Start with simple keys and short words.",

        texts: [
            "asdf jkl; asdf jkl;",
            "a sad lad had a flask.",
            "ask dad; add a salad.",
            "fall as a lad; ask a dad.",
            "sad lads add salt."
        ]
    },

    {
        id: 2,
        name: "Easy Words",
        xp: 100,
        desc: "Practice common everyday words.",

        texts: [
            "school student teacher computer keyboard",
            "morning evening family friend people",
            "happy simple small large strong quick",
            "water paper table window garden",
            "practice typing every single day"
        ]
    },

    {
        id: 3,
        name: "Sentences",
        xp: 250,
        desc: "Build accuracy with normal sentences.",

        texts: [
            "The sun rises in the east every morning.",
            "Students use computers for study and learning.",
            "Regular practice can improve your typing speed.",
            "Keep your fingers relaxed and look at the screen.",
            "Accuracy is more important than speed at the beginning."
        ]
    },

    {
        id: 4,
        name: "Intermediate",
        xp: 500,
        desc: "Longer sentences and punctuation.",

        texts: [
            "Learning to type quickly requires regular practice and concentration.",
            "A good typist maintains accuracy while gradually increasing speed.",
            "Computer skills are useful for students, professionals, and businesses.",
            "Do not worry about mistakes. Learn from them and continue practicing.",
            "A steady typing rhythm will help you become faster and more confident."
        ]
    },

    {
        id: 5,
        name: "Advanced",
        xp: 900,
        desc: "Professional typing passages.",

        texts: [
            "Technology has changed the way students learn, communicate, and complete their daily work.",
            "Successful typing requires concentration, correct finger placement, accuracy, and consistent practice.",
            "Professional computer users should type documents accurately while maintaining a comfortable speed."
        ]
    },

    {
        id: 6,
        name: "Exam Level",
        xp: 1500,
        desc: "Competitive examination style practice.",

        texts: [
            "Government offices require employees to prepare letters, reports, applications, notices, and official documents accurately.",
            "Candidates preparing for competitive examinations should develop typing speed without compromising accuracy and concentration.",
            "Data entry work requires careful attention because even a small typing mistake can change important information."
        ]
    },

    {
        id: 7,
        name: "Pro Challenge",
        xp: 2500,
        desc: "Hard passages for advanced typists.",

        texts: [
            "Professional typing demands accuracy, concentration, punctuation control, vocabulary knowledge, and a consistent rhythm.",
            "Fast typing is not simply about pressing keys quickly; it is about maintaining reliable speed while producing accurate text.",
            "A disciplined practice routine can improve finger coordination, reduce unnecessary pauses, and increase confidence."
        ]
    }

];


let selectedLevel = 1;


function updateUnlockedLevels() {

    let highest = 1;

    levels.forEach(level => {

        if (data.xp >= level.xp) {
            highest = level.id;
        }

    });

    data.unlockedLevel = highest;

    saveData();

}


function isLevelUnlocked(id) {

    return id <= data.unlockedLevel;

}


function renderLevels() {

    const bar = $("levelBar");

    if (!bar) return;

    bar.innerHTML = "";

    levels.forEach(level => {

        const unlocked =
            isLevelUnlocked(level.id);

        const button =
            document.createElement("button");

        button.className = "levelbtn";

        if (level.id === selectedLevel) {
            button.classList.add("active");
        }

        if (!unlocked) {

            button.classList.add("locked");
            button.disabled = true;

        }

        button.innerHTML = `
            Level ${level.id}
            <small>
                ${
                    unlocked
                        ? level.name
                        : "🔒 " + level.xp + " XP"
                }
            </small>
        `;

        button.onclick = () => {

            selectedLevel = level.id;

            startTypingTest();

            renderLevels();

        };

        bar.appendChild(button);

    });


    const current =
        levels[selectedLevel - 1];

    if ($("levelTitle")) {

        $("levelTitle").textContent =
            `Level ${current.id} · ${current.name}`;

    }

    if ($("levelDescription")) {

        $("levelDescription").textContent =
            current.desc;

    }

    if ($("levelStatus")) {

        $("levelStatus").textContent =
            "✓ Unlocked";

    }

}


/* =========================================================
   NORMAL TYPING ENGINE
   ========================================================= */

let typing = {

    text: "",
    timeLeft: 60,
    timer: null,
    started: false,
    finished: false,
    examMode: false

};


function randomItem(array) {

    return array[
        Math.floor(
            Math.random() * array.length
        )
    ];

}


/* =========================================================
   IMPORTANT SPACE FIX
   ========================================================= */

function displayText(value = "") {

    const box = $("typingText");

    if (!box) return;

    box.innerHTML = "";

    [...typing.text]
        .forEach((character, index) => {

            const span =
                document.createElement("span");

            span.textContent = character;

            /* SPACE FIX */
            if (character === " ") {
                span.classList.add("space");
            }

            if (index < value.length) {

                span.classList.add(
                    value[index] === character
                        ? "correct"
                        : "wrong"
                );

            }

            if (
                index === value.length &&
                !typing.finished
            ) {

                span.classList.add("current");

            }

            box.appendChild(span);

        });

}


/* =========================================================
   CALCULATE STATS
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
        } else {
            errors++;
        }

    }


    const duration =
        Math.max(
            1,
            Number($("duration")?.value || 60)
            - typing.timeLeft
        );


    const wpm =
        Math.round(
            (correct / 5) /
            (duration / 60)
        ) || 0;


    const accuracy =
        value.length === 0
            ? 100
            : Math.round(
                correct /
                value.length *
                100
            );


    if ($("wpm")) {
        $("wpm").textContent = wpm;
    }

    if ($("acc")) {
        $("acc").textContent =
            accuracy + "%";
    }

    if ($("errors")) {
        $("errors").textContent =
            errors;
    }


    return {
        wpm,
        accuracy,
        errors
    };

}


/* =========================================================
   START NORMAL TEST
   ========================================================= */

function startTypingTest() {

    clearInterval(typing.timer);

    if (
        !isLevelUnlocked(selectedLevel)
    ) {

        selectedLevel =
            data.unlockedLevel;

    }


    const level =
        levels[selectedLevel - 1];


    typing.text =
        randomItem(level.texts);

    typing.timeLeft =
        Number($("duration")?.value || 60);

    typing.started = false;
    typing.finished = false;
    typing.examMode = false;


    if ($("time")) {
        $("time").textContent =
            typing.timeLeft;
    }

    if ($("typingInput")) {

        $("typingInput").value = "";
        $("typingInput").disabled = false;

    }

    if ($("status")) {
        $("status").textContent = "Ready";
    }

    $("result")?.classList.add("hidden");

    displayText();

    calculateStats("");

    renderLevels();

}


/* =========================================================
   TIMER
   ========================================================= */

function startTimer() {

    if (typing.started) return;

    typing.started = true;

    if ($("status")) {
        $("status").textContent = "Typing...";
    }

    typing.timer =
        setInterval(() => {

            typing.timeLeft--;

            if ($("time")) {
                $("time").textContent =
                    typing.timeLeft;
            }

            calculateStats(
                $("typingInput")?.value || ""
            );

            if (typing.timeLeft <= 0) {
                finishTypingTest();
            }

        }, 1000);

}


/* =========================================================
   FINISH NORMAL TEST
   ========================================================= */

function finishTypingTest() {

    if (typing.finished) return;

    typing.finished = true;

    clearInterval(typing.timer);

    const value =
        $("typingInput")?.value || "";

    const stats =
        calculateStats(value);


    if ($("typingInput")) {
        $("typingInput").disabled = true;
    }


    const earnedXP =
        Math.max(
            15,
            Math.round(
                stats.wpm * 1.5 +
                stats.accuracy * 0.35 +
                selectedLevel * 5
            )
        );


    data.tests++;

    data.xp += earnedXP;

    data.bestWpm =
        Math.max(
            data.bestWpm,
            stats.wpm
        );

    data.bestAcc =
        Math.max(
            data.bestAcc,
            stats.accuracy
        );


    updateUnlockedLevels();

    saveData();

    updateProfile();


    if ($("status")) {
        $("status").textContent =
            "Completed";
    }


    if ($("resultText")) {

        $("resultText").textContent =
            `Level ${selectedLevel} · ${stats.wpm} WPM · ${stats.accuracy}% Accuracy · +${earnedXP} XP`;

    }

    $("result")?.classList.remove("hidden");

}


/* =========================================================
   TYPING INPUT
   ========================================================= */

if ($("typingInput")) {

    $("typingInput").addEventListener(
        "input",
        () => {

            if (typing.finished) return;

            startTimer();

            const value =
                $("typingInput").value;

            displayText(value);

            calculateStats(value);

            if (
                value.length >=
                typing.text.length
            ) {

                finishTypingTest();

            }

        }
    );

}


/* =========================================================
   BUTTONS
   ========================================================= */

if ($("newTest")) {
    $("newTest").onclick =
        startTypingTest;
}

if ($("again")) {
    $("again").onclick =
        startTypingTest;
}

if ($("duration")) {

    $("duration").onchange =
        startTypingTest;

}


/* =========================================================
   PRACTICE MODE
   ========================================================= */

if ($("mode")) {

    $("mode").onchange = () => {

        const mode =
            $("mode").value;

        if (mode === "beginner") {

            selectedLevel = 1;

        }
        else if (mode === "advanced") {

            selectedLevel =
                Math.min(
                    data.unlockedLevel,
                    6
                );

        }
        else {

            selectedLevel =
                Math.min(
                    data.unlockedLevel,
                    3
                );

        }

        startTypingTest();

    };

}


/* =========================================================
   GOVERNMENT EXAM LIST
   IMPORTANT:
   Actual practice passages are NOT stored here.
   Each exam opens its own page/file.
   ========================================================= */

const exams = [

    {
        id: "ssc-chsl",
        category: "ssc",
        tag: "SSC",
        logo: "SSC",
        name: "SSC CHSL",
        target: "LDC / JSA",
        speed: "English / Hindi",
        duration: "10 min",
        sets: "Separate Sets"
    },

    {
        id: "ssc-cgl",
        category: "ssc",
        tag: "SSC",
        logo: "CGL",
        name: "SSC CGL",
        target: "DEST",
        speed: "Data Entry",
        duration: "15 min",
        sets: "Separate Sets"
    },

    {
        id: "railway-typing",
        category: "railway",
        tag: "RAILWAY",
        logo: "RR",
        name: "Railway Typing Test",
        target: "Typing Skill",
        speed: "English / Hindi",
        duration: "10 min",
        sets: "Separate Sets"
    },

    {
        id: "rrb-clerk",
        category: "railway",
        tag: "RRB",
        logo: "RRB",
        name: "RRB Clerk",
        target: "Clerical Practice",
        speed: "English / Hindi",
        duration: "10 min",
        sets: "Separate Sets"
    },

    {
        id: "upsssc-junior-assistant",
        category: "other",
        tag: "UPSSSC",
        logo: "UP",
        name: "UPSSSC Junior Assistant",
        target: "Typing Practice",
        speed: "Hindi / English",
        duration: "10 min",
        sets: "Separate Sets"
    },

    {
        id: "government-clerk",
        category: "other",
        tag: "GOVT",
        logo: "GOV",
        name: "Government Clerk Mock",
        target: "Clerk / Assistant",
        speed: "30–40 WPM",
        duration: "10 min",
        sets: "Separate Sets"
    }

];


/* =========================================================
   EXAM CARDS
   ========================================================= */

function renderExams() {

    const list = $("examList");

    if (!list) return;

    const query =
        ($("search")?.value || "")
            .toLowerCase()
            .trim();

    const category =
        $("cat")?.value || "all";


    const filtered =
        exams.filter(exam => {

            const matchesSearch =
                (
                    exam.name +
                    " " +
                    exam.target +
                    " " +
                    exam.tag
                )
                .toLowerCase()
                .includes(query);

            const matchesCategory =
                category === "all" ||
                exam.category === category;

            return (
                matchesSearch &&
                matchesCategory
            );

        });


    list.innerHTML = filtered
        .map(exam => `

            <article class="exam">

                <div class="examtop">

                    <div class="exam-logo">
                        ${exam.logo}
                    </div>

                    <span class="badge">
                        ${exam.tag}
                    </span>

                </div>

                <h3>
                    ${exam.name}
                </h3>

                <p>
                    ${exam.target} typing practice
                    with separate editable practice sets.
                </p>

                <div class="specs">

                    <div class="spec">
                        <small>Target</small>
                        <b>${exam.speed}</b>
                    </div>

                    <div class="spec">
                        <small>Duration</small>
                        <b>${exam.duration}</b>
                    </div>

                    <div class="spec">
                        <small>Sets</small>
                        <b>${exam.sets}</b>
                    </div>

                </div>

                <button
                    class="btn primary examPractice"
                    data-exam="${exam.id}">

                    Open Practice →

                </button>

            </article>

        `)
        .join("");


    document
        .querySelectorAll(".examPractice")
        .forEach(button => {

            button.onclick = () => {

                const examId =
                    button.dataset.exam;

                openExamPractice(examId);

            };

        });


    if (!filtered.length) {

        list.innerHTML = `
            <div class="notice">
                No examination found.
            </div>
        `;

    }

}


/* =========================================================
   OPEN DEDICATED EXAM PAGE
   ========================================================= */

function openExamPractice(examId) {

    window.location.href =
        "exam-practice.html?exam=" +
        encodeURIComponent(examId) +
        "&set=1";

}


if ($("search")) {
    $("search").oninput = renderExams;
}

if ($("cat")) {
    $("cat").onchange = renderExams;
}


/* =========================================================
   TYPING GAME
   ========================================================= */

const gameWords = [
    "keyboard",
    "typing",
    "computer",
    "school",
    "student",
    "practice",
    "accuracy",
    "speed",
    "government",
    "website",
    "coding",
    "javascript",
    "future",
    "career",
    "success",
    "learning",
    "challenge",
    "professional",
    "concentration",
    "document",
    "application",
    "punctuation",
    "consistency",
    "development",
    "technology"
];


let game = {

    running: false,
    time: 60,
    score: 0,
    combo: 0,
    word: "",
    timer: null

};


function nextGameWord() {

    game.word =
        randomItem(gameWords);

    if ($("word")) {
        $("word").textContent =
            game.word;
    }

    if ($("gameInput")) {

        $("gameInput").value = "";
        $("gameInput").focus();

    }

}


function startGame() {

    clearInterval(game.timer);

    game.running = true;
    game.time = 60;
    game.score = 0;
    game.combo = 0;


    if ($("gtime")) {
        $("gtime").textContent = "60";
    }

    if ($("score")) {
        $("score").textContent = "0";
    }

    if ($("combo")) {
        $("combo").textContent = "0×";
    }


    $("overlay")?.classList.add("hidden");


    if ($("gameInput")) {
        $("gameInput").disabled = false;
    }

    if ($("submitGame")) {
        $("submitGame").disabled = false;
    }


    nextGameWord();


    game.timer =
        setInterval(() => {

            game.time--;

            if ($("gtime")) {
                $("gtime").textContent =
                    game.time;
            }

            if (game.time <= 0) {
                endGame();
            }

        }, 1000);

}


function submitGameWord() {

    if (!game.running) return;

    const value =
        $("gameInput")
            ?.value
            .trim()
            .toLowerCase();

    if (!value) return;


    if (value === game.word) {

        game.combo++;

        game.score +=
            10 +
            Math.min(
                20,
                game.combo * 2
            );


        if ($("score")) {
            $("score").textContent =
                game.score;
        }

        if ($("combo")) {
            $("combo").textContent =
                game.combo + "×";
        }

        nextGameWord();

    }
    else {

        game.combo = 0;

        if ($("combo")) {
            $("combo").textContent =
                "0×";
        }

        if ($("gameInput")) {
            $("gameInput").value = "";
        }

    }

}


function endGame() {

    if (!game.running) return;

    game.running = false;

    clearInterval(game.timer);


    if ($("gameInput")) {
        $("gameInput").disabled = true;
    }

    if ($("submitGame")) {
        $("submitGame").disabled = true;
    }


    const earnedXP =
        Math.max(
            10,
            Math.round(game.score / 3)
        );


    data.xp += earnedXP;

    data.gameBest =
        Math.max(
            data.gameBest,
            game.score
        );


    updateUnlockedLevels();

    saveData();

    updateProfile();


    if ($("overlay")) {

        $("overlay").classList.remove("hidden");

        $("overlay").innerHTML = `

            <div>

                <div style="font-size:45px">
                    🏁
                </div>

                <h3>
                    Game Over
                </h3>

                <p>
                    Score:
                    <b>${game.score}</b>
                </p>

                <p>
                    +${earnedXP} XP
                </p>

                <button
                    id="playAgain"
                    class="btn primary">

                    Play Again

                </button>

            </div>
        `;

        $("playAgain").onclick =
            startGame;

    }

}


if ($("startGame")) {
    $("startGame").onclick = startGame;
}

if ($("submitGame")) {
    $("submitGame").onclick = submitGameWord;
}


if ($("gameInput")) {

    $("gameInput").addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                submitGameWord();

            }

        }
    );

}


/* =========================================================
   INITIALIZE
   ========================================================= */

updateUnlockedLevels();
updateProfile();
renderLevels();
renderExams();
// =====================================================
// XP → RANK SYSTEM
// =====================================================

function getRankFromXP(xp) {

    if (xp >= 10000) {
        return "Master";
    }

    if (xp >= 6000) {
        return "Diamond";
    }

    if (xp >= 3000) {
        return "Platinum";
    }

    if (xp >= 1500) {
        return "Gold";
    }

    if (xp >= 500) {
        return "Silver";
    }

    return "Bronze";
}


// =====================================================
// UPDATE RANK
// =====================================================

function updateRank() {

    const oldRank =
        data.rank || "Bronze";

    const newRank =
        getRankFromXP(
            Number(data.xp) || 0
        );


    data.rank = newRank;


    // Rank बदलने पर
    if (oldRank !== newRank) {

        console.log(
            `Rank Up: ${oldRank} → ${newRank}`
        );

        showRankUp(newRank);
    }


    // Firebase + local save
    saveData();

    updateProfile();
}


// =====================================================
// RANK CELEBRATION
// =====================================================

function showRankUp(rank) {

    // अगर पहले से celebration है तो remove करो
    document
        .getElementById("rankCelebration")
        ?.remove();


    const celebration =
        document.createElement("div");

    celebration.id =
        "rankCelebration";

    celebration.innerHTML = `

        <div class="rank-celebration-box">

            <div class="rank-celebration-icon">
                🏆
            </div>

            <div class="rank-celebration-small">
                RANK UP!
            </div>

            <h2>
                ${rank}
            </h2>

            <p>
                Congratulations! 🎉
            </p>

        </div>

    `;


    document.body.appendChild(
        celebration
    );


    setTimeout(() => {

        celebration.classList.add(
            "hide"
        );

    }, 3000);


    setTimeout(() => {

        celebration.remove();

    }, 3500);
}
/* =========================================================
   OPEN HOME DIRECTLY
   ========================================================= */

const urlParams =
    new URLSearchParams(
        window.location.search
    );

if (
    urlParams.get("home") === "1"
) {

    const intro =
        $("intro");

    const app =
        $("app");


    // Intro ko hata do
    if (intro) {

        intro.remove();

    }


    // Main website dikhao
    if (app) {

        app.classList.remove(
            "hidden"
        );

    }


    // Home page open karo
    openPage(
        "home"
    );

}
/* =================================================
   FEEDBACK FORM
================================================= */

const feedbackBtn =
    document.getElementById("feedbackBtn");

const feedbackModal =
    document.getElementById("feedbackModal");

const closeFeedback =
    document.getElementById("closeFeedback");

const feedbackForm =
    document.getElementById("feedbackForm");


if (feedbackBtn) {

    feedbackBtn.onclick = () => {

        feedbackModal?.classList.remove("hidden");

    };

}


if (closeFeedback) {

    closeFeedback.onclick = () => {

        feedbackModal?.classList.add("hidden");

    };

}


if (feedbackModal) {

    feedbackModal.addEventListener(
        "click",
        (event) => {

            if (event.target === feedbackModal) {

                feedbackModal.classList.add("hidden");

            }

        }
    );

}


if (feedbackForm) {

    feedbackForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

            const name =
                document
                    .getElementById("feedbackName")
                    .value
                    .trim();

            const email =
                document
                    .getElementById("feedbackEmail")
                    .value
                    .trim();

            const message =
                document
                    .getElementById("feedbackMessage")
                    .value
                    .trim();


            const subject =
                encodeURIComponent(
                    "Feedback - Typing Area"
                );


            const body =
                encodeURIComponent(
                    `Name: ${name}\n` +
                    `Email: ${email}\n\n` +
                    `Feedback:\n${message}`
                );


            const gmailURL =
                `https://mail.google.com/mail/?view=cm&fs=1&to=iamthebestsidd0001@gmail.com&su=${subject}&body=${body}`;


            window.open(
                gmailURL,
                "_blank"
            );


            feedbackForm.reset();

            feedbackModal.classList.add(
                "hidden"
            );

        }
    );

}