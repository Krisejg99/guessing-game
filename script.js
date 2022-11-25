/*
* 
* Rounds:
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

        console.log('round:', round);
        round++;

        const clickedStudentName = e.target.textContent
        // console.log('I clicked:', clickedStudentName);

        if (clickedStudentName === displayedImage) {

            points++;
            console.log('YEY! +1 point. Points:', points);
        }
        else {
            console.log('No point this round. Points:', points);
        };

        // setTimeout()

        displayedImage = newPictureAndNames();
        console.log('Picture:', displayedImage);

        setNrOfRounds(maxRounds);
    };
});



// New round function
const newPictureAndNames = () => {

    const newStudents = students.map(student => student);       // Make a copy of students
    shuffleArray(newStudents);                                  // Shuffle newStudents (destructive function)
    const shortShuffledStudents = newStudents.slice(0, 4);      // Save the first 4 students AFTER shuffling

    const newShortShuffledStudents = shortShuffledStudents.map(student => student);     // Copy shortShuffledStudents
    shuffleArray(newShortShuffledStudents);                                             // Shuffle newShortShuffledStudents (destructive function)
    const firstImage = newShortShuffledStudents[0].image;                               // Save first image in newShortShuffledStudents

    btnPerson1El.textContent = `${shortShuffledStudents[0].name}`;      // Display the names of shortShuffledStudents to DOM
    btnPerson2El.textContent = `${shortShuffledStudents[1].name}`;
    btnPerson3El.textContent = `${shortShuffledStudents[2].name}`;
    btnPerson4El.textContent = `${shortShuffledStudents[3].name}`;
    imageContainerEl.src = firstImage;                                  // Display the image of the first object in newShortShuffledStudents to the DOM   

    return newShortShuffledStudents[0].name;
};

let displayedImage = newPictureAndNames();
// console.log('Picture:', displayedImage);



// End game when rounds value is more input value from Difficulty Buttons
const setNrOfRounds = number => {
    if (round > number) {
        gameContainerEl.classList.add('hide');

        console.log(number);
    };
};
