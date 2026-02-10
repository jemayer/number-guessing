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

export function getWarmth(guess, targetNumber, maxNumber) {
    const distance = Math.abs(guess - targetNumber);
    const maxDistance = maxNumber - 1;
    return 1 - distance / maxDistance;
}

export function getHeatColor(warmth) {
    // Three zones: blue (cold) → yellow (mid) → red (hot)
    const blue = [52, 152, 219];   // #3498db
    const yellow = [241, 196, 15]; // #f1c40f
    const red = [231, 76, 60];     // #e74c3c

    let from, to, t;
    if (warmth <= 0.5) {
        from = blue;
        to = yellow;
        t = warmth / 0.5;
    } else {
        from = yellow;
        to = red;
        t = (warmth - 0.5) / 0.5;
    }

    const r = Math.round(from[0] + (to[0] - from[0]) * t);
    const g = Math.round(from[1] + (to[1] - from[1]) * t);
    const b = Math.round(from[2] + (to[2] - from[2]) * t);
    return `rgb(${r}, ${g}, ${b})`;
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
