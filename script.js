/*
* 
*
*
*
*
*
*
*
*
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
const imageContainer = document.querySelector('#imageContainer');

let students = [
    {
        name: 'Kristopher',
        image: '',
    },
    {
        name: 'Jonas',
        image: '',
    },
    {
        name: 'Harald',
        image: '',
    },
    {
        name: 'Joakim',
        image: '',
    },
];

guessFormEl.btnPerson1.addEventListener('click', e => {
    e.preventDefault();

    console.log('Person 1 submitted');
});

