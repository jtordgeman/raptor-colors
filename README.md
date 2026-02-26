![npm](https://img.shields.io/npm/v/raptor-colors?style=plastic)

# Raptor Colors 🌈

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

All 16 colors listed above are available as direct methods:
```typescript
rc.red('This text is red')
rc.blue('This text is blue')
// ... all colors follow the same pattern
```

### Custom Background Colors

Use `withBackground` to combine a foreground and background color:
```typescript
rc.withBackground('black').yellow('Yellow text on black background')
```

The `bgColor` parameter accepts any value from the Available Colors list (`ColorName` type).

## License

MIT 
