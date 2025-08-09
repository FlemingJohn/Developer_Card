# Firebase Studio 👋

This is a Next.js starter project for Firebase Studio, designed to provide a robust starting point for building modern web applications with AI-powered features.

## Project Description

This project is a full-stack application built with Next.js and Firebase. It leverages Google's Genkit for integrating AI capabilities and uses `shadcn/ui` for a clean, modern user interface. The starter includes examples of AI flows, UI components, and services for interacting with external APIs like GitHub.

## Project Structure

The project follows a standard Next.js App Router structure, with some additional directories for organizing the code:

- **`src/`**: Contains the main source code for the application.
  - **`ai/`**: Holds all the AI-related logic, built with the Genkit framework.
    - **`flows/`**: Defines the specific AI flows (e.g., `assistant-flow.ts`).
  - **`app/`**: The core Next.js application directory, using the App Router.
  - **`components/`**: Contains reusable React components.
    - **`ui/`**: UI components built with `shadcn/ui`.
  - **`hooks/`**: Custom React hooks for shared component logic.
  - **`lib/`**: Utility functions and helper scripts.
  - **`services/`**: Modules for interacting with external APIs and services (e.g., `github.ts`).

## Tools and Technologies

This project is built with a modern, type-safe stack:

- **Framework**: [Next.js](https://nextjs.org/) (using the App Router and Turbopack)
- **AI Framework**: [Google's Genkit](https://firebase.google.com/docs/genkit)
- **UI**:
  - [React](https://react.dev/)
  - [shadcn/ui](https://ui.shadcn.com/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [Lucide React](https://lucide.dev/guide/packages/lucide-react) (for icons)
  - [Recharts](https://recharts.org/) (for charts)
- **Backend & Hosting**: [Firebase](https://firebase.google.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) for validation
- **Linting**: [Next.js Lint](https://nextjs.org/docs/basic-features/eslint) (ESLint)

To get started, take a look at `src/app/page.tsx`.
