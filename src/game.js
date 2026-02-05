// Number Guessing Game - DOM Controller
import { generateTargetNumber, evaluateGuess, isValidGuess } from './game-logic.js';

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

function initGame() {
    targetNumber = generateTargetNumber(maxNumber);
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
    if (!isValidGuess(guess, maxNumber)) {
        feedback.textContent = `Please enter a number between 1 and ${maxNumber}.`;
        return;
    }

    attempts++;
    attemptCount.textContent = attempts;

    const evaluation = evaluateGuess(guess, targetNumber, maxNumber);

    if (evaluation.result === 'correct') {
        feedback.textContent = `You got it in ${attempts} ${attempts === 1 ? 'attempt' : 'attempts'}!`;
        feedback.className = 'win';
        winMessage.hidden = false;
        input.disabled = true;
    } else {
        const hint = evaluation.isClose ? " You're getting close!" : '';
        feedback.textContent = evaluation.message + hint;
        feedback.className = evaluation.isClose ? `${evaluation.result} close` : evaluation.result;
    }

    input.value = '';
    input.focus();
}

form.addEventListener('submit', handleGuess);
playAgainButton.addEventListener('click', initGame);
difficultyButtons.forEach(btn => btn.addEventListener('click', setDifficulty));

initGame();
