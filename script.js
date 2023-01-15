

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


let availableMovies = [];
let correctMovie;
let currentRoundMovies = [];
let highscores = [];
let maxRounds;
let newMovies = [...movies];
let points;
let round;
let usedMovies = [];


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

    (btn.textContent === correctMovie.name)
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

const displayNames = movie => {
    btnPerson1El.textContent = movie[0].name;
    btnPerson2El.textContent = movie[1].name;
    btnPerson3El.textContent = movie[2].name;
    btnPerson4El.textContent = movie[3].name;
    btnPerson1El.dataset.answerId = movie[0].name;
    btnPerson2El.dataset.answerId = movie[1].name;
    btnPerson3El.dataset.answerId = movie[2].name;
    btnPerson4El.dataset.answerId = movie[3].name;
};

const getFirstMovie = () => {
    shuffleArray(newMovies);
    availableMovies = newMovies.filter(movie => !usedMovies.includes(movie));
    correctMovie = availableMovies[0];
    usedMovies.push(correctMovie);
    currentRoundMovies.push(correctMovie);
    imageEl.src = correctMovie.mini_image;
};

const getThreeMovies = () => {
    shuffleArray(newMovies);
    newMovies.forEach(movie => {
        if (currentRoundMovies.length < 4 && !currentRoundMovies.includes(movie)) {
            currentRoundMovies.push(movie);
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

    getFirstMovie();
    getThreeMovies();
    shuffleArray(currentRoundMovies);
    displayNames(currentRoundMovies)
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
    usedMovies = [];
};

const showCorrectAnswer = () => {
    if (btnPerson1El.dataset.answerId === correctMovie.name) {
        addSuccess(btnPerson1El);
    }
    else if (btnPerson2El.dataset.answerId === correctMovie.name) {
        addSuccess(btnPerson2El);
    }
    else if (btnPerson3El.dataset.answerId === correctMovie.name) {
        addSuccess(btnPerson3El);
    }
    else if (btnPerson4El.dataset.answerId === correctMovie.name) {
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
        showCorrectAnswer();
        checkClickedButton(e.target);
        btnPersonDisabled(true);

        // Delay 1.5 sec before going to next question
        setTimeout(() => {
            currentRoundMovies = [];
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
btnHardEl.value = movies.length;

if (!highscoreListEl.innerHTML) {
    highscoreListEl.innerHTML += '<li>None yet, play a game!</li>';
};