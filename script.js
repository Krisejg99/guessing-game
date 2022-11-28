/*
* Bugg:
* Found a bug when i click the right answer on the same spot i got the answer wrong last time, I get a point, but the button sometimes becomes red instead of green.
* So if I clicked button 1 and it was wrong, and during the next question I click button 1 again and it was the right answer, it turns red.
* Om jag tidigare fårr rött på knappen så kan inte inte bli göre för resten av spelet.
* 
* Gissat rätt ska knappen bli grön
* Efter 1 sekund ska man gå vidare
* 
* Instead of taking the 4 first from array to DOM, I take just the first one to picture and push to an array. Then i take 3 other random from original array and push to the same array. Then I have an array with 4, but the answer will always be different.
* 
* 
* 
*/

const guessFormEl = document.querySelector('#guessForm');
const btnPerson1El = document.querySelector('#btnPerson1');
const btnPerson2El = document.querySelector('#btnPerson2');
const btnPerson3El = document.querySelector('#btnPerson3');
const btnPerson4El = document.querySelector('#btnPerson4');
const imageContainerEl = document.querySelector('#imageContainer');
const btnStartGameEl = document.querySelector('#btnStartGame');
const btnStartGameContainerEl = document.querySelector('#btnStartGameContainer');
const gameContainerEl = document.querySelector('#gameContainer');
const btnDifficultyContainerEl = document.querySelector('#btnDifficultyContainer');
const btnEasyEl = document.querySelector('#btnEasy');
const btnMediumEl = document.querySelector('#btnMedium');
const btnHardEl = document.querySelector('#btnHard');

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
let maxRounds;
let round = 1;
let newStudents = students.map(student => student);
shuffleArray(newStudents);
let currentRoundNames = [];
let usedNames = [];

const getFirstStudent = () => {
    shuffleArray(newStudents);
    currentRoundNames.push(newStudents[0]);
    imageContainerEl.src = newStudents[0].image;
    return newStudents[0];
};

const getThreeStudents = () => {
    shuffleArray(newStudents);
    // let top3 = [];

    newStudents.forEach(student => {
        if (currentRoundNames.length < 4 && !currentRoundNames.includes(student)) {
            currentRoundNames.push(student);
            // top3.push(student)
        };
    });
    // return top3;
};

const newQuestion = () => {
    displayedImage = getFirstStudent();
    getThreeStudents();
    shuffleArray(currentRoundNames);

    btnPerson1El.textContent = `${currentRoundNames[0].name}`;
    btnPerson2El.textContent = `${currentRoundNames[1].name}`;
    btnPerson3El.textContent = `${currentRoundNames[2].name}`;
    btnPerson4El.textContent = `${currentRoundNames[3].name}`;
};

let displayedImage = getFirstStudent();

// End game when rounds value is more than input value from Difficulty Buttons
const checkRound = number => {
    if (round > number) {
        gameContainerEl.classList.add('hide');

        console.log(points + '/' + (round - 1));
    };
};

const btnPersonDisabled = boolean => {
    btnPerson1El.disabled
        = btnPerson2El.disabled
        = btnPerson3El.disabled
        = btnPerson4El.disabled = boolean;
}

// Start Game Button, shows difficulty screen
btnStartGameEl.addEventListener('click', e => {
    e.preventDefault();

    btnStartGameContainerEl.classList.add('hide');
    btnDifficultyContainerEl.classList.remove('hide');
});

// Choose Difficulty Buttons, shows game screen
btnDifficultyContainerEl.addEventListener('click', e => {
    e.preventDefault();

    if (e.target.tagName === 'BUTTON') {
        btnDifficultyContainerEl.classList.add('hide');
        gameContainerEl.classList.remove('hide');

        maxRounds = Number(e.target.value);
        newQuestion();
    };
});

// Found a bug when i click the right answer, I get a point, but the button sometimes becomes red instead of green.
// Click a name
guessFormEl.addEventListener('click', e => {
    e.preventDefault();
    if (e.target.tagName === 'BUTTON') {
        e.target.classList.remove('btn-light');
        round++;

        console.log('Img:', displayedImage.name);
        console.log('I clicked:', e.target.textContent);

        if (e.target.textContent === displayedImage.name) {
            e.target.classList.add('btn-success');
            points++;
            console.log('YEY! +1 point. Points:', points);
        }
        else {
            e.target.classList.add('btn-danger');
        };

        btnPersonDisabled(true);

        // Delay 1.5 sec before going to next question
        setTimeout(() => {
            e.target.classList.remove('btn-success', 'btn-danger');
            e.target.classList.add('btn-light');
            btnPersonDisabled(false);
            checkRound(maxRounds);
            currentRoundNames = [];
            newQuestion();
        }, 1500);
    };
});
