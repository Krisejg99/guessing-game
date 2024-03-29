

/**********************************************************************************/
/* QUERY SELECTORS */


const btnclearHighscoreEl = document.querySelector('#btnClearHighscore');
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
const nextQuestionBtnEl = document.querySelector('#nextQuestionBtn')
const progressStatsEl = document.querySelector('#progressStats');
const roundEl = document.querySelector('#round');
const scoreEl = document.querySelector('#score');
const startGameFormEl = document.querySelector('#startGameForm');
const titleEl = document.querySelector('#title');


/**********************************************************************************/
/* VARIABLES */


let currentRoundMovies = [];


let jsonHighscores = localStorage.getItem('highscores') ?? '[]';
let highscores = JSON.parse(jsonHighscores);

let maxRounds;
let allMovies = [...movies];
let points;
let round;
let usedMovies = [];


/**********************************************************************************/
/* FUNCTIONS */


const addSuccess = el => {
    el.classList.add('btn-correct');
};

const btnPersonDisabled = boolean => {
    btnPerson1El.disabled
        = btnPerson2El.disabled
        = btnPerson3El.disabled
        = btnPerson4El.disabled = boolean;
};

const checkRound = maxRounds => {
    if (round >= maxRounds) {
        createHighscore();
        hideEl(gameContainerEl);
        hideEl(progressStatsEl);
        displayEl(highscoresEl);
        displayEl(btnPlayAgainEl);
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

    if (highscores.length > 10) {
        highscores = highscores.slice(0, 10);
    };

    localStorage.setItem('highscores', JSON.stringify(highscores));
    renderHighscores()
};

const renderHighscores = () => {
    highscoreListEl.innerHTML = '';
    highscores.forEach(highscore => {
        highscoreListEl.innerHTML += `
            <li>${highscore.score}/${highscore.rounds}</li>
        `;
    });
}

btnclearHighscoreEl.addEventListener('click', e => {
    e.preventDefault();

    localStorage.removeItem('highscores');
    jsonHighscores = localStorage.getItem('highscores') ?? '[]';
    highscores = JSON.parse(jsonHighscores);
    renderHighscores();
})

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

const getCorrectMovie = () => {
    const availableMoviesThisRound = allMovies.filter(movie => !usedMovies.includes(movie));
    const correctMovie = availableMoviesThisRound[0];
    return correctMovie;
};

const getThreeMovies = (correctMovie) => {
    const threeMovies = [];

    allMovies.forEach(movie => {
        if (threeMovies.length < 3 && !threeMovies.includes(movie) && movie !== correctMovie) {
            threeMovies.push(movie);
        };
    });

    return threeMovies;
};

const hideEl = el => {
    el.classList.add('hide');
};

const newQuestion = () => {
    if (checkRound(maxRounds)) {
        return;
    };

    shuffleArray(allMovies);

    const correctMovie = getCorrectMovie();
    currentRoundMovies.push(correctMovie);

    const threeMovies = getThreeMovies(correctMovie);
    currentRoundMovies.push(...threeMovies);

    document.querySelector('#img-container').innerHTML = `
        <img src="${correctMovie.mini_image}" alt="picture of ${correctMovie.name}" class="image guessingImage img-fluid">
    `;

    shuffleArray(currentRoundMovies);
    displayNames(currentRoundMovies)
    updateRoundCounter();
};

const resetAllColors = () => {
    resetColor(btnPerson1El);
    resetColor(btnPerson2El);
    resetColor(btnPerson3El);
    resetColor(btnPerson4El);
};

const resetColor = el => {
    el.classList.remove('btn-correct');
    el.classList.remove('btn-incorrect');
};

const resetStats = () => {
    points = 0;
    scoreEl.textContent = `${points}`;
    round = 0;
    roundEl.textContent = `${round} / ${maxRounds}`;
    usedMovies = [];
};

const showCorrectAnswer = (correctMovie) => {

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
    document.querySelector('#img-container').innerHTML = `
        <img src="${correctMovie.mini_image}" alt="picture of ${correctMovie.name}" class="image img-fluid">
        <img src="${correctMovie.image}" alt="picture ${correctMovie.name}" class="image img-fluid">
    `;
    displayEl(nextQuestionBtnEl)
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

const updateRoundCounter = () => {
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
        hideEl(nextQuestionBtnEl)
        newQuestion();
        resetAllColors();
        btnPersonDisabled(false);
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
    hideEl(nextQuestionBtnEl);
    hideEl(gameContainerEl);
    hideEl(progressStatsEl);
    displayEl(highscoresEl);
    displayEl(startGameFormEl);

    resetAllColors();
    btnPersonDisabled(false);
});

// Click a name
guessFormEl.addEventListener('click', e => {
    e.preventDefault();

    const correctMovie = getCorrectMovie();
    usedMovies.push(correctMovie);

    if (e.target.tagName === 'BUTTON') {
        showCorrectAnswer(correctMovie);

        (e.target.textContent === correctMovie.name)
            ? updatePoints()
            : e.target.classList.add('btn-incorrect');
        btnPersonDisabled(true);
    };
});

nextQuestionBtnEl.addEventListener('click', () => {
    currentRoundMovies = [];
    scoreEl.style.color = 'white';
    hideEl(nextQuestionBtnEl)
    newQuestion();
    resetAllColors();
    btnPersonDisabled(false);
})


/**********************************************************************************/
/* START */


btnEasyEl.value = 1;
btnMediumEl.value = 20;
btnHardEl.value = movies.length;

if (!highscoreListEl.innerHTML) {
    highscoreListEl.innerHTML += '<li>None yet, play a game!</li>';
};