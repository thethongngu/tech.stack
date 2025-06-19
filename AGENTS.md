# Developer Agent Guide

## Project Layout
- `src/app`: Next.js pages and layout. Each route has its folder (`wizard`, `technologies`, etc.).
- `src/components`: Reusable React components. Use ShadCN UI components whenever possible (stored under `src/components/ui`). Only create new ShadCN components if an equivalent does not already exist.
- `src/contexts`: React context providers (e.g., `ThemeContext`).
- `src/lib`: Utility modules. Includes `recommendationUtils.ts` with tests.
- `src/data`: JSON data files for technologies and categories.
- `src/types`: TypeScript interfaces.

## UI and Design
- Global design tokens are defined in `src/app/globals.css` as CSS variables for light and dark mode. Reuse these tokens for colors and spacing to keep UI consistent.
- When adding components, prefer ShadCN components. Import from `@/components/ui` and compose existing ones before creating new primitives.

## Workflow After Each Task
1. Write or update tests in `src/**/*.test.ts` to cover new logic.
2. Run `npm test` and ensure all tests pass before committing.
3. Update documentation (this file or README) if behavior or structure changes.
4. Record a short entry in `CHANGELOG.md` summarizing the change.

## Useful Commands
- `npm run dev` – start development server.
- `npm run build` – create production build.
- `npm test` – run Jest test suite.
- `npm run lint` – run ESLint.

