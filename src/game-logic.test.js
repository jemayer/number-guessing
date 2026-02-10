import { describe, it, expect } from 'vitest';
import {
    generateTargetNumber,
    getProximityThreshold,
    isClose,
    evaluateGuess,
    getWarmth,
    isValidGuess,
    getGuessLimit,
    isGameOver
} from './game-logic.js';

describe('generateTargetNumber', () => {
    it('generates a number within bounds for easy mode', () => {
        for (let i = 0; i < 100; i++) {
            const num = generateTargetNumber(50);
            expect(num).toBeGreaterThanOrEqual(1);
            expect(num).toBeLessThanOrEqual(50);
        }
    });

    it('generates a number within bounds for insane mode', () => {
        for (let i = 0; i < 100; i++) {
            const num = generateTargetNumber(1000);
            expect(num).toBeGreaterThanOrEqual(1);
            expect(num).toBeLessThanOrEqual(1000);
        }
    });
});

describe('getProximityThreshold', () => {
    it('returns 5 for easy mode (1-50)', () => {
        expect(getProximityThreshold(50)).toBe(5);
    });

    it('returns 10 for medium mode (1-100)', () => {
        expect(getProximityThreshold(100)).toBe(10);
    });

    it('returns 50 for hard mode (1-500)', () => {
        expect(getProximityThreshold(500)).toBe(50);
    });

    it('returns 100 for insane mode (1-1000)', () => {
        expect(getProximityThreshold(1000)).toBe(100);
    });
});

describe('isClose', () => {
    it('returns true when guess is within threshold', () => {
        expect(isClose(45, 50, 100)).toBe(true);  // 5 away, threshold is 10
        expect(isClose(55, 50, 100)).toBe(true);  // 5 away, threshold is 10
    });

    it('returns false when guess is outside threshold', () => {
        expect(isClose(30, 50, 100)).toBe(false);  // 20 away, threshold is 10
        expect(isClose(70, 50, 100)).toBe(false);  // 20 away, threshold is 10
    });

    it('returns false when guess is exactly correct', () => {
        expect(isClose(50, 50, 100)).toBe(false);  // distance is 0
    });

    it('returns true at exactly the threshold', () => {
        expect(isClose(40, 50, 100)).toBe(true);   // exactly 10 away
        expect(isClose(60, 50, 100)).toBe(true);   // exactly 10 away
    });
});

describe('evaluateGuess', () => {
    it('returns higher when guess is too low', () => {
        const result = evaluateGuess(30, 50, 100);
        expect(result.result).toBe('higher');
        expect(result.message).toBe('Higher! Try a bigger number.');
    });

    it('returns lower when guess is too high', () => {
        const result = evaluateGuess(70, 50, 100);
        expect(result.result).toBe('lower');
        expect(result.message).toBe('Lower! Try a smaller number.');
    });

    it('returns correct when guess matches', () => {
        const result = evaluateGuess(50, 50, 100);
        expect(result.result).toBe('correct');
        expect(result.isClose).toBe(false);
    });

    it('indicates when guess is close', () => {
        const result = evaluateGuess(45, 50, 100);
        expect(result.result).toBe('higher');
        expect(result.isClose).toBe(true);
    });

    it('indicates when guess is not close', () => {
        const result = evaluateGuess(20, 50, 100);
        expect(result.result).toBe('higher');
        expect(result.isClose).toBe(false);
    });
});

describe('getWarmth', () => {
    it('returns 1 for an exact match', () => {
        expect(getWarmth(50, 50, 100)).toBe(1);
    });

    it('returns 0 for the farthest possible guess', () => {
        expect(getWarmth(1, 100, 100)).toBeCloseTo(0, 1);
        expect(getWarmth(100, 1, 100)).toBeCloseTo(0, 1);
    });

    it('returns ~0.5 for a guess halfway through the range', () => {
        expect(getWarmth(50, 100, 100)).toBeCloseTo(0.495, 2);
    });

    it('increases as guess gets closer to target', () => {
        const far = getWarmth(10, 80, 100);
        const mid = getWarmth(50, 80, 100);
        const near = getWarmth(75, 80, 100);
        expect(near).toBeGreaterThan(mid);
        expect(mid).toBeGreaterThan(far);
    });

    it('works across different difficulty ranges', () => {
        // Same relative distance should give same warmth
        const warmth100 = getWarmth(50, 100, 100);
        const warmth1000 = getWarmth(500, 1000, 1000);
        expect(warmth100).toBeCloseTo(warmth1000, 2);
    });
});

describe('isValidGuess', () => {
    it('accepts valid guesses', () => {
        expect(isValidGuess(1, 100)).toBe(true);
        expect(isValidGuess(50, 100)).toBe(true);
        expect(isValidGuess(100, 100)).toBe(true);
    });

    it('rejects guesses below minimum', () => {
        expect(isValidGuess(0, 100)).toBe(false);
        expect(isValidGuess(-5, 100)).toBe(false);
    });

    it('rejects guesses above maximum', () => {
        expect(isValidGuess(101, 100)).toBe(false);
        expect(isValidGuess(500, 100)).toBe(false);
    });

    it('rejects NaN', () => {
        expect(isValidGuess(NaN, 100)).toBe(false);
    });
});

describe('getGuessLimit', () => {
    it('returns 8 for easy mode', () => {
        expect(getGuessLimit(50)).toBe(8);
    });

    it('returns 10 for medium mode', () => {
        expect(getGuessLimit(100)).toBe(10);
    });

    it('returns 13 for hard mode', () => {
        expect(getGuessLimit(500)).toBe(13);
    });

    it('returns 15 for insane mode', () => {
        expect(getGuessLimit(1000)).toBe(15);
    });
});

describe('isGameOver', () => {
    it('returns false when attempts are below limit', () => {
        expect(isGameOver(5, 100)).toBe(false);
        expect(isGameOver(9, 100)).toBe(false);
    });

    it('returns true when attempts reach limit', () => {
        expect(isGameOver(10, 100)).toBe(true);
        expect(isGameOver(8, 50)).toBe(true);
    });

    it('returns true when attempts exceed limit', () => {
        expect(isGameOver(11, 100)).toBe(true);
    });
});
