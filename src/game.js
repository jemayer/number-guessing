// Number Guessing Game - DOM Controller
import { generateTargetNumber, evaluateGuess, isValidGuess, getGuessLimit, isGameOver, getWarmth } from './game-logic.js';
import { getPlayerName, setPlayerName, loadGameData, getBestScore, setBestScore, incrementGamesPlayed, getGamesPlayed, clearGameData, getLimitedMode, setLimitedMode, getTheme, setTheme } from './storage.js';

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

// Stats elements
const gamesPlayedCount = document.getElementById('games-played-count');
const bestEasy = document.getElementById('best-easy');
const bestMedium = document.getElementById('best-medium');
const bestHard = document.getElementById('best-hard');
const bestInsane = document.getElementById('best-insane');
const resetStatsBtn = document.getElementById('reset-stats-btn');

// Limited mode elements
const limitedModeCheckbox = document.getElementById('limited-mode-checkbox');
const guessLimitDisplay = document.getElementById('guess-limit-display');
const guessLimitInfo = document.getElementById('guess-limit-info');
const gameOverMessage = document.getElementById('game-over-message');
const revealNumber = document.getElementById('reveal-number');
const tryAgainButton = document.getElementById('try-again');

// Theme elements
const themeToggle = document.getElementById('theme-toggle');

// Heat bar elements
const heatBar = document.getElementById('heat-bar');
const heatFill = document.getElementById('heat-fill');

// Confetti container
const confettiContainer = document.getElementById('confetti-container');

let targetNumber;
let attempts;
let maxNumber = 100;
let limitedMode = false;

function initGame() {
    targetNumber = generateTargetNumber(maxNumber);
    attempts = 0;
    attemptCount.textContent = '0';
    feedback.textContent = '';
    feedback.className = '';
    winMessage.hidden = true;
    winMessage.classList.remove('new-record');
    gameOverMessage.hidden = true;
    input.disabled = false;
    input.max = maxNumber;
    input.value = '';
    input.focus();
    maxNumberDisplay.textContent = maxNumber;
    updateBestScoreDisplay();
    updateGuessLimitDisplay();
    resetHeatBar();
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

function updateHeatBar(guess) {
    const warmth = getWarmth(guess, targetNumber, maxNumber);
    heatBar.hidden = false;
    heatFill.style.width = `${Math.round(warmth * 100)}%`;
    // Shift gradient position: 0% = cold (shows blue), 100% = hot (shows red)
    heatFill.style.backgroundPosition = `${warmth * 100}% 0`;
}

function resetHeatBar() {
    heatBar.hidden = true;
    heatFill.style.width = '0%';
}

function shakeInput() {
    input.classList.remove('shake');
    // Force reflow so re-adding the class triggers the animation again
    void input.offsetWidth;
    input.classList.add('shake');
    input.addEventListener('animationend', () => input.classList.remove('shake'), { once: true });
}

function spawnConfetti() {
    confettiContainer.innerHTML = '';
    const colors = ['#f1c40f', '#e74c3c', '#3498db', '#2ecc71', '#9b59b6', '#e67e22'];
    for (let i = 0; i < 40; i++) {
        const piece = document.createElement('div');
        piece.classList.add('confetti-piece');
        piece.style.left = `${Math.random() * 100}%`;
        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDuration = `${1 + Math.random() * 2}s`;
        piece.style.animationDelay = `${Math.random() * 0.5}s`;
        confettiContainer.appendChild(piece);
    }
    setTimeout(() => { confettiContainer.innerHTML = ''; }, 4000);
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
        updateStatsDisplay();

        spawnConfetti();

        if (isNewRecord) {
            winText.textContent = 'New Record! Congratulations!';
            winMessage.classList.add('new-record');
        } else {
            winText.textContent = 'Congratulations! You got it!';
        }
    } else {
        shakeInput();
        updateHeatBar(guess);

        const hint = evaluation.isClose ? " You're getting close!" : '';
        feedback.textContent = evaluation.message + hint;
        feedback.className = evaluation.isClose ? `${evaluation.result} close` : evaluation.result;

        // Check for game over in limited mode
        if (limitedMode && isGameOver(attempts, maxNumber)) {
            feedback.textContent = 'Out of guesses!';
            feedback.className = 'game-over';
            gameOverMessage.hidden = false;
            revealNumber.textContent = targetNumber;
            input.disabled = true;
        }
    }

    updateGuessLimitDisplay();
    input.value = '';
    if (!input.disabled) input.focus();
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

// Stats functions
function updateStatsDisplay() {
    const data = loadGameData();

    gamesPlayedCount.textContent = data.gamesPlayed;

    bestEasy.textContent = data.bestScores[50] ?? '-';
    bestMedium.textContent = data.bestScores[100] ?? '-';
    bestHard.textContent = data.bestScores[500] ?? '-';
    bestInsane.textContent = data.bestScores[1000] ?? '-';
}

function resetStats() {
    if (confirm('Are you sure you want to reset all stats? This will clear your name, best scores, and games played.')) {
        clearGameData();
        updateStatsDisplay();
        updateBestScoreDisplay();
        updatePlayerGreeting();
        showNamePrompt();
    }
}

// Limited mode functions
function updateGuessLimitDisplay() {
    const limit = getGuessLimit(maxNumber);
    guessLimitDisplay.textContent = limit;

    if (limitedMode) {
        const remaining = limit - attempts;
        guessLimitInfo.textContent = ` / ${limit}`;
    } else {
        guessLimitInfo.textContent = '';
    }
}

function toggleLimitedMode() {
    limitedMode = limitedModeCheckbox.checked;
    setLimitedMode(limitedMode);
    initGame();
}

function initLimitedMode() {
    limitedMode = getLimitedMode();
    limitedModeCheckbox.checked = limitedMode;
    updateGuessLimitDisplay();
}

// Theme functions
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function toggleTheme() {
    const current = getTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    setTheme(next);
    applyTheme(next);
}

function initTheme() {
    applyTheme(getTheme());
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
resetStatsBtn.addEventListener('click', resetStats);
limitedModeCheckbox.addEventListener('change', toggleLimitedMode);
tryAgainButton.addEventListener('click', initGame);
themeToggle.addEventListener('click', toggleTheme);

// Initialize
initTheme();
initPlayerName();
initLimitedMode();
updateStatsDisplay();
initGame();
