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

const guessForm1El = document.querySelector('#guessForm1');
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

guessForm1El.addEventListener('submit', e => {
    e.preventDefault();

    console.log('Person 1 submitted');
});

