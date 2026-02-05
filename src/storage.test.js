import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
    loadGameData,
    saveGameData,
    getDefaultData,
    clearGameData,
    getPlayerName,
    setPlayerName,
    getBestScore,
    setBestScore,
    incrementGamesPlayed,
    getGamesPlayed
} from './storage.js';

// Mock localStorage
const localStorageMock = (() => {
    let store = {};
    return {
        getItem: vi.fn((key) => store[key] || null),
        setItem: vi.fn((key, value) => { store[key] = value; }),
        removeItem: vi.fn((key) => { delete store[key]; }),
        clear: vi.fn(() => { store = {}; })
    };
})();

Object.defineProperty(global, 'localStorage', { value: localStorageMock });

describe('storage', () => {
    beforeEach(() => {
        localStorageMock.clear();
        vi.clearAllMocks();
    });

    describe('getDefaultData', () => {
        it('returns correct default structure', () => {
            const data = getDefaultData();
            expect(data.playerName).toBe('');
            expect(data.gamesPlayed).toBe(0);
            expect(data.bestScores).toEqual({
                50: null,
                100: null,
                500: null,
                1000: null
            });
        });
    });

    describe('loadGameData', () => {
        it('returns default data when nothing stored', () => {
            const data = loadGameData();
            expect(data).toEqual(getDefaultData());
        });

        it('returns stored data when available', () => {
            const stored = { playerName: 'Alice', gamesPlayed: 5, bestScores: {} };
            localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(stored));

            const data = loadGameData();
            expect(data.playerName).toBe('Alice');
            expect(data.gamesPlayed).toBe(5);
        });
    });

    describe('saveGameData', () => {
        it('saves data to localStorage', () => {
            const data = { playerName: 'Bob', gamesPlayed: 3, bestScores: {} };
            saveGameData(data);

            expect(localStorageMock.setItem).toHaveBeenCalledWith(
                'number-guessing-game',
                JSON.stringify(data)
            );
        });
    });

    describe('clearGameData', () => {
        it('removes data from localStorage', () => {
            clearGameData();
            expect(localStorageMock.removeItem).toHaveBeenCalledWith('number-guessing-game');
        });
    });

    describe('getPlayerName', () => {
        it('returns empty string when no name set', () => {
            expect(getPlayerName()).toBe('');
        });

        it('returns stored name', () => {
            const stored = { playerName: 'Charlie', gamesPlayed: 0, bestScores: {} };
            localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(stored));

            expect(getPlayerName()).toBe('Charlie');
        });
    });

    describe('setPlayerName', () => {
        it('saves trimmed name', () => {
            setPlayerName('  Diana  ');

            const savedCall = localStorageMock.setItem.mock.calls[0];
            const savedData = JSON.parse(savedCall[1]);
            expect(savedData.playerName).toBe('Diana');
        });
    });

    describe('getBestScore', () => {
        it('returns null when no best score exists', () => {
            expect(getBestScore(100)).toBe(null);
        });

        it('returns stored best score', () => {
            const stored = {
                playerName: '',
                gamesPlayed: 1,
                bestScores: { 50: null, 100: 5, 500: null, 1000: null }
            };
            localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(stored));

            expect(getBestScore(100)).toBe(5);
        });
    });

    describe('setBestScore', () => {
        it('sets first best score and returns true', () => {
            const isNewRecord = setBestScore(100, 7);

            expect(isNewRecord).toBe(true);
            const savedCall = localStorageMock.setItem.mock.calls[0];
            const savedData = JSON.parse(savedCall[1]);
            expect(savedData.bestScores[100]).toBe(7);
        });

        it('updates best score when new score is better', () => {
            const stored = {
                playerName: '',
                gamesPlayed: 1,
                bestScores: { 50: null, 100: 10, 500: null, 1000: null }
            };
            localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(stored));

            const isNewRecord = setBestScore(100, 5);

            expect(isNewRecord).toBe(true);
        });

        it('does not update when new score is worse', () => {
            const stored = {
                playerName: '',
                gamesPlayed: 1,
                bestScores: { 50: null, 100: 5, 500: null, 1000: null }
            };
            localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(stored));

            const isNewRecord = setBestScore(100, 10);

            expect(isNewRecord).toBe(false);
        });
    });

    describe('incrementGamesPlayed', () => {
        it('increments games played count', () => {
            incrementGamesPlayed();

            const savedCall = localStorageMock.setItem.mock.calls[0];
            const savedData = JSON.parse(savedCall[1]);
            expect(savedData.gamesPlayed).toBe(1);
        });
    });

    describe('getGamesPlayed', () => {
        it('returns 0 when no games played', () => {
            expect(getGamesPlayed()).toBe(0);
        });

        it('returns stored games played count', () => {
            const stored = { playerName: '', gamesPlayed: 42, bestScores: {} };
            localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(stored));

            expect(getGamesPlayed()).toBe(42);
        });
    });
});
