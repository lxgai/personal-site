# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Essential Commands
- `npm run dev` - Start development server at http://localhost:3000
- `npm run build` - Build the production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint with Next.js configuration

### Dependency Management
- `npm install` - Install all dependencies from package.json

### TypeScript Configuration
- TypeScript strict mode is enabled
- Path alias `@/*` maps to `./src/*`
- Next.js TypeScript plugin is configured

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15.4.4 with App Router
- **UI Libraries**: Material UI (MUI) v7 and Joy UI
- **Styling**: Tailwind CSS v4 with PostCSS
- **Language**: TypeScript with strict mode
- **Font System**: Next/font with Geist Sans and Geist Mono

### Project Structure
```
src/
├── app/                 # Next.js app directory
│   ├── layout.tsx      # Root layout with font setup
│   ├── page.tsx        # Homepage with MUI components
│   ├── contact/        # Contact page route
│   └── portfolio/      # Portfolio page route
└── styles/
    └── globals.css     # Global Tailwind CSS imports
```

### Key Architectural Decisions
1. **Client Components**: Homepage uses "use client" directive for MUI interactivity
2. **Styling Approach**: Mixed approach using Material UI sx prop for component styling and Tailwind CSS for utility classes
3. **Font Loading**: Optimized font loading through next/font with Geist font family
4. **Routing**: File-based routing with App Router - each folder in app/ represents a route

### Component Patterns
- Homepage features a custom PolaroidPhoto component with hover animations
- Navigation uses MUI Link components for consistent styling
- Layout applies font CSS variables to body element

### Current State
- No test framework is configured yet
- No custom Next.js configurations beyond defaults
- ESLint is configured with Next.js recommended rules