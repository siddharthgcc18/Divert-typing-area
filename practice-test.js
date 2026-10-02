/* =========================================================
   NORMAL TYPING PRACTICE ENGINE
   TYPING AREA BY SIDDHU
========================================================= */


/* =========================================================
   STORAGE
========================================================= */

const USER_KEY = "tasData";

const PROGRESS_KEY =
    "normalTypingProgress";


let userData =
    JSON.parse(
        localStorage.getItem(USER_KEY)
        || "null"
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


let progress =
    JSON.parse(
        localStorage.getItem(PROGRESS_KEY)
        || "null"
    ) || {

        unlockedLevel: 1,

        completedLevels: [],

        bestResults: {}

    };


function saveAll() {

    localStorage.setItem(
        USER_KEY,
        JSON.stringify(userData)
    );

    localStorage.setItem(
        PROGRESS_KEY,
        JSON.stringify(progress)
    );

}


/* =========================================================
   NORMAL LEVELS
========================================================= */

const LEVELS = [

    {
        level: 1,
        name: "Home Row",
        keys: "ASDF JKL;",
        targetWPM: 20,
        accuracy: 90,
        duration: 60,
        difficulty: "Beginner",

        words: [
            "sad",
            "dad",
            "fad",
            "lad",
            "fall",
            "all",
            "ask",
            "add",
            "flag",
            "glass",
            "lass",
            "jag",
            "salad",
            "flask",
            "fall"
        ]
    },


    {
        level: 2,
        name: "E + I",
        keys: "ASDF JKL; E I",
        targetWPM: 22,
        accuracy: 91,
        duration: 60,
        difficulty: "Beginner",

        words: [
            "side",
            "file",
            "like",
            "life",
            "sale",
            "safe",
            "idea",
            "field",
            "lease",
            "ideal",
            "slide",
            "lie",
            "said",
            "fill",
            "seal",
            "is"
        ]
    },


    {
        level: 3,
        name: "R + U",
        keys: "ASDF JKL; E I R U",
        targetWPM: 24,
        accuracy: 92,
        duration: 60,
        difficulty: "Beginner",

        words: [
            "rule",
            "ride",
            "read",
            "real",
            "rise",
            "sure",
            "user",
            "use",
            "fire",
            "free",
            "fair",
            "rush",
            "rural",
            "usual",
            "safe",
            "side"
        ]
    },


    {
        level: 4,
        name: "T + Y",
        keys: "ASDF JKL; E I R U T Y",
        targetWPM: 26,
        accuracy: 93,
        duration: 60,
        difficulty: "Basic",

        words: [
            "try",
            "type",
            "true",
            "style",
            "early",
            "reply",
            "result",
            "really",
            "daily",
            "study",
            "ready",
            "stay",
            "story",
            "safety",
            "utility",
            "pretty"
        ]
    },


    {
        level: 5,
        name: "N + H",
        keys: "ASDF JKL; E I R U T Y N H",
        targetWPM: 28,
        accuracy: 94,
        duration: 60,
        difficulty: "Basic",

        words: [
            "than",
            "then",
            "their",
            "there",
            "three",
            "train",
            "north",
            "think",
            "thing",
            "right",
            "night",
            "learn",
            "health",
            "near",
            "nature",
            "honest"
        ]
    },


    {
        level: 6,
        name: "O + C",
        keys: "ASDF JKL; E I R U T Y N H O C",
        targetWPM: 30,
        accuracy: 95,
        duration: 60,
        difficulty: "Basic",

        words: [
            "choice",
            "school",
            "office",
            "correct",
            "action",
            "country",
            "company",
            "control",
            "create",
            "record",
            "clean",
            "order",
            "cost",
            "notice",
            "teacher",
            "customer"
        ]
    },


    {
        level: 7,
        name: "G + P",
        keys: "ASDF JKL; E I R U T Y N H O C G P",
        targetWPM: 32,
        accuracy: 96,
        duration: 60,
        difficulty: "Intermediate",

        words: [
            "group",
            "program",
            "progress",
            "typing",
            "practice",
            "people",
            "page",
            "language",
            "prepare",
            "proper",
            "period",
            "government",
            "change",
            "input",
            "graph",
            "report"
        ]
    },


    {
        level: 8,
        name: "V + B",
        keys: "ASDF JKL; E I R U T Y N H O C G P V B",
        targetWPM: 34,
        accuracy: 97,
        duration: 60,
        difficulty: "Intermediate",

        words: [
            "above",
            "value",
            "every",
            "available",
            "behavior",
            "believe",
            "provide",
            "improve",
            "service",
            "number",
            "subject",
            "public",
            "valuable",
            "problem",
            "observe",
            "business"
        ]
    },


    {
        level: 9,
        name: "W + M",
        keys: "ASDF JKL; E I R U T Y N H O C G P V B W M",
        targetWPM: 36,
        accuracy: 97,
        duration: 60,
        difficulty: "Intermediate",

        words: [
            "woman",
            "welcome",
            "website",
            "world",
            "work",
            "window",
            "modern",
            "system",
            "maximum",
            "minimum",
            "message",
            "movement",
            "remember",
            "always",
            "between",
            "important"
        ]
    },


    {
        level: 10,
        name: "Q + X",
        keys: "A–Z + Q + X",
        targetWPM: 38,
        accuracy: 98,
        duration: 60,
        difficulty: "Advanced",

        words: [
            "quick",
            "quality",
            "question",
            "example",
            "exact",
            "excellent",
            "experience",
            "extra",
            "maximum",
            "equal",
            "quite",
            "require",
            "complex",
            "sequence",
            "explain"
        ]
    },


    {
        level: 11,
        name: "Z + Punctuation",
        keys: "A–Z + Z + punctuation",
        targetWPM: 40,
        accuracy: 98,
        duration: 60,
        difficulty: "Advanced",

        words: [
            "amazing,",
            "zero,",
            "organization.",
            "accuracy.",
            "practice,",
            "consistent.",
            "recognize,",
            "final.",
            "progress,",
            "exercise.",
            "keyboard,",
            "comfortable.",
            "professional,",
            "efficient."
        ]
    },


    {
        level: 12,
        name: "Full Keyboard",
        keys: "Full Keyboard + punctuation",
        targetWPM: 42,
        accuracy: 98,
        duration: 60,
        difficulty: "Pro",

        words: [
            "Professional typing requires accuracy, speed, focus, and consistency.",
            "A reliable typist can maintain rhythm while handling words, numbers, and punctuation.",
            "Computer skills are useful for study, office work, communication, and professional development.",
            "Accuracy should remain high even when typing speed increases during a timed test."
        ]
    }

];


/* =========================================================
   CURRENT LEVEL
========================================================= */

let currentLevel =
    Number(
        new URLSearchParams(
            window.location.search
        ).get("level")
    ) || 1;


function getUnlockedLevel() {

    return Math.max(
        1,
        Math.min(
            LEVELS.length,
            Number(
                progress.unlockedLevel || 1
            )
        )
    );

}


if (
    currentLevel >
    getUnlockedLevel()
) {

    currentLevel =
        getUnlockedLevel();

}


/* =========================================================
   ELEMENTS
========================================================= */

const examTitle =
    document.getElementById(
        "examTitle"
    );

const examTag =
    document.getElementById(
        "examTag"
    );

const examLogo =
    document.getElementById(
        "examLogo"
    );

const examDescription =
    document.getElementById(
        "examDescription"
    );

const selectorLabel =
    document.getElementById(
        "selectorLabel"
    );

const setSelect =
    document.getElementById(
        "setSelect"
    );

const levelProgressTitle =
    document.getElementById(
        "levelProgressTitle"
    );

const unlockMessage =
    document.getElementById(
        "unlockMessage"
    );

const levelTrack =
    document.getElementById(
        "levelTrack"
    );

const keys =
    document.getElementById(
        "keys"
    );

const targetDisplay =
    document.getElementById(
        "targetDisplay"
    );

const accuracyTarget =
    document.getElementById(
        "accuracyTarget"
    );

const setName =
    document.getElementById(
        "setName"
    );

const difficulty =
    document.getElementById(
        "difficulty"
    );

const durationLabel =
    document.getElementById(
        "durationLabel"
    );

const target =
    document.getElementById(
        "target"
    );

const time =
    document.getElementById(
        "time"
    );

const wpm =
    document.getElementById(
        "wpm"
    );

const accuracy =
    document.getElementById(
        "accuracy"
    );

const errors =
    document.getElementById(
        "errors"
    );

const status =
    document.getElementById(
        "status"
    );

const statusDot =
    document.getElementById(
        "statusDot"
    );

const passage =
    document.getElementById(
        "passage"
    );

const input =
    document.getElementById(
        "input"
    );

const result =
    document.getElementById(
        "result"
    );

const resultTitle =
    document.getElementById(
        "resultTitle"
    );

const resultText =
    document.getElementById(
        "resultText"
    );

const requirementResult =
    document.getElementById(
        "requirementResult"
    );

const retry =
    document.getElementById(
        "retry"
    );

const finish =
    document.getElementById(
        "finish"
    );

const nextLevel =
    document.getElementById(
        "nextLevel"
    );

const progressBtn =
    document.getElementById(
        "progressBtn"
    );

const roadmapBtn =
    document.getElementById(
        "roadmapBtn"
    );


/* =========================================================
   TEST STATE
========================================================= */

let test = {

    text: "",

    started: false,

    finished: false,

    remaining: 60,

    timer: null,

    startTime: null

};


/* =========================================================
   RANDOM WORDS
========================================================= */

function randomItem(array) {

    return array[
        Math.floor(
            Math.random() *
            array.length
        )
    ];

}


/* =========================================================
   BUILD PASSAGE
========================================================= */

function buildText(level) {

    if (
        level.level === 12
    ) {

        return randomItem(
            level.words
        );

    }


    const list = [];

    const count =
        45 +
        level.level * 4;


    for (
        let i = 0;
        i < count;
        i++
    ) {

        list.push(
            randomItem(
                level.words
            )
        );

    }


    return list.join(" ");

}


/* =========================================================
   LOAD LEVEL
========================================================= */

function loadLevel(levelNumber) {

    const unlocked =
        getUnlockedLevel();


    if (
        levelNumber >
        unlocked
    ) {

        levelNumber =
            unlocked;

    }


    currentLevel =
        Math.max(
            1,
            Math.min(
                LEVELS.length,
                levelNumber
            )
        );


    const level =
        LEVELS[
            currentLevel - 1
        ];


    test.text =
        buildText(level);


    test.started =
        false;

    test.finished =
        false;

    test.startTime =
        null;


    test.remaining =
        level.duration;


    clearInterval(
        test.timer
    );


    test.timer =
        null;


    updateLevelInfo();

    renderLevelSelector();

    renderLevelTrack();

    renderRoadmap();


    renderPassage("");

    resetUI();

    updateProgressModal();

}


/* =========================================================
   LEVEL UI
========================================================= */

function updateLevelInfo() {

    const level =
        LEVELS[
            currentLevel - 1
        ];


    examTitle.textContent =
        "Normal Typing Practice";


    examTag.textContent =
        "NORMAL PRACTICE";


    examLogo.textContent =
        "⌨";


    examDescription.textContent =
        "Build your typing ability from the home row to full-keyboard confidence.";


    selectorLabel.textContent =
        "SELECT LEVEL";


    levelProgressTitle.textContent =
        `Level ${level.level} · ${level.name}`;


    unlockMessage.textContent =
        `Target: ${level.targetWPM} WPM + ${level.accuracy}% accuracy`;


    keys.textContent =
        level.keys;


    targetDisplay.textContent =
        level.targetWPM +
        " WPM";


    accuracyTarget.textContent =
        level.accuracy +
        "%";


    setName.textContent =
        `Level ${level.level}`;


    difficulty.textContent =
        level.difficulty;


    durationLabel.textContent =
        "60 sec";


    target.textContent =
        level.targetWPM +
        " WPM";

}


/* =========================================================
   LEVEL SELECT
========================================================= */

function renderLevelSelector() {

    setSelect.innerHTML = "";


    LEVELS.forEach(level => {

        const option =
            document.createElement(
                "option"
            );


        const unlocked =
            level.level <=
            getUnlockedLevel();


        option.value =
            level.level;


        option.textContent =
            unlocked

                ? `Level ${level.level} · ${level.name}`

                : `🔒 Level ${level.level} · ${level.targetWPM} WPM`;


        option.disabled =
            !unlocked;


        setSelect.appendChild(
            option
        );

    });


    setSelect.value =
        currentLevel;


    setSelect.onchange = () => {

        const value =
            Number(
                setSelect.value
            );


        if (
            value <=
            getUnlockedLevel()
        ) {

            loadLevel(
                value
            );

        }

    };

}


/* =========================================================
   LEVEL TRACK
========================================================= */

function renderLevelTrack() {

    levelTrack.innerHTML = "";


    LEVELS.forEach(level => {

        const div =
            document.createElement(
                "div"
            );


        div.className =
            "level-step";


        if (
            level.level <
            currentLevel
        ) {

            div.classList.add(
                "unlocked"
            );

        }


        if (
            level.level ===
            currentLevel
        ) {

            div.classList.add(
                "current"
            );

        }


        levelTrack.appendChild(
            div
        );

    });

}


/* =========================================================
   ROADMAP
========================================================= */

function renderRoadmap() {

    const modalRoadmap =
        document.getElementById(
            "modalRoadmap"
        );


    if (!modalRoadmap)
        return;


    modalRoadmap.innerHTML = "";


    const unlocked =
        getUnlockedLevel();


    LEVELS.forEach(level => {

        const item =
            document.createElement(
                "div"
            );


        item.className =
            "modal-roadmap-item";


        if (
            level.level ===
            currentLevel
        ) {

            item.classList.add(
                "current"
            );

        }


        if (
            level.level <
            currentLevel
        ) {

            item.classList.add(
                "done"
            );

        }


        if (
            level.level >
            unlocked
        ) {

            item.classList.add(
                "locked"
            );

        }


        item.innerHTML = `

            <div class="modal-roadmap-number">
                LEVEL ${level.level}
            </div>

            <strong>
                ${level.name}
            </strong>

            <span>
                ${level.targetWPM} WPM
                · ${level.accuracy}% accuracy
            </span>

            <span>
                ${level.keys}
            </span>

        `;


        modalRoadmap.appendChild(
            item
        );

    });

}


/* =========================================================
   PASSAGE
========================================================= */

function renderPassage(value) {

    passage.innerHTML = "";


    [...test.text]
        .forEach(
            (char, index) => {

                const span =
                    document.createElement(
                        "span"
                    );


                span.textContent =
                    char;


                if (
                    char === " "
                ) {

                    span.classList.add(
                        "space"
                    );

                }


                if (
                    index <
                    value.length
                ) {

                    span.classList.add(

                        value[index] === char
                            ? "correct"
                            : "wrong"

                    );

                }


                if (
                    index ===
                    value.length &&
                    !test.finished
                ) {

                    span.classList.add(
                        "current"
                    );

                }


                passage.appendChild(
                    span
                );

            }
        );

}


/* =========================================================
   RESET
========================================================= */

function resetUI() {

    clearInterval(
        test.timer
    );


    test.timer =
        null;


    time.textContent =
        formatTime(
            test.remaining
        );


    wpm.textContent =
        "0";


    accuracy.textContent =
        "100%";


    errors.textContent =
        "0";


    status.textContent =
        "Ready";


    statusDot.className =
        "live-dot";


    input.value =
        "";


    input.disabled =
        false;


    finish.disabled =
        false;


    result.classList.add(
        "hidden"
    );


    nextLevel.classList.add(
        "hidden"
    );


    input.focus();

}


/* =========================================================
   TIMER
========================================================= */

function startTimer() {

    if (test.started)
        return;


    test.started =
        true;


    test.startTime =
        Date.now();


    status.textContent =
        "Typing...";


    test.timer =
        setInterval(
            () => {

                test.remaining--;


                time.textContent =
                    formatTime(
                        test.remaining
                    );


                updateStats();


                if (
                    test.remaining <=
                    0
                ) {

                    finishTest();

                }

            },
            1000
        );

}


/* =========================================================
   STATS
========================================================= */

function getStats() {

    const value =
        input.value;


    let correct =
        0;

    let error =
        0;


    for (
        let i = 0;
        i < value.length;
        i++
    ) {

        if (
            value[i] ===
            test.text[i]
        ) {

            correct++;

        }
        else {

            error++;

        }

    }


    let elapsed =
        1;


    if (
        test.started &&
        test.startTime
    ) {

        elapsed =
            Math.max(
                1,
                (
                    Date.now() -
                    test.startTime
                ) / 1000
            );

    }


    const speed =
        Math.round(
            (
                correct / 5
            ) /
            (
                elapsed / 60
            )
        ) || 0;


    const acc =
        value.length
            ? Math.round(
                correct /
                value.length *
                100
            )
            : 100;


    return {

        wpm:
            speed,

        accuracy:
            acc,

        errors:
            error

    };

}


function updateStats() {

    const stats =
        getStats();


    wpm.textContent =
        stats.wpm;


    accuracy.textContent =
        stats.accuracy +
        "%";


    errors.textContent =
        stats.errors;

}


/* =========================================================
   INPUT
========================================================= */

input.addEventListener(
    "input",
    () => {

        if (
            test.finished
        ) return;


        startTimer();


        renderPassage(
            input.value
        );


        updateStats();


        if (
            input.value.length >=
            test.text.length
        ) {

            finishTest();

        }

    }
);


/* =========================================================
   XP
========================================================= */

function calculateXP(
    stats,
    level
) {

    const base =
        Math.round(
            stats.wpm * 1.4 +
            stats.accuracy * .35
        );


    const levelBonus =
        level * 8;


    const targetBonus =
        (
            stats.wpm >=
            LEVELS[level - 1].targetWPM
            &&
            stats.accuracy >=
            LEVELS[level - 1].accuracy
        )
            ? 20
            : 0;


    return Math.max(
        15,
        Math.min(
            160,
            base +
            levelBonus +
            targetBonus
        )
    );

}


/* =========================================================
   FINISH
========================================================= */

function finishTest() {

    if (test.finished) return;

    test.finished = true;

    clearInterval(test.timer);

    test.timer = null;


    const typedText =
        input.value.trim();


    const stats =
        getStats();


    const level =
        LEVELS[
            currentLevel - 1
        ];


    /* =====================================================
       EMPTY TEST PROTECTION

       User typed nothing:
       - No XP
       - No test count
       - No level unlock
       - No best score update
    ===================================================== */

    if (typedText.length === 0) {

        input.disabled = true;

        finish.disabled = true;

        status.textContent =
            "No attempt";


        result.classList.remove(
            "hidden"
        );


        resultTitle.textContent =
            "No Attempt";


        resultText.textContent =
            "0 WPM · 100% accuracy · 0 errors · +0 XP";


        requirementResult.textContent =
            "Type the passage before finishing the test. No XP is awarded for an empty attempt.";


        nextLevel.classList.add(
            "hidden"
        );


        return;

    }


    /* =====================================================
       REAL ATTEMPT
    ===================================================== */

    const passed =
        stats.wpm >=
        level.targetWPM
        &&
        stats.accuracy >=
        level.accuracy;


    const oldRank =
        getRank(
            userData.xp
        );


    /* =====================================================
       XP

       XP is based mainly on actual typed work.
       Empty attempts are handled above.
    ===================================================== */

    let earnedXP =
        Math.round(
            stats.wpm * 1.4 +
            stats.accuracy * 0.20
        );


    /*
       Small participation XP only when
       the user actually typed something.
    */

    earnedXP =
        Math.max(
            5,
            earnedXP
        );


    /*
       Level-clear bonus
    */

    if (passed) {

        earnedXP += 20;

    }


    /*
       Prevent excessive XP
    */

    earnedXP =
        Math.min(
            160,
            earnedXP
        );


    /* =====================================================
       SAVE ACCOUNT STATS
    ===================================================== */

    userData.tests =
        Number(
            userData.tests || 0
        ) + 1;


    userData.bestWpm =
        Math.max(
            Number(
                userData.bestWpm || 0
            ),
            stats.wpm
        );


    userData.bestAcc =
        Math.max(
            Number(
                userData.bestAcc || 0
            ),
            stats.accuracy
        );


    userData.xp =
        Number(
            userData.xp || 0
        ) +
        earnedXP;


    /* =====================================================
       SAVE BEST RESULT FOR THIS LEVEL
    ===================================================== */

    const oldBest =
        progress.bestResults[
            currentLevel
        ];


    if (
        !oldBest ||
        stats.wpm > oldBest.wpm ||
        stats.accuracy > oldBest.accuracy
    ) {

        progress.bestResults[
            currentLevel
        ] = {

            wpm:
                stats.wpm,

            accuracy:
                stats.accuracy,

            errors:
                stats.errors

        };

    }


    /* =====================================================
       LEVEL UNLOCK
       BOTH CONDITIONS REQUIRED
    ===================================================== */

    let newlyUnlocked =
        false;


    if (
        passed &&
        currentLevel <
        LEVELS.length
    ) {

        const next =
            currentLevel + 1;


        if (
            progress.unlockedLevel <
            next
        ) {

            progress.unlockedLevel =
                next;

            newlyUnlocked =
                true;

        }


        if (
            !progress.completedLevels.includes(
                currentLevel
            )
        ) {

            progress.completedLevels.push(
                currentLevel
            );

        }

    }


    /* =====================================================
       SAVE
    ===================================================== */

    saveAll();


    const newRank =
        getRank(
            userData.xp
        );


    /* =====================================================
       UPDATE RESULT UI
    ===================================================== */

    input.disabled = true;

    finish.disabled = true;

    status.textContent =
        "Completed";


    result.classList.remove(
        "hidden"
    );


    resultText.textContent =
        `${stats.wpm} WPM · ${stats.accuracy}% accuracy · ${stats.errors} errors · +${earnedXP} XP`;


    /* =====================================================
       PASSED
    ===================================================== */

    if (passed) {

        if (
            currentLevel <
            LEVELS.length
        ) {

            resultTitle.textContent =
                "Level Cleared! 🎉";


            if (newlyUnlocked) {

                requirementResult.textContent =
                    `Target achieved: ${level.targetWPM} WPM + ${level.accuracy}% accuracy. Level ${currentLevel + 1} is now unlocked.`;

            }
            else {

                requirementResult.textContent =
                    `Target achieved. Level ${currentLevel + 1} is available.`;

            }


            /*
               ONLY NOW show Next Level
            */

            nextLevel.classList.remove(
                "hidden"
            );

        }
        else {

            resultTitle.textContent =
                "Mastery Complete! 👑";


            requirementResult.textContent =
                "You completed the highest Normal Practice level.";

            nextLevel.classList.add(
                "hidden"
            );

        }

    }


    /* =====================================================
       FAILED
    ===================================================== */

    else {

        resultTitle.textContent =
            "Keep Practicing";


        requirementResult.textContent =
            `Required: ${level.targetWPM} WPM + ${level.accuracy}% accuracy. Both targets are required to unlock the next level.`;


        /*
           IMPORTANT:
           Never show Next Level on failure.
        */

        nextLevel.classList.add(
            "hidden"
        );

    }


    /* =====================================================
       UPDATE UI
    ===================================================== */

    renderLevelSelector();

    renderLevelTrack();

    renderRoadmap();

    updateProgressModal();


    /* =====================================================
       RANK UP
    ===================================================== */

    if (
        newRank.name !==
        oldRank.name
    ) {

        setTimeout(
            () => {

                showRankCelebration(
                    newRank,
                    oldRank
                );

            },
            400
        );

    }

}



/* =========================================================
   RANK SYSTEM
========================================================= */

function getRank(xp) {

    if (xp >= 10000) {

        return {
            name: "Master",
            icon: "👑"
        };

    }

    if (xp >= 6000) {

        return {
            name: "Diamond",
            icon: "🔷"
        };

    }

    if (xp >= 3000) {

        return {
            name: "Platinum",
            icon: "💎"
        };

    }

    if (xp >= 1500) {

        return {
            name: "Gold",
            icon: "🥇"
        };

    }

    if (xp >= 500) {

        return {
            name: "Silver",
            icon: "🥈"
        };

    }

    return {
        name: "Bronze",
        icon: "🥉"
    };

}


/* =========================================================
   NEXT LEVEL
========================================================= */

nextLevel.onclick =
    () => {

        const next =
            currentLevel + 1;


        /*
           Safety check
        */

        if (
            next >
            LEVELS.length
        ) return;


        if (
            next >
            getUnlockedLevel()
        ) return;


        window.location.href =
            "practice-test.html?mode=normal&level=" +
            next;

    };


/* =========================================================
   RETRY
========================================================= */

restart.onclick =
    () => {

        loadLevel(
            currentLevel
        );

    };


retry.onclick =
    () => {

        loadLevel(
            currentLevel
        );

    };


finish.onclick =
    () => {

        finishTest();

    };


/* =========================================================
   PROGRESS MODAL
========================================================= */

const progressModal =
    document.getElementById(
        "progressModal"
    );


const modalCurrentLevel =
    document.getElementById(
        "modalCurrentLevel"
    );


const modalUnlockedLevel =
    document.getElementById(
        "modalUnlockedLevel"
    );


const modalBestWpm =
    document.getElementById(
        "modalBestWpm"
    );


const modalBestAccuracy =
    document.getElementById(
        "modalBestAccuracy"
    );


const modalProgressPercent =
    document.getElementById(
        "modalProgressPercent"
    );


const modalProgressBar =
    document.getElementById(
        "modalProgressBar"
    );


function updateProgressModal() {

    const unlocked =
        getUnlockedLevel();


    const percent =
        Math.round(
            unlocked /
            LEVELS.length *
            100
        );


    modalCurrentLevel.textContent =
        `Level ${currentLevel}`;


    modalUnlockedLevel.textContent =
        `Level ${unlocked}`;


    modalBestWpm.textContent =
        userData.bestWpm || 0;


    modalBestAccuracy.textContent =
        (userData.bestAcc || 0) +
        "%";


    modalProgressPercent.textContent =
        percent +
        "%";


    modalProgressBar.style.width =
        percent +
        "%";

}


progressBtn.onclick =
    () => {

        updateProgressModal();

        progressModal.classList.remove(
            "hidden"
        );

    };


/* =========================================================
   ROADMAP MODAL
========================================================= */

const roadmapModal =
    document.getElementById(
        "roadmapModal"
    );


roadmapBtn.onclick =
    () => {

        renderRoadmap();

        roadmapModal.classList.remove(
            "hidden"
        );

    };


/* =========================================================
   GENERIC MODAL CLOSE
========================================================= */

document
    .querySelectorAll(
        "[data-close]"
    )
    .forEach(
        button => {

            button.onclick =
                () => {

                    const id =
                        button.dataset.close;


                    document
                        .getElementById(id)
                        ?.classList
                        .add(
                            "hidden"
                        );

                };

        }
    );


document
    .querySelectorAll(
        ".modal-overlay"
    )
    .forEach(
        overlay => {

            overlay.addEventListener(
                "click",
                event => {

                    if (
                        event.target ===
                        overlay
                    ) {

                        overlay.classList.add(
                            "hidden"
                        );

                    }

                }
            );

        }
    );


/* =========================================================
   RANK CELEBRATION
========================================================= */

function showRankCelebration(
    newRank,
    oldRank
) {

    const overlay =
        document.createElement(
            "div"
        );


    overlay.className =
        "modal-overlay";


    overlay.innerHTML = `

        <div class="modal-box"
             style="text-align:center;">

            <div
                style="
                    font-size:65px;
                    margin-bottom:10px;">
                🏆
            </div>

            <div
                style="
                    color:#2563eb;
                    font-size:11px;
                    font-weight:900;
                    letter-spacing:3px;">
                RANK UP
            </div>

            <h2
                style="
                    font-size:46px;
                    margin:8px 0;">
                ${newRank.icon}
                ${newRank.name}
            </h2>

            <p
                style="
                    color:#64748b;
                    font-size:13px;">
                Congratulations! You moved from
                <b>${oldRank.name}</b>
                to
                <b>${newRank.name}</b>.
            </p>

            <button
                class="primary-btn modal-action"
                id="rankContinue">

                Continue

            </button>

        </div>

    `;


    document.body.appendChild(
        overlay
    );


    document
        .getElementById(
            "rankContinue"
        )
        .onclick =
        () => {

            overlay.remove();

        };


    setTimeout(
        () => {

            if (
                document.body.contains(
                    overlay
                )
            ) {

                overlay.remove();

            }

        },
        5000
    );

}


/* =========================================================
   FORMAT TIME
========================================================= */

function formatTime(seconds) {

    const minutes =
        Math.floor(
            seconds / 60
        );


    const secondsPart =
        seconds % 60;


    return (
        String(minutes)
            .padStart(2, "0")
        +
        ":"
        +
        String(secondsPart)
            .padStart(2, "0")
    );

}


/* =========================================================
   THEME
========================================================= */

function applyTheme() {

    document.body.classList.toggle(
        "dark",
        Boolean(
            userData.dark
        )
    );

}


applyTheme();


/* =========================================================
   INIT
========================================================= */

loadLevel(
    currentLevel
);
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