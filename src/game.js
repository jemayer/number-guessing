// Number Guessing Game Logic

const form = document.getElementById('guess-form');
const input = document.getElementById('guess-input');
const feedback = document.getElementById('feedback');
const attemptCount = document.getElementById('attempt-count');
const winMessage = document.getElementById('win-message');
const playAgainButton = document.getElementById('play-again');
const difficultyButtons = document.querySelectorAll('#difficulty-selector button');
const maxNumberDisplay = document.getElementById('max-number');

let targetNumber;
let attempts;
let maxNumber = 100;

function getProximityThreshold() {
    return Math.floor(maxNumber / 10);
}

function isClose(guess) {
    const distance = Math.abs(guess - targetNumber);
    return distance > 0 && distance <= getProximityThreshold();
}

function initGame() {
    targetNumber = Math.floor(Math.random() * maxNumber) + 1;
    attempts = 0;
    attemptCount.textContent = '0';
    feedback.textContent = '';
    feedback.className = '';
    winMessage.hidden = true;
    input.disabled = false;
    input.max = maxNumber;
    input.value = '';
    input.focus();
    maxNumberDisplay.textContent = maxNumber;
}

function setDifficulty(event) {
    const button = event.target;
    maxNumber = parseInt(button.dataset.max, 10);

    difficultyButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    initGame();
}

function handleGuess(event) {
    event.preventDefault();

    const guess = parseInt(input.value, 10);
    if (isNaN(guess) || guess < 1 || guess > maxNumber) {
        feedback.textContent = `Please enter a number between 1 and ${maxNumber}.`;
        return;
    }

    attempts++;
    attemptCount.textContent = attempts;

    if (guess < targetNumber) {
        const hint = isClose(guess) ? " You're getting close!" : '';
        feedback.textContent = 'Higher! Try a bigger number.' + hint;
        feedback.className = isClose(guess) ? 'higher close' : 'higher';
    } else if (guess > targetNumber) {
        const hint = isClose(guess) ? " You're getting close!" : '';
        feedback.textContent = 'Lower! Try a smaller number.' + hint;
        feedback.className = isClose(guess) ? 'lower close' : 'lower';
    } else {
        feedback.textContent = `You got it in ${attempts} ${attempts === 1 ? 'attempt' : 'attempts'}!`;
        feedback.className = 'win';
        winMessage.hidden = false;
        input.disabled = true;
    }

    input.value = '';
    input.focus();
}

form.addEventListener('submit', handleGuess);
playAgainButton.addEventListener('click', initGame);
difficultyButtons.forEach(btn => btn.addEventListener('click', setDifficulty));

initGame();
