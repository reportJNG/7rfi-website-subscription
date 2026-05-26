# Harafi

Harafi is a clean RTL early-registration web app for a Syrian craftspeople and professionals platform. It is built with Vite, React, TypeScript, TailwindCSS, Supabase, React Hook Form, and Zod.

## Features

- Arabic RTL interface
- Early-registration landing page
- Subscriber form with validation
- City loading from Supabase
- Duplicate email and phone checks
- Optional profile picture and CV upload
- Success, loading, and error states

## Tech Stack

- Vite
- React 19
- TypeScript
- TailwindCSS
- Supabase
- React Hook Form
- Zod
- Lucide React
- Sonner

## Getting Started

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env
```

Add your Supabase values to `.env`.

## Environment Variables

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

## Scripts

Run the development server:

```bash
npm run dev
```

Check lint rules:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```text
src/
  components/
    home/       Home page sections
    layout/     Navbar and footer
    shared/     Shared UI pieces
    submit/     Registration form
  hooks/         Data and UI hooks
  lib/           Supabase client, API helpers, validation
  pages/         Route pages
  types/         Shared TypeScript types
```

## Notes

The app is production-focused and intentionally keeps the component tree small. Unused generated UI components and starter files have been removed to keep the project easy to maintain.
