/*
* 
* Rounds:
* 
* 
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
const btnStartGameEl = document.querySelector('#btnStartGame');
const btnStartGameContainerEl = document.querySelector('#btnStartGameContainer');
const gameContainerEl = document.querySelector('#gameContainer');

let points = 0;

// Start Game!
btnStartGameEl.addEventListener('click', e => {
    btnStartGameContainerEl.classList.add('hide');
    gameContainerEl.classList.remove('hide');
})

// FisherYates random number algorithm
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

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
    imageContainerEl.innerHTML = `<img src="${firstImage}"></img>`;     // Display the image of the first object in newShortShuffledStudents to the DOM

    return newShortShuffledStudents[0].name;
};

let displayedImage = newPictureAndNames();
console.log('Picture:', displayedImage);

guessFormEl.addEventListener('click', e => {
    e.preventDefault();

    if (e.target.tagName === 'BUTTON') {
        const clickedStudentName = e.target.textContent
        // console.log('I clicked:', clickedStudentName);

        if (clickedStudentName === displayedImage) {

            points++;
            console.log('YEY! +1 point. Points:', points);
        }
        else {
            console.log('No point this round. Points:', points);
        };



        displayedImage = newPictureAndNames();
        console.log('Picture:', displayedImage);
    };
});

