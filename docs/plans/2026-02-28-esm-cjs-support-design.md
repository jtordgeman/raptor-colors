# ESM + CJS Dual Support Design

**Date:** 2026-02-28

## Summary

Add ESM support to raptor-colors using tsup as the build tool, producing dual CJS/ESM output while maintaining full backward compatibility for existing CJS consumers.

## Decisions

- **Build tool:** tsup (replaces tsc)
- **Formats:** CJS (`dist/index.js`) + ESM (`dist/index.mjs`)
- **Type declarations:** `dist/index.d.ts` (CJS) + `dist/index.d.mts` (ESM)
- **Node.js minimum:** 20

## Build

A `tsup.config.ts` at the root configures:
- Entry: `src/index.ts`
- Formats: `cjs`, `esm`
- DTS: enabled
- Target: `node20`

## `package.json` Changes

- Add `"exports"` field for condition-based resolution
- Keep `"main": "dist/index.js"` for legacy tooling
- Keep `"types": "dist/index.d.ts"` for legacy type resolution
- Add `"engines": { "node": ">=20" }`
- Replace `"build": "tsc"` with `"build": "tsup"`
- Add `tsup` to devDependencies

### `"exports"` structure

```json
"exports": {
  ".": {
    "import": {
      "types": "./dist/index.d.mts",
      "default": "./dist/index.mjs"
    },
    "require": {
      "types": "./dist/index.d.ts",
      "default": "./dist/index.js"
    }
  }
}
```

## Source Files

No changes to `src/index.ts` or `src/constants.ts`.
