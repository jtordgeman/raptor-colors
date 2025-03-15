import { ColorCodes, DEFAULT_BG } from './constants';

type ColorName = keyof typeof ColorCodes;

type ColorFunctions = {
    [K in ColorName]: (text: string) => string;
};

class Colors {
    private formatColor(text: string, color: ColorName, bgColor: string = DEFAULT_BG): string {
        const colorCode = ColorCodes[color];
        return `\x03${colorCode},${bgColor}${text}\x03`;
    }

    white(text: string): string {
        return this.formatColor(text, 'white');
    }
    black(text: string): string {
        return this.formatColor(text, 'black');
    }
    blue(text: string): string {
        return this.formatColor(text, 'blue');
    }
    green(text: string): string {
        return this.formatColor(text, 'green');
    }
    red(text: string): string {
        return this.formatColor(text, 'red');
    }
    brown(text: string): string {
        return this.formatColor(text, 'brown');
    }
    purple(text: string): string {
        return this.formatColor(text, 'purple');
    }
    orange(text: string): string {
        return this.formatColor(text, 'orange');
    }
    yellow(text: string): string {
        return this.formatColor(text, 'yellow');
    }
    lightGreen(text: string): string {
        return this.formatColor(text, 'lightGreen');
    }
    cyan(text: string): string {
        return this.formatColor(text, 'cyan');
    }
    lightCyan(text: string): string {
        return this.formatColor(text, 'lightCyan');
    }
    lightBlue(text: string): string {
        return this.formatColor(text, 'lightBlue');
    }
    pink(text: string): string {
        return this.formatColor(text, 'pink');
    }
    grey(text: string): string {
        return this.formatColor(text, 'grey');
    }
    lightGrey(text: string): string {
        return this.formatColor(text, 'lightGrey');
    }

    // Allow custom background colors
    withBackground(bgColor: ColorName): ColorFunctions {
        const bgColorCode = ColorCodes[bgColor];
        return {
            white: (text: string): string => this.formatColor(text, 'white', bgColorCode),
            black: (text: string): string => this.formatColor(text, 'black', bgColorCode),
            blue: (text: string): string => this.formatColor(text, 'blue', bgColorCode),
            green: (text: string): string => this.formatColor(text, 'green', bgColorCode),
            red: (text: string): string => this.formatColor(text, 'red', bgColorCode),
            brown: (text: string): string => this.formatColor(text, 'brown', bgColorCode),
            purple: (text: string): string => this.formatColor(text, 'purple', bgColorCode),
            orange: (text: string): string => this.formatColor(text, 'orange', bgColorCode),
            yellow: (text: string): string => this.formatColor(text, 'yellow', bgColorCode),
            lightGreen: (text: string): string => this.formatColor(text, 'lightGreen', bgColorCode),
            cyan: (text: string): string => this.formatColor(text, 'cyan', bgColorCode),
            lightCyan: (text: string): string => this.formatColor(text, 'lightCyan', bgColorCode),
            lightBlue: (text: string): string => this.formatColor(text, 'lightBlue', bgColorCode),
            pink: (text: string): string => this.formatColor(text, 'pink', bgColorCode),
            grey: (text: string): string => this.formatColor(text, 'grey', bgColorCode),
            lightGrey: (text: string): string => this.formatColor(text, 'lightGrey', bgColorCode),
        };
    }
}

// Export a singleton instance
const c = new Colors();
export default c;
