/*
* 
* 
* 
* 
* Steg 1: Shuffle shuffledStudents4
* Steg 2: Take the frist persons picture in the new shuffled array and display to DOM
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
const imageContainer = document.querySelector('#imageContainer');

let students = [
    {
        name: 'Kristopher',
        image: 'Kristophers bild',
    },
    {
        name: 'Jonas',
        image: 'Jonas bild',
    },
    {
        name: 'Harald',
        image: 'Haralds bild',
    },
    {
        name: 'Joakim',
        image: 'Joakims bild',
    },
    {
        name: 'Patrik',
        image: 'Patriks bild',
    },
    {
        name: 'Simon',
        image: 'Simons bild',
    },
    {
        name: 'Viktor',
        image: 'Viktors bild',
    },
];

// FisherYates random number algorithm
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}



// Make a copy of students
const newStudents = students.map(student => student);
// Shuffle newStudents (destructive function)
shuffleArray(newStudents);
// Save the first 4 students AFTER shuffling
const shuffledStudents4 = newStudents.slice(0, 4);

// Display the names of shuffledStudents4 to DOM
btnPerson1El.textContent = `${shuffledStudents4[0].name}`;
btnPerson2El.textContent = `${shuffledStudents4[1].name}`;
btnPerson3El.textContent = `${shuffledStudents4[2].name}`;
btnPerson4El.textContent = `${shuffledStudents4[3].name}`;

// Copy shuffledStudents4
const newShuffledStudents4 = shuffledStudents4.map(student => student);
// Shuffle newStudents4 (destructive function)
shuffleArray(newShuffledStudents4);

// Display the image of the first object in newShuffledStudents4 to the DOM
imageContainerEl.innerHTML = `${newShuffledStudents4[0].image}`;