

/**********************************************************************************/
/* QUERY SELECTORS */


const btnEasyEl = document.querySelector('#btnEasy');
const btnHardEl = document.querySelector('#btnHard');
const btnMediumEl = document.querySelector('#btnMedium');
const btnPerson1El = document.querySelector('#btnPerson1');
const btnPerson2El = document.querySelector('#btnPerson2');
const btnPerson3El = document.querySelector('#btnPerson3');
const btnPerson4El = document.querySelector('#btnPerson4');
const btnPlayAgainEl = document.querySelector('#btnPlayAgain');
const btnQuitEl = document.querySelector('#btnQuit');
const btnStartGameEl = document.querySelector('#btnStartGame');
const difficultyFormEl = document.querySelector('#difficultyForm');
const finalScoreEl = document.querySelector('#finalScore');
const gameContainerEl = document.querySelector('#gameContainer');
const guessFormEl = document.querySelector('#guessForm');
const imageEl = document.querySelector('#image');
const progressStatsEl = document.querySelector('#progressStats');
const roundEl = document.querySelector('#round');
const scoreEl = document.querySelector('#score');
const startGameFormEl = document.querySelector('#startGameForm');
const titleEl = document.querySelector('#title');


/**********************************************************************************/
/* VARIABLES */


let correctStudent;
let currentRoundStudents = [];
let inPlayStudents = [];
let maxRounds;
let newStudents = students.map(student => student);
let points;
let round;
let usedStudents = [];

// let highscoresEasy = []; // Push in after easy round and display highscoreEasy at end.
// let highscoresMedium = [];
// let highscoresHard = [];

// // eller använd filter() på en gemensam array:
// let highscores = [
//     {
//         highscore: 7 + '/' + 10,
//         gamemode: 'Easy',
//     },
//     {
//         highscore: 32 + '/' + 41,
//         gamemode: 'Hard',
//     },
// ];


/**********************************************************************************/
/* FUNCTIONS */


const addSuccess = el => {
    el.classList.add('btn-success');
    el.classList.remove('btn-light');
};

const btnPersonDisabled = boolean => {
    btnPerson1El.disabled
        = btnPerson2El.disabled
        = btnPerson3El.disabled
        = btnPerson4El.disabled = boolean;
};

const checkClickedButton = btn => {
    btn.classList.remove('btn-light');

    (btn.textContent === correctStudent.name)
        ? updatePoints()
        : btn.classList.add('btn-danger');
};

const checkRound = maxRounds => {
    if (round >= maxRounds) {

        hideEl(gameContainerEl);
        hideEl(progressStatsEl);
        displayEl(btnPlayAgainEl);
        displayEl(titleEl);
        displayEl(finalScoreEl);
        showFinalScore();
        return true;
    };
};

const displayEl = el => {
    el.classList.remove('hide');
};

const displayNames = student => {
    btnPerson1El.textContent = student[0].name;
    btnPerson2El.textContent = student[1].name;
    btnPerson3El.textContent = student[2].name;
    btnPerson4El.textContent = student[3].name;
};

const getFirstStudent = () => {
    shuffleArray(newStudents);

    inPlayStudents = newStudents.filter(student => !usedStudents.includes(student));
    correctStudent = inPlayStudents[0];
    usedStudents.push(correctStudent);
    currentRoundStudents.push(correctStudent);
    imageEl.src = correctStudent.image;
};

const getThreeStudents = () => {
    shuffleArray(newStudents);
    newStudents.forEach(student => {
        if (currentRoundStudents.length < 4 && !currentRoundStudents.includes(student)) {
            currentRoundStudents.push(student);
        };
    });
};

const hideEl = el => {
    el.classList.add('hide');
};

const newQuestion = () => {
    if (checkRound(maxRounds)) {
        return;
    };

    getFirstStudent();
    getThreeStudents();
    shuffleArray(currentRoundStudents);
    displayNames(currentRoundStudents)
    updateRound();
};

const resetAllColors = () => {
    resetColor(btnPerson1El);
    resetColor(btnPerson2El);
    resetColor(btnPerson3El);
    resetColor(btnPerson4El);
};

const resetColor = el => {
    el.classList.add('btn-light');
    el.classList.remove('btn-success');
    el.classList.remove('btn-danger');
};

const resetStats = () => {
    points = 0;
    scoreEl.textContent = `${points}`;
    round = 0;
    roundEl.textContent = `${round} / ${maxRounds}`;
    usedStudents = [];
};

const showCorrectAnswer = () => {

    if (btnPerson1El.textContent === correctStudent.name) {
        addSuccess(btnPerson1El);
    }
    else if (btnPerson2El.textContent === correctStudent.name) {
        addSuccess(btnPerson2El);
    }
    else if (btnPerson3El.textContent === correctStudent.name) {
        addSuccess(btnPerson3El);
    }
    else if (btnPerson4El.textContent === correctStudent.name) {
        addSuccess(btnPerson4El);
    };
};

const showFinalScore = () => {
    finalScoreEl.textContent = `${points} / ${maxRounds}`;
};

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

const updatePoints = () => {
    points++;
    scoreEl.textContent = `${points}`;
};

const updateRound = () => {
    round++;
    roundEl.textContent = `${round} / ${maxRounds}`;
};


/**********************************************************************************/
/* EVENT HANDLERS */


// Start Game Button, shows difficulty screen
btnStartGameEl.addEventListener('click', e => {
    e.preventDefault();

    hideEl(startGameFormEl);
    displayEl(difficultyFormEl);
});

// Choose Difficulty Buttons, shows game screen
difficultyFormEl.addEventListener('click', e => {
    e.preventDefault();

    if (e.target.tagName === 'BUTTON') {

        maxRounds = Number(e.target.value);

        hideEl(difficultyFormEl);
        hideEl(titleEl);
        displayEl(gameContainerEl);
        displayEl(progressStatsEl);
        displayEl(btnQuitEl);
        resetStats();
        newQuestion();
    };
});

btnPlayAgainEl.addEventListener('click', e => {
    e.preventDefault();

    hideEl(startGameFormEl);
    hideEl(finalScoreEl);
    hideEl(btnPlayAgainEl);
    hideEl(btnQuitEl);
    displayEl(difficultyFormEl);
});

btnQuitEl.addEventListener('click', e => {
    e.preventDefault();

    hideEl(finalScoreEl);
    hideEl(btnPlayAgainEl);
    hideEl(btnQuitEl);
    hideEl(gameContainerEl);
    hideEl(progressStatsEl);
    displayEl(startGameFormEl);
});

// Click a name
guessFormEl.addEventListener('click', e => {
    e.preventDefault();

    if (e.target.tagName === 'BUTTON') {
        // console.log('I clicked:', e.target.textContent);
        showCorrectAnswer();
        checkClickedButton(e.target);
        btnPersonDisabled(true);

        // Delay 1.5 sec before going to next question
        setTimeout(() => {
            currentRoundStudents = [];
            newQuestion();
            resetAllColors();
            btnPersonDisabled(false);
        }, 1500);
    };
});


/**********************************************************************************/
/* START */


btnEasyEl.value = 10;
btnMediumEl.value = 20;
btnHardEl.value = students.length;

scoreEl.textContent = points;
