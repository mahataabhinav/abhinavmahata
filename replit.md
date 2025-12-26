# replit.md

## Overview

This is a personal portfolio website built as a full-stack TypeScript application. It features a modern, immersive dark-themed design with animated 3D elements, smooth page transitions, and a contact form. The application showcases projects and allows visitors to send messages through a contact form that stores data in a PostgreSQL database.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with custom CSS variables for theming (dark space theme)
- **UI Components**: shadcn/ui component library (New York style) built on Radix UI primitives
- **State Management**: TanStack React Query for server state and data fetching
- **Animations**: Framer Motion for page transitions and scroll-triggered animations
- **Forms**: React Hook Form with Zod validation via @hookform/resolvers
- **Build Tool**: Vite with path aliases (@/, @shared/, @assets/)

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript with tsx for development
- **API Design**: RESTful endpoints defined in `shared/routes.ts` with Zod schemas for type-safe request/response validation
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Schema Location**: `shared/schema.ts` contains all table definitions and Zod schemas

### Data Storage
- **Database**: PostgreSQL (connection via DATABASE_URL environment variable)
- **Tables**:
  - `messages`: Stores contact form submissions (name, email, message, timestamp)
  - `projects`: Stores portfolio projects (title, description, imageUrl, projectUrl, repoUrl, featured flag)
- **Migrations**: Drizzle Kit with migrations output to `./migrations`

### Project Structure
```
├── client/           # Frontend React application
│   └── src/
│       ├── components/   # React components including shadcn/ui
│       ├── pages/        # Page components (Home, Projects, Contact)
│       ├── hooks/        # Custom React hooks for data fetching
│       └── lib/          # Utilities and query client setup
├── server/           # Backend Express application
│   ├── index.ts      # Server entry point
│   ├── routes.ts     # API route handlers
│   ├── storage.ts    # Database access layer
│   └── db.ts         # Database connection
├── shared/           # Shared code between client and server
│   ├── schema.ts     # Drizzle table definitions and Zod schemas
│   └── routes.ts     # API route definitions with type schemas
```

### Key Design Patterns
- **Shared Types**: Database schemas and API contracts defined once in `shared/` and used by both frontend and backend
- **Type-Safe API**: Route definitions include Zod schemas for inputs and responses, enabling end-to-end type safety
- **Storage Abstraction**: `IStorage` interface in `server/storage.ts` abstracts database operations
- **Component Library**: Extensive shadcn/ui components for consistent UI patterns

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connected via `DATABASE_URL` environment variable
- **Drizzle ORM**: Used for type-safe database queries and schema management

### Frontend Libraries
- **@tanstack/react-query**: Server state management and caching
- **framer-motion**: Animation library for page transitions and effects
- **wouter**: Lightweight React router
- **react-hook-form**: Form state management
- **zod**: Schema validation (shared between frontend and backend)
- **Radix UI**: Headless UI primitives (via shadcn/ui)
- **Lucide React**: Icon library

### Build & Development
- **Vite**: Frontend bundler with HMR
- **esbuild**: Server bundler for production builds
- **tsx**: TypeScript execution for development
- **Tailwind CSS**: Utility-first CSS framework

### External Services
- **Spline**: 3D scene viewer loaded via CDN script for hero section visuals
- **Google Fonts**: Space Grotesk, Inter, JetBrains Mono fonts