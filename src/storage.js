// localStorage wrapper for game data persistence

const STORAGE_KEY = 'number-guessing-game';

export function loadGameData() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : getDefaultData();
    } catch {
        return getDefaultData();
    }
}

export function saveGameData(data) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
        // localStorage might be unavailable (private browsing, etc.)
    }
}

export function getDefaultData() {
    return {
        playerName: '',
        bestScores: {
            50: null,
            100: null,
            500: null,
            1000: null
        },
        gamesPlayed: 0
    };
}

export function clearGameData() {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch {
        // Ignore errors
    }
}

// Convenience functions
export function getPlayerName() {
    return loadGameData().playerName;
}

export function setPlayerName(name) {
    const data = loadGameData();
    data.playerName = name.trim();
    saveGameData(data);
}

// Best score functions
export function getBestScore(maxNumber) {
    const data = loadGameData();
    return data.bestScores[maxNumber] || null;
}

export function setBestScore(maxNumber, attempts) {
    const data = loadGameData();
    const currentBest = data.bestScores[maxNumber];
    const isNewRecord = currentBest === null || attempts < currentBest;

    if (isNewRecord) {
        data.bestScores[maxNumber] = attempts;
        saveGameData(data);
    }

    return isNewRecord;
}

// Games played tracking
export function incrementGamesPlayed() {
    const data = loadGameData();
    data.gamesPlayed++;
    saveGameData(data);
    return data.gamesPlayed;
}

export function getGamesPlayed() {
    return loadGameData().gamesPlayed;
}
