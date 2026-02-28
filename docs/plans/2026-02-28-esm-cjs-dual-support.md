# ESM + CJS Dual Support Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add ESM output alongside existing CJS output so any project (ESM or CJS) can consume raptor-colors without workarounds.

**Architecture:** Replace `tsc` with `tsup` as the build tool. tsup compiles `src/index.ts` to both `dist/index.js` (CJS) and `dist/index.mjs` (ESM), generating matching `.d.ts` and `.d.mts` type declarations. The `package.json` `"exports"` field routes consumers to the correct format automatically; the legacy `"main"` and `"types"` fields are preserved for older tooling.

**Tech Stack:** tsup, TypeScript, Yarn 4, Node 20+

---

### Task 1: Install tsup

**Files:**
- Modify: `package.json` (devDependencies — yarn handles this)

**Step 1: Install tsup as a dev dependency**

```bash
yarn add -D tsup
```

**Step 2: Verify it was added**

Open `package.json` and confirm `tsup` appears under `devDependencies`.

---

### Task 2: Create `tsup.config.ts`

**Files:**
- Create: `tsup.config.ts`

**Step 1: Create the file**

```ts
import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    clean: true,
    target: 'node20',
});
```

> `clean: true` wipes `dist/` before each build so stale files never linger.
> `dts: true` generates `.d.ts` (for CJS) and `.d.mts` (for ESM) automatically.

---

### Task 3: Update `package.json`

**Files:**
- Modify: `package.json`

**Step 1: Update the `build` script**

Change:
```json
"build": "tsc"
```
To:
```json
"build": "tsup"
```

**Step 2: Add the `"exports"` field**

Add this alongside the existing `"main"` field:

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

**Step 3: Add the `"engines"` field**

```json
"engines": {
    "node": ">=20"
}
```

**Step 4: Verify `"main"` and `"types"` are unchanged**

These should still be present exactly as they were (backward compat for older tooling):
```json
"main": "dist/index.js",
"types": "dist/index.d.ts"
```

---

### Task 4: Run the build and verify output

**Step 1: Run the build**

```bash
yarn build
```

Expected: tsup prints something like:
```
CJS dist/index.js
ESM dist/index.mjs
DTS dist/index.d.ts
DTS dist/index.d.mts
```

**Step 2: Verify all four files exist**

```bash
ls dist/
```

Expected output includes all of:
- `index.js` — CJS bundle
- `index.mjs` — ESM bundle
- `index.d.ts` — CJS type declarations
- `index.d.mts` — ESM type declarations

**Step 3: Spot-check CJS output**

```bash
head -5 dist/index.js
```

Expected: starts with `"use strict";` and uses `exports.` or `module.exports`.

**Step 4: Spot-check ESM output**

```bash
head -5 dist/index.mjs
```

Expected: starts with `import` or `var` (esbuild-compiled ESM — no `"use strict"`, no `require`).

---

### Task 5: Run existing tests

**Files:**
- Test: `__tests__/colors.test.ts`

**Step 1: Run the full test suite**

```bash
yarn test
```

Expected: all tests pass. The tests import from `src/` directly, so they are unaffected by build changes.

**Step 2: If any tests fail**

Do not proceed. Check whether a `tsconfig.json` change caused a TypeScript resolution issue and revert any changes to it.

---

### Task 6: Commit

**Step 1: Stage the changed and new files**

```bash
git add package.json tsup.config.ts yarn.lock
```

**Step 2: Commit**

```bash
git commit -m "feat: add ESM support via tsup dual CJS/ESM build"
```
