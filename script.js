

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
const highscoreListEl = document.querySelector('#highscoreList');
const highscoresEl = document.querySelector('#highscores');
const imageEl = document.querySelector('#image');
const progressStatsEl = document.querySelector('#progressStats');
const roundEl = document.querySelector('#round');
const scoreEl = document.querySelector('#score');
const startGameFormEl = document.querySelector('#startGameForm');
const titleEl = document.querySelector('#title');


/**********************************************************************************/
/* VARIABLES */


let availableStudents = [];
let correctStudent;
let currentRoundStudents = [];
let highscores = [];
let maxRounds;
let newStudents = [...students];
let points;
let round;
let usedStudents = [];


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

        createHighscore();
        hideEl(gameContainerEl);
        hideEl(progressStatsEl);
        displayEl(highscoresEl);
        displayEl(btnPlayAgainEl);
        displayEl(titleEl);
        displayEl(finalScoreEl);
        showFinalScore();
        return true;
    };
};

const createHighscore = () => {

    highscoreListEl.innerHTML = '';
    highscores.push(
        {
            score: points,
            rounds: maxRounds,
        },
    );

    highscores.sort((a, b) => b.score - a.score);

    let top10 = highscores.slice(0, 10)

    top10.forEach(highscore => {
        highscoreListEl.innerHTML += `
                <li>${highscore.score}/${highscore.rounds}</li>
            `;
    });
};

const displayEl = el => {
    el.classList.remove('hide');
};

const displayNames = student => {
    btnPerson1El.textContent = student[0].name;
    btnPerson2El.textContent = student[1].name;
    btnPerson3El.textContent = student[2].name;
    btnPerson4El.textContent = student[3].name;
    btnPerson1El.dataset.answerId = student[0].name;
    btnPerson2El.dataset.answerId = student[1].name;
    btnPerson3El.dataset.answerId = student[2].name;
    btnPerson4El.dataset.answerId = student[3].name;
};

const getFirstStudent = () => {
    shuffleArray(newStudents);

    availableStudents = newStudents.filter(student => !usedStudents.includes(student));
    correctStudent = availableStudents[0];
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

    if (btnPerson1El.dataset.answerId === correctStudent.name) {
        addSuccess(btnPerson1El);
    }
    else if (btnPerson2El.dataset.answerId === correctStudent.name) {
        addSuccess(btnPerson2El);
    }
    else if (btnPerson3El.dataset.answerId === correctStudent.name) {
        addSuccess(btnPerson3El);
    }
    else if (btnPerson4El.dataset.answerId === correctStudent.name) {
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
    scoreEl.style.color = '#198754';
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
    hideEl(highscoresEl);
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
    hideEl(highscoresEl);
    displayEl(difficultyFormEl);
});

btnQuitEl.addEventListener('click', e => {
    e.preventDefault();

    hideEl(finalScoreEl);
    hideEl(btnPlayAgainEl);
    hideEl(btnQuitEl);
    hideEl(gameContainerEl);
    hideEl(progressStatsEl);
    displayEl(highscoresEl);
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
            scoreEl.style.color = 'white';
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

if (!highscoreListEl.innerHTML) {
    highscoreListEl.innerHTML += '<li>None yet, play a game!</li>';
};