# Next.js i18n App Template

A base template for starting multilingual Next.js projects quickly and
consistently.

This repository includes the setup that is usually useful from the first
commit: Next.js, TypeScript, Tailwind CSS, next-intl, ESLint, Prettier,
Husky, lint-staged, and a clear `src` folder structure.

## What's Included

- **Next.js App Router** - the application lives in `src/app`.
- **TypeScript** - strict mode is enabled in `tsconfig.json`.
- **Tailwind CSS** - styling is handled with Tailwind.
- **next-intl** - internationalized routing and translations are already
  configured.
- **ESLint** - code linting, import sorting, and unused import checks.
- **Prettier** - consistent formatting for code, imports, and Tailwind classes.
- **Husky + lint-staged** - staged files are checked and formatted before each
  commit.
- **`@/*` alias** - import files from `src` using `@/`.
- **Base architecture** - `shared`, `entities`, `features`, and `widgets`.
- **Ready-to-use `cn` helper** - combines `clsx` and `tailwind-merge`.
- **Example UI component** - `shared/ui/button`.
- **Change locale feature** - ready base for switching between supported
  locales.

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the app:

```text
http://localhost:3000
```

## Scripts

```bash
npm run dev
```

Starts the local development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run start
```

Starts the production build after running `npm run build`.

```bash
npm run lint
```

Runs ESLint for the whole project.

```bash
npm run lint:fix
```

Automatically fixes ESLint issues when possible.

```bash
npm run format
```

Formats files with Prettier.

```bash
npm run format:check
```

Checks formatting without changing files.

```bash
npm run fix
```

Runs ESLint auto-fix and Prettier formatting in one command.

## Folder Structure

```text
src/
  app/
    [locale]/
  localization/
    en/
    ua/
  shared/
    components/
    constants/
    hooks/
    lib/
    types/
    ui/
  entities/
  features/
  widgets/
```

This template uses a simple feature-oriented structure. The general idea is:
reusable application-agnostic code goes into `shared`, business entities go into
`entities`, user actions and business scenarios go into `features`, and larger
interface blocks go into `widgets`.

## Internationalization

The template includes `next-intl` and is already configured for multiple
languages:

- `en` - English, used as the default locale.
- `ua` - Ukrainian.

Localized routes live under:

```text
src/app/[locale]/
```

Translation files live under:

```text
src/localization/
  en/
  ua/
```

The i18n configuration is located in:

```text
src/shared/lib/i18n/
```

Main files:

- `routing.ts` - supported locales and default locale.
- `request.ts` - request-level locale and messages configuration.
- `navigation.ts` - localized navigation helpers.
- `locale.ts` - locale type and validation helper.

To add a new language:

1. Add the locale code to `locales` in `src/shared/lib/i18n/routing.ts`.
2. Create a new folder in `src/localization`.
3. Add the same translation files that already exist for `en` and `ua`.
4. Import and register the new messages in `src/shared/lib/i18n/request.ts`.
5. Update the language selector options if needed.

### `app`

Next.js App Router.

This folder contains routes, layouts, pages, global styles, and metadata:

- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/globals.css`

Keep routing and page composition in `app`. Move reusable logic and UI into
`features`, `entities`, `widgets`, or `shared`.

### `shared`

Reusable and application-agnostic code.

Examples:

- `ui` - base UI components such as `Button`, `Input`, or `Modal`.
- `components` - shared components that are not atomic UI primitives.
- `hooks` - reusable React hooks.
- `utils` - small pure utility functions.
- `lib` - integrations, helpers, wrappers, and library configuration.
- `constants` - global constants.
- `types` - shared TypeScript types.

Rule:

```text
shared must not depend on features, entities, or widgets.
```

The `shared` layer should stay as independent as possible. Ideally, most of it
can be moved between projects with little or no change.

Example:

```tsx
import { Button } from '@/shared';
```

### `entities`

Business entities - the main domain objects of the application.

Examples:

- `user`
- `recipe`
- `movie`
- `product`
- `order`

The `entities` layer can contain types, API functions, model logic, small
entity-specific UI blocks, or helpers related to a specific business entity.

An entity may use:

```text
shared
```

An entity should not depend on `features` or `widgets`.

### `features`

Business features and user actions.

Examples:

- `auth`
- `create-post`
- `edit-profile`
- `add-to-cart`
- `search-recipes`

A feature represents a specific user action or business scenario. This is a good
place for forms, submit logic, local hooks, API calls, and components needed
only for that feature.

A feature may use:

```text
shared
entities
```

### `widgets`

Large compositional UI blocks.

Examples:

- `header`
- `sidebar`
- `profile-card`
- `recipe-list`
- `movie-grid`

A widget combines `shared`, `entities`, and `features` into a ready-to-use UI
block that can be placed on a page.

A widget may use:

```text
shared
entities
features
```

## Dependency Direction

Dependencies should move in one direction:

```text
app -> widgets -> features -> entities -> shared
```

Base rules:

- `shared` knows nothing about the other layers.
- `entities` may use only `shared`.
- `features` may use `shared` and `entities`.
- `widgets` may compose `shared`, `entities`, and `features`.
- `app` is responsible for routing and final page composition.

This helps avoid a tangled import graph where any module can depend on anything
else.

## Barrel Files

Folders include `index.ts` files for convenient exports.

Example:

```ts
export { Button } from './ui/button';
export { cn } from './lib';
```

After that, components and helpers can be imported with shorter paths:

```tsx
import { Button, cn } from '@/shared';
```

The main idea is that external code imports from a folder's public API instead
of reaching deep into its internal structure.

## Styling

Styles are handled with Tailwind CSS.

For conditional classes, use the `cn` helper:

```ts
cn('px-4', isActive && 'bg-black');
```

The helper is located here:

```text
src/shared/lib/cn.ts
```

It combines:

- `clsx` - for conditional class composition.
- `tailwind-merge` - for merging conflicting Tailwind classes correctly.

## Code Quality

### ESLint

ESLint is configured in `eslint.config.mjs`.

It:

- uses recommended JavaScript and TypeScript rules;
- includes Next.js Core Web Vitals rules;
- sorts imports with `eslint-plugin-simple-import-sort`;
- warns about unused imports with `eslint-plugin-unused-imports`;
- allows unused variables when prefixed with `_`.

### Prettier

Prettier is configured in `.prettierrc`.

It:

- keeps code formatted in one style;
- sorts Tailwind classes;
- sorts imports;
- uses single quotes and semicolons.

### Husky and lint-staged

Before each commit, Husky runs:

```bash
npx lint-staged
```

For staged files:

- `ts`, `tsx`, `js`, `jsx` - ESLint fix + Prettier.
- `json`, `css`, `md`, `mdx` - Prettier.

This keeps the codebase clean before changes enter the repository.

## Creating a New Module

Example feature:

```text
src/features/create-post/
  ui/
    create-post-form.tsx
  model/
    use-create-post.ts
  api/
    create-post.ts
  index.ts
```

Example entity:

```text
src/entities/user/
  model/
    types.ts
  api/
    get-user.ts
  ui/
    user-avatar.tsx
  index.ts
```

Example widget:

```text
src/widgets/header/
  ui/
    header.tsx
  index.ts
```

Prefer `kebab-case` for folder names and `PascalCase` for React components.

## Using This Repository as a Template

1. Create a new project from this repository.
2. Update the `name` field in `package.json`.
3. Update metadata in `src/app/layout.tsx`.
4. Remove examples from `src/app/page.tsx` if they are not needed.
5. Add the first `entities`, `features`, and `widgets` for the actual product.
6. Run:

```bash
npm install
npm run dev
```

## Recommended Workflow

Before a commit or pull request:

```bash
npm run fix
npm run build
```

For a quick check during development:

```bash
npm run lint
npm run format:check
```

## Template Philosophy

This repository does not try to solve every possible problem in advance. Its
goal is to provide a clean starting point: the basic tooling is already set up,
the structure is predictable, and the project can grow without needing major
cleanup after the first few features.
