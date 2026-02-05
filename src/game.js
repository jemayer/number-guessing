// Number Guessing Game - DOM Controller
import { generateTargetNumber, evaluateGuess, isValidGuess } from './game-logic.js';
import { getPlayerName, setPlayerName, loadGameData, getBestScore, setBestScore, incrementGamesPlayed } from './storage.js';

const form = document.getElementById('guess-form');
const input = document.getElementById('guess-input');
const feedback = document.getElementById('feedback');
const attemptCount = document.getElementById('attempt-count');
const bestScoreDisplay = document.getElementById('best-score-display');
const winMessage = document.getElementById('win-message');
const winText = document.getElementById('win-text');
const playAgainButton = document.getElementById('play-again');
const difficultyButtons = document.querySelectorAll('#difficulty-selector button');
const maxNumberDisplay = document.getElementById('max-number');

// Player name elements
const playerGreeting = document.getElementById('player-greeting');
const changeNameBtn = document.getElementById('change-name-btn');
const namePrompt = document.getElementById('name-prompt');
const playerNameInput = document.getElementById('player-name-input');
const saveNameBtn = document.getElementById('save-name-btn');
const skipNameBtn = document.getElementById('skip-name-btn');

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
    winMessage.classList.remove('new-record');
    input.disabled = false;
    input.max = maxNumber;
    input.value = '';
    input.focus();
    maxNumberDisplay.textContent = maxNumber;
    updateBestScoreDisplay();
}

function updateBestScoreDisplay() {
    const best = getBestScore(maxNumber);
    if (best !== null) {
        bestScoreDisplay.textContent = ` | Best: ${best}`;
    } else {
        bestScoreDisplay.textContent = '';
    }
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

        // Track best score
        incrementGamesPlayed();
        const isNewRecord = setBestScore(maxNumber, attempts);
        updateBestScoreDisplay();

        if (isNewRecord) {
            winText.textContent = 'New Record! Congratulations!';
            winMessage.classList.add('new-record');
        } else {
            winText.textContent = 'Congratulations! You got it!';
        }
    } else {
        const hint = evaluation.isClose ? " You're getting close!" : '';
        feedback.textContent = evaluation.message + hint;
        feedback.className = evaluation.isClose ? `${evaluation.result} close` : evaluation.result;
    }

    input.value = '';
    input.focus();
}

// Player name functions
function updatePlayerGreeting() {
    const name = getPlayerName();
    if (name) {
        playerGreeting.textContent = `Playing as ${name}`;
        changeNameBtn.hidden = false;
        namePrompt.hidden = true;
    } else {
        playerGreeting.textContent = '';
        changeNameBtn.hidden = true;
    }
}

function showNamePrompt() {
    namePrompt.hidden = false;
    playerNameInput.value = getPlayerName();
    playerNameInput.focus();
}

function saveName() {
    setPlayerName(playerNameInput.value);
    namePrompt.hidden = true;
    updatePlayerGreeting();
    input.focus();
}

function skipName() {
    namePrompt.hidden = true;
    updatePlayerGreeting();
    input.focus();
}

function initPlayerName() {
    const data = loadGameData();
    // Show name prompt on first visit (no data stored yet)
    if (!data.playerName && data.gamesPlayed === 0) {
        showNamePrompt();
    } else {
        updatePlayerGreeting();
    }
}

// Event listeners
form.addEventListener('submit', handleGuess);
playAgainButton.addEventListener('click', initGame);
difficultyButtons.forEach(btn => btn.addEventListener('click', setDifficulty));
changeNameBtn.addEventListener('click', showNamePrompt);
saveNameBtn.addEventListener('click', saveName);
skipNameBtn.addEventListener('click', skipName);
playerNameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') saveName();
    if (e.key === 'Escape') skipName();
});

// Initialize
initPlayerName();
initGame();
