![npm](https://img.shields.io/npm/v/raptor-colors?style=plastic)

# Raptor Colors 🐡

> A TypeScript library for adding IRC-style colors to text strings.

## Installation

```bash
npm install raptor-colors
# or
yarn add raptor-colors
```

## Usage

```typescript
import rc from 'raptor-colors';

// Basic usage
console.log(rc.red('This text is red'));
console.log(rc.blue('This text is blue'));
console.log(rc.green('This text is green'));

// With custom background color
console.log(rc.withBackground('white').red('Red text on white background'));
```

## Available Colors

- white
- black
- blue
- green
- red
- brown
- purple
- orange
- yellow
- lightGreen
- cyan
- lightCyan
- lightBlue
- pink
- grey
- lightGrey

## Methods

### Basic Color Methods

Each color is available as a direct method:
```typescript
c.red(text: string): string
c.blue(text: string): string
// ... etc for all colors
```

### Custom Background Colors

Use the `withBackground` method to set a custom background color:
```typescript
c.withBackground(bgColor: ColorName).[color](text: string)
```

## License

MIT 
