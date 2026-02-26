# Modernization Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace Jest+ts-jest+ts-node+ESLint+Prettier with Vitest+Biome, update all deps, and improve tsconfig — zero logic changes.

**Architecture:** Cut `refactor/modernize` from `main`, strip old tooling, wire in Biome and Vitest, verify all tests still pass and lint is clean, push and open PR.

**Tech Stack:** Yarn 4, Biome, Vitest, TypeScript 5.x

---

### Task 1: Create and switch to the modernize branch

**Files:** none

**Step 1: Create branch from main**

```bash
git checkout main
git checkout -b refactor/modernize
```

**Step 2: Verify you are on the right branch**

```bash
git branch
```
Expected: `* refactor/modernize`

**Step 3: Commit**

No files changed yet — no commit needed.

---

### Task 2: Remove old tooling packages

**Files:**
- Modify: `package.json`

**Step 1: Remove devDependencies**

Remove these entries from `devDependencies` in `package.json`:
- `@types/jest`
- `@typescript-eslint/eslint-plugin`
- `@typescript-eslint/parser`
- `eslint`
- `eslint-config-prettier`
- `eslint-plugin-prettier`
- `jest`
- `lint-staged`
- `prettier`
- `ts-jest`
- `ts-node`

Also remove the `lint-staged` config block from `package.json` if present.

**Step 2: Remove old config files**

```bash
rm eslint.config.js jest.config.js
```

**Step 3: Verify files are gone**

```bash
ls *.config.js
```
Expected: `No such file or directory` or empty.

**Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove eslint, prettier, jest, ts-jest, ts-node"
```

---

### Task 3: Add Biome

**Files:**
- Modify: `package.json`
- Create: `biome.json`

**Step 1: Add Biome to devDependencies in package.json**

Add to `devDependencies`:
```json
"@biomejs/biome": "^1.9.4"
```

**Step 2: Create biome.json**

```json
{
  "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
  "organizeImports": {
    "enabled": true
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 4,
    "lineWidth": 100
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "trailingCommas": "es5"
    }
  },
  "files": {
    "ignore": ["dist/**", "node_modules/**", "coverage/**"]
  }
}
```

**Step 3: Update scripts in package.json**

Replace the old lint/format scripts:
```json
"lint": "biome lint .",
"lint:fix": "biome lint --write .",
"format": "biome format --write src/",
"format:check": "biome format src/"
```

**Step 4: Commit**

```bash
git add package.json biome.json
git commit -m "chore: add Biome for linting and formatting"
```

---

### Task 4: Add Vitest

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`

**Step 1: Add Vitest to devDependencies in package.json**

Add to `devDependencies`:
```json
"vitest": "^3.0.0"
```

**Step 2: Create vitest.config.ts**

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        include: ['__tests__/**/*.test.ts'],
    },
});
```

**Step 3: Update test scripts in package.json**

```json
"test": "vitest run",
"test:watch": "vitest",
"test:coverage": "vitest run --coverage"
```

**Step 4: Remove the `prepare` script's dependency on `ts-node`**

The `prepare` script runs `yarn build` (tsc) — this is fine, no change needed.

**Step 5: Commit**

```bash
git add package.json vitest.config.ts
git commit -m "chore: add Vitest, replace Jest"
```

---

### Task 5: Update test file imports

**Files:**
- Modify: `__tests__/colors.test.ts`

**Step 1: Add vitest imports at top of __tests__/colors.test.ts**

Add this as the first line:
```ts
import { describe, it, expect } from 'vitest';
```

(Vitest supports globals mode configured in Task 4, so this import is optional if globals: true is set — but explicit is safer.)

**Step 2: Remove the `@ts-ignore` comment**

The line:
```ts
// @ts-ignore - Dynamic access to color methods
```
can stay for now since the source hasn't changed yet. Leave it as-is.

**Step 3: Commit**

```bash
git add __tests__/colors.test.ts
git commit -m "chore: update test imports for Vitest"
```

---

### Task 6: Install updated dependencies

**Files:**
- `yarn.lock` (auto-updated)
- `node_modules/` (auto-updated)

**Step 1: Install**

```bash
yarn install
```

Expected: No errors. Lock file updated.

**Step 2: Commit the updated lock file**

```bash
git add yarn.lock
git commit -m "chore: update yarn.lock after tooling changes"
```

---

### Task 7: Update TypeScript config

**Files:**
- Modify: `tsconfig.json`

**Step 1: Update tsconfig.json**

Replace the contents with:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "moduleResolution": "node",
    "declaration": true,
    "declarationMap": true,
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

Key changes: `target` bumped to `ES2020`, added `declarationMap`.

**Step 2: Commit**

```bash
git add tsconfig.json
git commit -m "chore: bump tsconfig target to ES2020, add declarationMap"
```

---

### Task 8: Verify everything works

**Step 1: Run the build**

```bash
yarn build
```
Expected: No errors. `dist/` contains `index.js`, `index.d.ts`, `index.d.ts.map`.

**Step 2: Run the tests**

```bash
yarn test
```
Expected: All tests pass.

**Step 3: Run the linter**

```bash
yarn lint
```
Expected: No errors (or fix any Biome-reported issues with `yarn lint:fix`).

**Step 4: If lint:fix changed files, commit them**

```bash
git add -A
git commit -m "style: apply Biome formatting"
```

---

### Task 9: Push branch and open PR

**Step 1: Push the branch**

```bash
git push -u origin refactor/modernize
```

**Step 2: Open PR**

```bash
gh pr create \
  --title "refactor: modernize toolchain (Biome + Vitest)" \
  --body "$(cat <<'EOF'
## Summary
- Replace ESLint + Prettier with Biome (linting + formatting in one tool)
- Replace Jest + ts-jest + ts-node with Vitest (native TS, no extra transpiler)
- Bump tsconfig target to ES2020, add declarationMap
- Removes the transitive dep chain that caused tar/glob/js-yaml vulnerabilities

## Test plan
- [ ] `yarn build` passes
- [ ] `yarn test` — all tests pass
- [ ] `yarn lint` — no errors

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

---
