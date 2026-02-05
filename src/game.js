// Number Guessing Game Logic

const form = document.getElementById('guess-form');
const input = document.getElementById('guess-input');
const feedback = document.getElementById('feedback');
const attemptCount = document.getElementById('attempt-count');
const winMessage = document.getElementById('win-message');
const playAgainButton = document.getElementById('play-again');

let targetNumber;
let attempts;

function initGame() {
    targetNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    attemptCount.textContent = '0';
    feedback.textContent = '';
    winMessage.hidden = true;
    input.disabled = false;
    input.value = '';
    input.focus();
}

function handleGuess(event) {
    event.preventDefault();

    const guess = parseInt(input.value, 10);
    if (isNaN(guess) || guess < 1 || guess > 100) {
        feedback.textContent = 'Please enter a number between 1 and 100.';
        return;
    }

    attempts++;
    attemptCount.textContent = attempts;

    if (guess < targetNumber) {
        feedback.textContent = 'Higher! Try a bigger number.';
    } else if (guess > targetNumber) {
        feedback.textContent = 'Lower! Try a smaller number.';
    } else {
        feedback.textContent = `You got it in ${attempts} ${attempts === 1 ? 'attempt' : 'attempts'}!`;
        winMessage.hidden = false;
        input.disabled = true;
    }

    input.value = '';
    input.focus();
}

form.addEventListener('submit', handleGuess);
playAgainButton.addEventListener('click', initGame);

initGame();
