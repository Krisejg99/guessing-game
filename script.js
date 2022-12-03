/*
* 
* 
* 
* 
* 
* 
* 
*/

const guessFormEl = document.querySelector('#guessForm');
const btnPerson1El = document.querySelector('#btnPerson1');
const btnPerson2El = document.querySelector('#btnPerson2');
const btnPerson3El = document.querySelector('#btnPerson3');
const btnPerson4El = document.querySelector('#btnPerson4');
const imageEl = document.querySelector('#image');
const btnStartGameEl = document.querySelector('#btnStartGame');
const startGameFormEl = document.querySelector('#startGameForm');
const gameContainerEl = document.querySelector('#gameContainer');
const difficultyFormEl = document.querySelector('#difficultyForm');
const btnEasyEl = document.querySelector('#btnEasy');
const btnMediumEl = document.querySelector('#btnMedium');
const btnHardEl = document.querySelector('#btnHard');
const finalScoreEl = document.querySelector('#finalScore');
const playAgainFormEl = document.querySelector('#playAgainForm');
const btnPlayAgainEl = document.querySelector('#btnPlayAgain');
const btnQuitEl = document.querySelector('#btnQuit');
const titleEl = document.querySelector('#title');
const roundEl = document.querySelector('#round');
const scoreEl = document.querySelector('#score');
const progressStatsEl = document.querySelector('#progressStats');

// FisherYates random number algorithm
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

btnHardEl.value = students.length;

let points = 0;
let round = 1;
let maxRounds;
let newStudents = students.map(student => student);
shuffleArray(newStudents);
let currentRoundStudents = [];
let correctStudent;
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

const getFirstStudent = () => {
    shuffleArray(newStudents);
    correctStudent = newStudents.find(student => !usedStudents.includes(student))
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

const newQuestion = () => {
    if (checkRound(maxRounds)) {
        return;
    }

    getFirstStudent();
    getThreeStudents();
    shuffleArray(currentRoundStudents);

    btnPerson1El.textContent = `${currentRoundStudents[0].name}`;
    btnPerson2El.textContent = `${currentRoundStudents[1].name}`;
    btnPerson3El.textContent = `${currentRoundStudents[2].name}`;
    btnPerson4El.textContent = `${currentRoundStudents[3].name}`;
    roundEl.textContent = `${round} / ${maxRounds}`;
};

// End game when rounds value is more than input value from Difficulty Buttons
const checkRound = number => {
    if (round > number) {
        gameContainerEl.classList.add('hide');
        progressStatsEl.classList.add('hide');
        btnPlayAgainEl.classList.remove('hide');
        titleEl.classList.remove('hide');
        finalScoreEl.classList.remove('hide');

        finalScoreEl.textContent = `${points} / ${round - 1}`;
        console.log(points + '/' + (round - 1));

        resetStats();
        return true;
    };
};

const resetStats = () => {
    points = 0;
    round = 1;
    usedStudents = [];
};

const btnPersonDisabled = boolean => {
    btnPerson1El.disabled
        = btnPerson2El.disabled
        = btnPerson3El.disabled
        = btnPerson4El.disabled = boolean;
}

const addSuccess = el => {
    el.classList.add('btn-success');
    el.classList.remove('btn-light');
};
const resetColor = el => {
    el.classList.add('btn-light');
    el.classList.remove('btn-success');
    el.classList.remove('btn-danger');
};
const resetAllColors = () => {
    resetColor(btnPerson1El);
    resetColor(btnPerson2El);
    resetColor(btnPerson3El);
    resetColor(btnPerson4El);
};

const updatePoints = () => {
    scoreEl.textContent = `${points}`;
};

// Start Game Button, shows difficulty screen
btnStartGameEl.addEventListener('click', e => {
    e.preventDefault();

    startGameFormEl.classList.add('hide');
    difficultyFormEl.classList.remove('hide');
});

// Choose Difficulty Buttons, shows game screen
difficultyFormEl.addEventListener('click', e => {
    e.preventDefault();

    if (e.target.tagName === 'BUTTON') {
        difficultyFormEl.classList.add('hide');
        titleEl.classList.add('hide');
        gameContainerEl.classList.remove('hide');
        progressStatsEl.classList.remove('hide');
        btnQuitEl.classList.remove('hide');

        maxRounds = Number(e.target.value);
        updatePoints();
        newQuestion();
    };
});

btnPlayAgainEl.addEventListener('click', e => {
    e.preventDefault();

    startGameFormEl.classList.add('hide');
    finalScoreEl.classList.add('hide');
    btnPlayAgainEl.classList.add('hide');
    btnQuitEl.classList.add('hide');
    difficultyFormEl.classList.remove('hide');
});

btnQuitEl.addEventListener('click', e => {
    e.preventDefault();

    finalScoreEl.classList.add('hide');
    btnPlayAgainEl.classList.add('hide');
    btnQuitEl.classList.add('hide');
    gameContainerEl.classList.add('hide');
    progressStatsEl.classList.add('hide');
    startGameFormEl.classList.remove('hide');

    resetStats();
});

// Found a bug when i click the right answer, I get a point, but the button sometimes becomes red instead of green.
// Click a name
guessFormEl.addEventListener('click', e => {
    e.preventDefault();
    if (e.target.tagName === 'BUTTON') {
        e.target.classList.remove('btn-light');

        // console.log('I clicked:', e.target.textContent);

        // Make the correkt answer green
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

        if (e.target.textContent === correctStudent.name) {
            points++;
        }
        else {
            e.target.classList.add('btn-danger');
        };

        btnPersonDisabled(true);

        round++;
        updatePoints();

        // Delay 1.5 sec before going to next question
        // setTimeout(() => {
        currentRoundStudents = [];
        newQuestion();
        resetAllColors();
        btnPersonDisabled(false);
        // }, 1500);
    };
});

