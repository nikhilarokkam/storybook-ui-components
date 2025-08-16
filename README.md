# Storybook UI Components (React + TypeScript + Tailwind + Storybook)

This repository contains two reusable UI components:
- **InputField**: states (disabled, invalid, loading), variants (filled, outlined, ghost), sizes (sm, md, lg), clear button, password toggle, helper & error messages, light/dark support.
- **DataTable**: tabular display, sorting, row selection (multi), loading & empty states.

## Quickstart (you do this after unzipping)

1. **Install Node.js LTS** (>= 18). On Windows, use the official installer. On macOS, use the pkg installer or `nvm`.
2. Open the folder in VS Code.
3. Run:
   ```bash
   npm install
   npm run dev
   ```
   Visit the URL that appears (usually http://localhost:5173).
4. Start Storybook:
   ```bash
   npm run storybook
   ```
   Then open http://localhost:6006

## Component Locations
- `src/components/input-field/InputField.tsx`
- `src/components/data-table/DataTable.tsx` (+ `types.ts`)

## How to Use in App code
```tsx
import { InputField } from './src/components/input-field/InputField'
import { DataTable } from './src/components/data-table/DataTable'
```

## Building & Deploying Storybook
- **GitHub**: Initialize a repo and push your code:
  ```bash
  git init
  git add -A
  git commit -m "feat: storybook ui components"
  git branch -M main
  git remote add origin <YOUR_REPO_URL>
  git push -u origin main
  ```
- **Chromatic (recommended)**:
  1. Create a new project at chromatic.com and connect your GitHub repo.
  2. Add a project token as a secret in your repo (e.g., `CHROMATIC_PROJECT_TOKEN`).
  3. Run locally for a one-off build:
     ```bash
     npx chromatic --project-token=<token>
     ```
  4. Or create a GitHub Action that builds Storybook on each push.
- **Vercel (alternative)**:
  1. Run `npm run build-storybook` to output static storybook to `storybook-static/`.
  2. Import your repo in Vercel and set the build output directory to `storybook-static`.

## Accessibility Notes
- Inputs associate `<label>` with the input `id`.
- `aria-invalid` is set when invalid.
- Clear & password buttons have `aria-label`.
- Table uses native `<table>` semantics; header cells are clickable when sortable.

## Theming
Tailwind dark mode is class-based. Wrap Storybook or App with `<html class="dark">` for dark mode.

## Scripts
- `npm run dev` - Vite dev server
- `npm run storybook` - Storybook dev
- `npm run build` - production build of app
- `npm run build-storybook` - static Storybook
