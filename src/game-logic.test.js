import { describe, it, expect } from 'vitest';
import {
    generateTargetNumber,
    getProximityThreshold,
    isClose,
    evaluateGuess,
    isValidGuess
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
