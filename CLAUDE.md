# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website built with Next.js 16 (App Router), TypeScript, Tailwind CSS 3, MongoDB/Mongoose, and NextAuth.js 4 (passwordless magic link auth). Uses Framer Motion for animations and Lenis for smooth scrolling.

## Commands

```bash
pnpm dev          # Start dev server (localhost:3000)
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # ESLint
pnpm type-check   # TypeScript type checking (tsc --noEmit)
```

Package manager is **pnpm** (v10.22).

## Architecture

### Routing (App Router)

- **Public**: `/` (single-page with sections), `/blog/[id]`, `/tools/*` (6 dev utilities)
- **Admin (protected)**: `/admin`, `/admin/login`, `/admin/blogs/*`, `/admin/repos/`
- **API**: `/api/auth/*`, `/api/blogs`, `/api/contacts`, `/api/github`, `/api/admin/pinned-repos`

### Authentication Flow

Magic link (passwordless) via NextAuth CredentialsProvider:
1. POST `/api/auth/request-login` → HMAC-signed token (15min TTL) sent via email
2. GET `/api/auth/verify-login` → verifies token, marks email verified (5min window)
3. NextAuth authorizes via `isEmailVerified()` → JWT session (7-day)

Key files: `lib/auth-simple.ts`, `lib/email.ts`, `app/api/auth/[...nextauth]/route.ts`

### Data Layer

- MongoDB via Mongoose ODM with cached global connection (`lib/db.ts`)
- Models in `models/`: Blog, Contact, PinnedRepo
- Protected API routes check `auth()` session, return 401 if absent

### Client vs Server

- Most page-level components are client components (`"use client"`) due to interactivity
- Root layout wraps children in `ThemeProvider` + `SessionProvider`
- GitHub data fetched client-side in Hero; API routes use server-side MongoDB queries
- GitHub repo data cached 1hr via Next.js revalidate

### Styling

- Tailwind CSS 3 with **class-based dark mode** (`tailwind.config.ts`)
- Theme toggle via `next-themes`
- Utility helper: `cn()` from `lib/utils.ts` (clsx + tailwind-merge)

## Environment Variables

Required: `MONGODB_URI`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `ADMIN_EMAIL`
Optional: `EMAIL_SERVER_HOST`, `EMAIL_SERVER_PORT`, `EMAIL_SERVER_USER`, `EMAIL_SERVER_PASSWORD`, `EMAIL_FROM`, `GITHUB_TOKEN`, `ALLOWED_ADMIN_EMAILS`

## Key Conventions

- Path alias: `@/*` maps to project root
- Remote images allowed from `avatars.githubusercontent.com` (next.config.ts)
- TypeScript strict mode enabled
