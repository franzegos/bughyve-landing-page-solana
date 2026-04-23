# BugHyve Landing Page

## What is BugHyve?

**BugHyve: On-Demand QA for Fast-Shipping Teams**

BugHyve is a QA marketplace where product teams can launch on-demand testing campaigns and receive real bug reports and product feedback from testers. It is built to help teams catch issues earlier, ship with more confidence, and improve product quality without slowing release velocity.

## Core Features

### For clients

- Create campaigns with detailed scope.
- Fund campaign escrow, top up budget, and refund unallocated balance.
- Set bounty rewards and campaign requirements.
- Review tester submissions and decide outcomes.

### For testers

- Browse campaigns
- Submit bug reports and product feedback.
- Track earnings and submission task log.
- Manage account information, availability, work preferences, and payment methods.

<img width="1695" height="953" alt="image" src="https://github.com/user-attachments/assets/b9ce1edf-8cd7-4a04-b6ba-7efb3d520c14" />

---

<img width="1690" height="953" alt="image" src="https://github.com/user-attachments/assets/fe1f5846-9af0-4e41-ad58-77fabf5682db" />

## Setup

1. `pnpm install`
2. `cp .env.example .env`
3. `pnpm dev`

## Scripts

| Command         | Description                  |
| --------------- | ---------------------------- |
| `pnpm dev`      | Vite dev server              |
| `pnpm build`    | Typecheck + production build |
| `pnpm preview`  | Preview production build     |
| `pnpm lint`     | ESLint                       |
| `pnpm test`     | Vitest (watch)               |
| `pnpm test:run` | Vitest once                  |

## Stack

React 19, Vite 7, TypeScript, Tailwind v4, TanStack Query, Zustand, Axios, Sonner, and `@vercel/analytics`.

Node **20+**.
