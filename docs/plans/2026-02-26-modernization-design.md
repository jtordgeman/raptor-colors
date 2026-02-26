# Modernization Design — raptor-colors

**Date:** 2026-02-26

## Goal

Modernize the dev toolchain on a dedicated `refactor/modernize` branch (PR separate from `refactor/dynamic-color-methods`). No source logic changes.

## Git Strategy

- Branch: `refactor/modernize` cut from `main`
- `main` stays as-is (CI workflow + .gitignore fix intact)
- `refactor/dynamic-color-methods` stays as its own separate PR

## Tooling Changes

### Replace ESLint + Prettier → Biome
- Remove: `eslint`, `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`, `eslint-config-prettier`, `eslint-plugin-prettier`, `prettier`
- Add: `@biomejs/biome`
- Delete: `eslint.config.js`
- Add: `biome.json`
- Update `package.json` scripts: `lint`, `lint:fix`, `format`, `format:check`

### Replace Jest + ts-jest + ts-node → Vitest
- Remove: `jest`, `ts-jest`, `ts-node`, `@types/jest`
- Add: `vitest`
- Delete: `jest.config.js`
- Update `package.json` scripts: `test`, `test:watch`, `test:coverage`
- Update test file imports: `describe/it/expect` from `vitest` (or keep as globals via config)

### TypeScript / tsconfig
- Bump `typescript` to latest
- Update `tsconfig.json`: target `ES2020`+, add dual ESM+CJS output or at minimum switch to `NodeNext` module resolution
- Review `@types/node` version

### package.json cleanup
- Remove `husky` + `lint-staged` if they only ran ESLint/Prettier (replace with Biome's built-in git hook support, or keep Husky pointing at Biome)
- Update `packageManager` field if yarn version bumped

## Success Criteria

- `yarn lint` passes with Biome
- `yarn test` passes with Vitest
- `yarn build` produces valid output
- No high/medium vulnerabilities from transitive deps (ts-node/jest toolchain was the main source)
- PR contains only tooling changes, zero logic changes
