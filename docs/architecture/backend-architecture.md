# PiGenesis Backend Architecture

## Purpose

The PiGenesis API is the backend application responsible for providing
business APIs, data access, validation, error handling, and persistence
for the PiGenesis platform.

The backend is located at:

apps/api

## Current Architecture

The current backend follows this flow:

Client
  ↓
Express Route
  ↓
Controller
  ↓
Repository
  ↓
PostgreSQL

Cross-cutting error handling is provided through middleware.

Client
  ↓
Route
  ↓
Controller
  ↓
Repository
  ↓
Database

Errors
  ↓
Central Error Middleware
  ↓
Standard API Error Response

## Directory Structure

apps/api/
├── src/
│   ├── config/
│   │   └── database.ts
│   │
│   ├── controllers/
│   │   ├── databaseController.ts
│   │   ├── projectController.ts
│   │   ├── productController.ts
│   │   └── serviceController.ts
│   │
│   ├── middleware/
│   │   └── errorHandler.ts
│   │
│   ├── routes/
│   │   ├── apiRoutes.ts
│   │   ├── databaseRoutes.ts
│   │   ├── healthRoutes.ts
│   │   ├── projectRoutes.ts
│   │   ├── productRoutes.ts
│   │   └── serviceRoutes.ts
│   │
│   ├── services/
│   │   ├── projectRepository.ts
│   │   ├── productRepository.ts
│   │   └── serviceRepository.ts
│   │
│   ├── types/
│   │   └── apiError.ts
│   │
│   ├── app.ts
│   └── server.ts
│
└── scripts/
    └── initDatabase.ts

## Routes

### Health

GET /api/health

Used to verify that the API is running.

### Database Health

GET /api/database/health

Used to verify PostgreSQL connectivity.

### Projects

GET /api/projects
GET /api/projects/:id
POST /api/projects
PUT /api/projects/:id
DELETE /api/projects/:id

### Products

GET /api/products
GET /api/products/:id
POST /api/products
PUT /api/products/:id
DELETE /api/products/:id

### Services

GET /api/services
GET /api/services/:id
POST /api/services
PUT /api/services/:id
DELETE /api/services/:id

## Controllers

Controllers handle HTTP requests and responses.

Responsibilities include:

- Reading request parameters
- Reading request bodies
- Validating API input
- Calling repositories
- Returning successful responses
- Throwing application errors

Controllers should not contain direct PostgreSQL queries.

## Repositories

Repositories are responsible for database access.

Responsibilities include:

- SELECT
- INSERT
- UPDATE
- DELETE
- Mapping database records
- PostgreSQL interaction

This keeps database implementation separate from HTTP handling.

## PostgreSQL

PiGenesis currently uses PostgreSQL as its primary relational database.

Current database:

pigenesis

Current registry tables:

- projects
- products
- services

All three tables currently use:

- id
- name
- status
- description
- type/category
- created_at
- updated_at

The exact entity-specific schema is defined by the database initialization script.

## Error Handling

PiGenesis uses a centralized API error model.

Error structure:

{
  "error": {
    "code": "NOT_FOUND",
    "message": "Project not found."
  }
}

Current error codes include:

- VALIDATION_ERROR
- NOT_FOUND
- DUPLICATE
- DATABASE_ERROR
- INTERNAL_ERROR

The central error middleware is responsible for converting application
errors into consistent HTTP responses.

## HTTP Status Codes

### 200

Successful GET or UPDATE request.

### 201

Successful resource creation.

### 204

Successful resource deletion with no response body.

### 400

Invalid request or validation failure.

### 404

Requested resource does not exist.

### 409

Duplicate resource or conflicting request.

### 500

Unexpected server-side error.

## Architectural Principles

### Separation of Responsibilities

Routes define endpoints.

Controllers handle HTTP requests.

Repositories handle database access.

Middleware handles cross-cutting concerns.

### Stable Entity Identity

Entity IDs are stable identifiers.

IDs should not be changed during normal entity updates.

### Database as the Source of Truth

The backend PostgreSQL database is the persistent source of truth for
server-side platform data.

### Consistent API Contracts

All APIs should return predictable response structures.

Successful responses use:

{
  "data": ...
}

Errors use:

{
  "error": {
    "code": "...",
    "message": "..."
  }
}

## Current Platform Data Flow

React Platform
  ↓
PiGenesis API
  ↓
Controllers
  ↓
Repositories
  ↓
PostgreSQL

## Future Architecture

The backend will eventually expand to include:

- Authentication
- Authorization
- Organizations
- Users
- Roles and permissions
- Business logic services
- Workflow engine
- AI integration
- Document and knowledge services
- External integrations
- Notifications
- Audit logging
- Analytics
- Enterprise capabilities

Future architecture:

React Platform
  ↓
API
  ↓
Authentication
  ↓
Authorization
  ↓
Business Services
  ↓
Repositories
  ↓
PostgreSQL

Additional platform capabilities will connect through dedicated
services and integration boundaries.

## Important Architectural Decision

The frontend should not communicate directly with PostgreSQL.

The intended boundary is:

React
  ↓
API
  ↓
Backend
  ↓
Database

This allows authentication, authorization, validation, business rules,
logging, auditing, and future platform capabilities to be controlled
centrally by the backend.

## Status

Backend Foundation: Complete

Current milestone includes:

- Express API
- PostgreSQL connection
- Database initialization
- Project REST API
- Product REST API
- Service REST API
- CRUD operations
- Input validation
- Centralized API errors
- Standard response structure

Next major backend phase:

Authentication and platform identity architecture.