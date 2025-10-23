# Copilot Instructions for Hawk Eye Digital Platform

This document provides essential guidance for AI agents working with this codebase.

## Architecture Overview

This is a fullstack TypeScript application for Hawk Eye's digital platform with these major components:

- **Client** (`/client`): React frontend for user interface
- **Server** (`/server`): Express backend handling API requests
- **Shared** (`/shared`): Cross-cutting types and database schemas
- **Database**: PostgreSQL with Drizzle ORM for type-safe queries

## Key Workflows

### 1. Database Management

- Schema is defined in `/shared/schema.ts` using Drizzle ORM
- New migrations must be created after schema changes:
  ```bash
  npm run db:push  # Updates database schema
  ```
- CSV data import handled by `server/csvParser.ts`

### 2. Development Flow

```bash
npm install        # Install dependencies
npm run dev       # Start development server
npm run check     # Run TypeScript checks
```

### 3. Production Deployment

```bash
npm run build     # Builds both client and server
npm start         # Runs production server
```

## Project-Specific Patterns

1. **Data Models**: All database models are defined in `shared/schema.ts` with both Drizzle and Zod schemas
2. **Asset Integration**:
   - Media assets (audio, images) use S3 URLs stored in database
   - Placeholder URLs used in development
3. **Error Handling**:
   - Database errors handled in `server/storage.ts`
   - API errors return structured responses with status codes

## Integration Points

1. **Database**: Uses PostgreSQL via `DATABASE_URL` environment variable
2. **Media Storage**: Uses S3-compatible storage for assets
3. **CSV Import**: Processes data from `attached_assets/` directory
4. **WebSocket**: Live streaming endpoint at `/ws`

## Common Tasks

1. **Adding a New Model**:

   - Add table definition to `shared/schema.ts`
   - Create insert schema using `createInsertSchema`
   - Export types for ORM inference

2. **API Endpoints**:

   - Add routes in `server/routes.ts`
   - Implement storage functions in `server/storage.ts`

3. **CSV Processing**:
   - Extend interfaces in `server/csvParser.ts`
   - Add processing function following existing patterns
   - Use strong typing for CSV data structures

## Security & Validation

- Database inputs validated via Zod schemas
- Use prepared statements with Drizzle ORM
- Keep sensitive data in environment variables
