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
const imageContainerEl = document.querySelector('#imageContainer');

let students = [
    {
        name: 'Kristopher',
        image: 'https://images.wallpapersden.com/image/download/thanos-with-infinity-gauntlet_a2lrbWqUmZqaraWkpJRqZWWtamVl.jpg',
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

const newQuestion = callback => {
    // Make a copy of students
    const newStudents = students.map(student => student);
    // Shuffle newStudents (destructive function)
    shuffleArray(newStudents);
    // Save the first 4 students AFTER shuffling
    const shortShuffledStudents = newStudents.slice(0, 4);

    // Display the names of shortShuffledStudents to DOM
    btnPerson1El.textContent = `${shortShuffledStudents[0].name}`;
    btnPerson2El.textContent = `${shortShuffledStudents[1].name}`;
    btnPerson3El.textContent = `${shortShuffledStudents[2].name}`;
    btnPerson4El.textContent = `${shortShuffledStudents[3].name}`;

    // Copy shortShuffledStudents
    const newShortShuffledStudents = shortShuffledStudents.map(student => student);
    // Shuffle newShortShuffledStudents (destructive function)
    shuffleArray(newShortShuffledStudents);
    // Save first image in newShortShuffledStudents
    const firstImage = newShortShuffledStudents[0].image;

    // Display the image of the first object in newShortShuffledStudents to the DOM
    // imageContainerEl.innerHTML = `<img src="${firstImage}"></img>`;

    // Test. Is true when the person is on the first button
    const imageNameComparison = shortShuffledStudents[0].name === newShortShuffledStudents[0].name;

    // Call the callback function
    callback(imageNameComparison);

};

// Create a callback function
newQuestion(comparison => {

    if (comparison) {
        console.log(comparison);
    }
    else {
        console.log('unlucky')
    }
});

console.log(students);