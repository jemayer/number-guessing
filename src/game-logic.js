// Pure game logic - no DOM dependencies, fully testable

export function generateTargetNumber(maxNumber) {
    return Math.floor(Math.random() * maxNumber) + 1;
}

export function getProximityThreshold(maxNumber) {
    return Math.floor(maxNumber / 10);
}

export function isClose(guess, targetNumber, maxNumber) {
    const distance = Math.abs(guess - targetNumber);
    return distance > 0 && distance <= getProximityThreshold(maxNumber);
}

export function evaluateGuess(guess, targetNumber, maxNumber) {
    if (guess < targetNumber) {
        return {
            result: 'higher',
            message: 'Higher! Try a bigger number.',
            isClose: isClose(guess, targetNumber, maxNumber)
        };
    } else if (guess > targetNumber) {
        return {
            result: 'lower',
            message: 'Lower! Try a smaller number.',
            isClose: isClose(guess, targetNumber, maxNumber)
        };
    } else {
        return {
            result: 'correct',
            message: null,
            isClose: false
        };
    }
}

export function isValidGuess(guess, maxNumber) {
    return !isNaN(guess) && guess >= 1 && guess <= maxNumber;
}

const GUESS_LIMITS = {
    50: 8,
    100: 10,
    500: 13,
    1000: 15
};

export function getGuessLimit(maxNumber) {
    return GUESS_LIMITS[maxNumber] || 10;
}

export function isGameOver(attempts, maxNumber) {
    return attempts >= getGuessLimit(maxNumber);
}
