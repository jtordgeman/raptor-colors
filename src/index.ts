import { ColorCodes } from './constants';

type ColorName = keyof typeof ColorCodes;

type ColorFunctions = {
    [K in ColorName]: (text: string) => string;
};

/**
 * Interface to provide type definitions for the dynamically generated color methods.
 */
interface Colors extends ColorFunctions {}

class Colors {
    constructor() {
        // Dynamically create methods for each color in ColorCodes
        (Object.keys(ColorCodes) as ColorName[]).forEach((color) => {
            (this as any)[color] = (text: string) => this.formatColor(text, color);
        });
    }

    private formatColor(text: string, color: ColorName, bgColor?: ColorName): string {
        const colorCode = ColorCodes[color];
        if (bgColor) {
            const bgColorCode = ColorCodes[bgColor];
            return `\x03${colorCode},${bgColorCode}${text}\x03`;
        }
        return `\x03${colorCode}${text}\x03`;
    }

    /**
     * Returns an object containing color functions that apply the specified background color.
     * @param bgColor The background color to apply.
     */
    withBackground(bgColor: ColorName): ColorFunctions {
        const bgFuncs = {} as ColorFunctions;
        (Object.keys(ColorCodes) as ColorName[]).forEach((color) => {
            bgFuncs[color] = (text: string) => this.formatColor(text, color, bgColor);
        });
        return bgFuncs;
    }
}

// Export a singleton instance
const c = new Colors();
export default c;
