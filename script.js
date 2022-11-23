/*
* 
* Steg 1: Hämta ut ett namn från arrayn till första knappen
*
* Steg 2: Hämta ut ett random namn från arrayn till knappen
*
* Steg 3: Ta det random namnet från arrayn och lägg randomly på en av de 4 knapparna
*
* Shuffle copy of array and then chose the first 4 slots for the 4 buttons
*
*/

const guessFormEl = document.querySelector('#guessForm');
const btnPerson1El = document.querySelector('#btnPerson1');
const btnPerson2El = document.querySelector('#btnPerson2');
const btnPerson3El = document.querySelector('#btnPerson3');
const btnPerson4El = document.querySelector('#btnPerson4');
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



btnPerson1El.textContent = `${shuffledStudents4[0].name}`;
btnPerson2El.textContent = `${shuffledStudents4[1].name}`;
btnPerson3El.textContent = `${shuffledStudents4[2].name}`;
btnPerson4El.textContent = `${shuffledStudents4[3].name}`;

// let studentsRandomIndex = getRandomNumber(students.length) - 1;
// const studentsRandomName = students[getRandomNumber(students.length) - 1].name;

// btnPerson1El.textContent = `${students[getRandomNumber(students.length) - 1].name}`;
// btnPerson2El.textContent = `${students[getRandomNumber(students.length) - 1].name}`;
// btnPerson3El.textContent = `${students[getRandomNumber(students.length) - 1].name}`;
// btnPerson4El.textContent = `${students[getRandomNumber(students.length) - 1].name}`;
