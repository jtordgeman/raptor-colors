import { describe, it, expect } from 'vitest';
import c from '../src/index';
import { ColorCodes } from '../src/constants';

describe('Raptor Colors', () => {
    describe('Basic color formatting', () => {
        it('should format text with red color', () => {
            const result = c.red('test');
            expect(result).toBe(`\x0304test\x03`);
        });

        it('should format text with blue color', () => {
            const result = c.blue('test');
            expect(result).toBe(`\x0302test\x03`);
        });

        it('should format text with green color', () => {
            const result = c.green('test');
            expect(result).toBe(`\x0303test\x03`);
        });
    });

    describe('Background colors', () => {
        it('should format text with red on white background', () => {
            const result = c.withBackground('white').red('test');
            expect(result).toBe(`\x0304,00test\x03`);
        });

        it('should format text with blue on black background', () => {
            const result = c.withBackground('black').blue('test');
            expect(result).toBe(`\x0302,01test\x03`);
        });

        // Additional tests for uncovered methods
        it('should format text with brown on yellow background', () => {
            const result = c.withBackground('yellow').brown('test');
            expect(result).toBe(`\x0305,08test\x03`);
        });

        it('should format text with purple on cyan background', () => {
            const result = c.withBackground('cyan').purple('test');
            expect(result).toBe(`\x0306,10test\x03`);
        });

        it('should format text with orange on lightCyan background', () => {
            const result = c.withBackground('lightCyan').orange('test');
            expect(result).toBe(`\x0307,11test\x03`);
        });

        it('should format text with lightGreen on lightBlue background', () => {
            const result = c.withBackground('lightBlue').lightGreen('test');
            expect(result).toBe(`\x0309,12test\x03`);
        });

        it('should format text with cyan on pink background', () => {
            const result = c.withBackground('pink').cyan('test');
            expect(result).toBe(`\x0310,13test\x03`);
        });

        it('should format text with lightCyan on grey background', () => {
            const result = c.withBackground('grey').lightCyan('test');
            expect(result).toBe(`\x0311,14test\x03`);
        });

        it('should format text with lightBlue on lightGrey background', () => {
            const result = c.withBackground('lightGrey').lightBlue('test');
            expect(result).toBe(`\x0312,15test\x03`);
        });

        it('should format text with pink on blue background', () => {
            const result = c.withBackground('blue').pink('test');
            expect(result).toBe(`\x0313,02test\x03`);
        });

        it('should format text with grey on green background', () => {
            const result = c.withBackground('green').grey('test');
            expect(result).toBe(`\x0314,03test\x03`);
        });

        it('should format text with lightGrey on red background', () => {
            const result = c.withBackground('red').lightGrey('test');
            expect(result).toBe(`\x0315,04test\x03`);
        });
    });

    describe('All colors', () => {
        // Test all available colors
        Object.keys(ColorCodes).forEach((color) => {
            it(`should format text with ${color} color`, () => {
                const colorCode = ColorCodes[color as keyof typeof ColorCodes];
                // @ts-ignore - Dynamic access to color methods
                const result = c[color]('test');
                expect(result).toBe(`\x03${colorCode}test\x03`);
            });
        });
    });

    describe('Edge cases', () => {
        it('should handle empty strings', () => {
            const result = c.red('');
            expect(result).toBe(`\x0304\x03`);
        });

        it('should handle empty strings with background', () => {
            const result = c.withBackground('blue').green('');
            expect(result).toBe(`\x0303,02\x03`);
        });

        it('should handle long strings', () => {
            const longString = 'a'.repeat(1000);
            const result = c.blue(longString);
            expect(result).toBe(`\x0302${longString}\x03`);
        });
    });
});
