# Copilot Instructions for Helsa Monorepo

## Overview

Helsa is a TypeScript monorepo managed by Turbo Repo. It includes:

- `src/apps`: Next.js web (`app` & `website`) and Expo mobile (`mobile`)
- `src/packages`: reusable domains (api, auth, database, engine, events, ui, etc.)
- Centralized TS configs in `typescript-config`

## Developer Workflows

- `npm run dev`: starts all apps in watch mode via `turbo dev`
- `npm run build`: builds packages & apps via `turbo build`
- `npm run lint`: runs ESLint across workspace
- `npm run test`: runs tests via `turbo test`
- `.env` loading tracked by Turbo's `globalDependencies`

## Monorepo Conventions

- Each package under `src/packages/*` publishes scoped `@helsa/*`. Use path alias imports (e.g., `@helsa/auth/server`, `@helsa/api/route-handler`)
- TS configs extend from `@helsa/typescript-config/{base,library,next,server}` in each package/app
- Versions and dependency management are centralized in the root `package.json`

## Directory Layout

- **Apps**:
  - `src/apps/app`: Next.js App Router entrypoint (`app/src/app/`)
  - `src/apps/website`: Static site + Payload CMS config (`payload.config.ts`)
  - `src/apps/mobile`: Expo React Native app
- **Packages**: Domain logic split by bounded contexts (`engine`, `events`, `notifications`, `payment`, etc.)

## API Routes & routeHandler Pattern

- Server routes live under `src/app/(server)/api/v*/.../route.ts`
- Use `routeHandler({ name, schema }, handler)` from `@helsa/api/route-handler`
- Validate inputs with Zod; example:
  ```ts
  export const PUT = routeHandler(
    { name: 'update-user', schema: z.object({ bio: z.string().optional(), name: z.string().optional() }) },
    async ({ body, user }) => {
      /* update logic */
    },
  );
  ```
- Auth integration via `@helsa/auth/server` and `headers()` for cookie-based sessions

## Shared Services & Domain Packages

- Business logic in domain packages (e.g., `src/packages/engine/*`)
- Event bus in `@helsa/events`
- Prisma-based DB access in `@helsa/database`
- Email templating in `@helsa/email/templates`
- Observability and logging in `@helsa/observability`

## Styling & UI Conventions

- Web uses Shadcn UI + Radix + Tailwind
- Mobile uses Expo + React Native
- Components organized in lowercase-dashed folders under `src/ui` and apps

## Tips & Examples

- Prefer functional patterns and pure functions; avoid classes
- Extend TS interfaces and avoid enums in favor of lookup maps
- Default to server components; use `"use client"` sparingly for Web APIs and interactivity
- URL state managed via `useQueryState` from `nuqs`
- Runtime validation with Zod across actions and routes

---

Please review and suggest any missing context or unclear conventions to iterate further.
