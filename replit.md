# Krishi AI - Agricultural Technology Platform

## Overview

Krishi AI is a comprehensive agricultural technology platform that leverages artificial intelligence to assist farmers with crop management, disease detection, and farming optimization. The application provides a full-stack solution combining modern web technologies with AI services to deliver real-time agricultural insights, marketplace functionality, and government scheme navigation.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend is built as a Single Page Application (SPA) using React with TypeScript, styled with Tailwind CSS and Shadcn/UI components. Key architectural decisions include:

- **React Router**: Uses Wouter for lightweight client-side routing
- **State Management**: React Query (@tanstack/react-query) for server state management and caching
- **UI Framework**: Shadcn/UI with Radix UI primitives for accessible, customizable components
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
The backend follows a REST API architecture using Express.js with TypeScript:

- **Framework**: Express.js with middleware for JSON parsing, logging, and error handling
- **Database ORM**: Drizzle ORM with PostgreSQL for type-safe database operations
- **File Upload**: Multer middleware for handling image uploads (disease detection)
- **API Design**: RESTful endpoints with consistent error handling and response formatting

### Database Design
PostgreSQL database with Drizzle ORM providing:

- **Schema Management**: Centralized schema definitions in `/shared/schema.ts`
- **Type Safety**: Zod integration for runtime validation
- **Migrations**: Drizzle-kit for database schema migrations
- **Tables**: Users, crop diseases, marketplace items, government schemes, market prices, business connections, and chat messages

### AI Integration
OpenAI GPT-5 integration for agricultural intelligence:

- **Disease Detection**: Image analysis for crop disease identification with confidence scoring
- **Chat Assistant**: Multilingual farming advice and question answering
- **Structured Responses**: JSON response formatting for consistent data handling

### Session Management
PostgreSQL-based session storage using connect-pg-simple for persistent user sessions across server restarts.

## External Dependencies

### Core Technologies
- **Node.js Runtime**: ES modules with TypeScript compilation
- **Database**: PostgreSQL with Neon serverless database provider
- **AI Services**: OpenAI API for GPT-5 model access

### Development Tools
- **TypeScript**: Full-stack type safety
- **Vite**: Frontend build tool with React plugin
- **ESBuild**: Backend bundling for production deployment
- **Drizzle Kit**: Database schema management and migrations

### UI Components
- **Radix UI**: Comprehensive set of accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Consistent icon library

### Third-Party Services
- **Weather API**: Placeholder for weather service integration (OpenWeatherMap)
- **File Storage**: Local file system with provisions for cloud storage
- **Session Store**: PostgreSQL-backed session management

### Deployment Infrastructure
- **Replit Integration**: Custom Vite plugins for Replit environment
- **Environment Variables**: Database URL and API keys configuration
- **Static Serving**: Express middleware for production static file serving