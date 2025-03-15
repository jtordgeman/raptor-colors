import { ColorCodes } from './constants';

type ColorName = keyof typeof ColorCodes;

type ColorFunctions = {
    [K in ColorName]: (text: string) => string;
};

class Colors {
    private formatColor(text: string, color: ColorName, bgColor?: ColorName): string {
        const colorCode = ColorCodes[color];
        if (bgColor) {
            const bgColorCode = ColorCodes[bgColor];
            return `\x03${colorCode},${bgColorCode}${text}\x03`;
        }
        return `\x03${colorCode}${text}\x03`;
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
        return {
            white: (text: string): string => this.formatColor(text, 'white', bgColor),
            black: (text: string): string => this.formatColor(text, 'black', bgColor),
            blue: (text: string): string => this.formatColor(text, 'blue', bgColor),
            green: (text: string): string => this.formatColor(text, 'green', bgColor),
            red: (text: string): string => this.formatColor(text, 'red', bgColor),
            brown: (text: string): string => this.formatColor(text, 'brown', bgColor),
            purple: (text: string): string => this.formatColor(text, 'purple', bgColor),
            orange: (text: string): string => this.formatColor(text, 'orange', bgColor),
            yellow: (text: string): string => this.formatColor(text, 'yellow', bgColor),
            lightGreen: (text: string): string => this.formatColor(text, 'lightGreen', bgColor),
            cyan: (text: string): string => this.formatColor(text, 'cyan', bgColor),
            lightCyan: (text: string): string => this.formatColor(text, 'lightCyan', bgColor),
            lightBlue: (text: string): string => this.formatColor(text, 'lightBlue', bgColor),
            pink: (text: string): string => this.formatColor(text, 'pink', bgColor),
            grey: (text: string): string => this.formatColor(text, 'grey', bgColor),
            lightGrey: (text: string): string => this.formatColor(text, 'lightGrey', bgColor),
        };
    }
}

// Export a singleton instance
const c = new Colors();
export default c;
