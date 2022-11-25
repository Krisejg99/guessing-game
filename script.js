/*
* 
* 
* 
* 
* Gissat rätt ska knappen bli grön
* Efter 1 sekund ska man gå vidare
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

let points = 0;
let maxRounds;
let round = 1;

btnHardEl.value = students.length;



let shuffledFourStudents = () => {
    const newStudents = students.map(student => student);               // Make a copy of students
    shuffleArray(newStudents);                                          // Shuffle newStudents (destructive function)
    const newShuffledSlicedStudents = newStudents.slice(0, 4);          // Save the first 4 students AFTER shuffling
    return newShuffledSlicedStudents;
};

// New round function
const newPictureAndNames = () => {

    const studentsFour = shuffledFourStudents();                        // Call shuffledSlicedStudents() and save as variable in here
    const newStudentsFour = studentsFour.map(student => student);       // Copy shortShuffledStudents
    shuffleArray(newStudentsFour);                                      // Shuffle newShortShuffledStudents (destructive function)
    const firstImage = newStudentsFour[0].image;                        // Save first image in newShortShuffledStudents

    btnPerson1El.textContent = `${studentsFour[0].name}`;      // Display the names of shortShuffledStudents to DOM
    btnPerson2El.textContent = `${studentsFour[1].name}`;
    btnPerson3El.textContent = `${studentsFour[2].name}`;
    btnPerson4El.textContent = `${studentsFour[3].name}`;
    imageContainerEl.src = firstImage;                                  // Display the image of the first object in newShortShuffledStudents to the DOM   

    return newStudentsFour[0];
};

let displayedImage = newPictureAndNames().name;
console.log('Picture:', displayedImage);

// End game when rounds value is more input value from Difficulty Buttons
const setNrOfRounds = number => {
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
        console.log('maxRounds:', maxRounds);
    };
});

// Click a name
guessFormEl.addEventListener('click', e => {
    e.preventDefault();
    if (e.target.tagName === 'BUTTON') {
        const targetAddClass = htmlClass => e.target.classList.add(`${htmlClass}`);
        const targetRemoveClass = htmlClass => e.target.classList.remove(`${htmlClass}`);

        targetRemoveClass('btn-light');
        round++;

        if (e.target.textContent === displayedImage) {
            targetAddClass('btn-success');
            points++;
            console.log('YEY! +1 point. Points:', points);
        }
        else {
            targetAddClass('btn-danger');
        };

        btnPersonDisabled(true);

        // Delay 1.5 sec before going to next question
        setTimeout(() => {
            targetRemoveClass('btn-success', 'btn-danger');
            targetAddClass('btn-light');
            btnPersonDisabled(false);
            setNrOfRounds(maxRounds);
            displayedImage = newPictureAndNames().name;
            console.log('Picture:', displayedImage);
        }, 1500);
    };
});
