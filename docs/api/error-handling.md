
---

## 2. `docs/api/error-handling.md`

Put this **entire content** into `error-handling.md`:

```markdown
# PiGenesis API Error Handling

## Overview

PiGenesis uses centralized API error handling.

The request flow is:

Controller / Service
→ ApiError
→ Centralized errorHandler
→ Standard API error response

---

## Error Codes

The backend supports:

- VALIDATION_ERROR
- NOT_FOUND
- DUPLICATE
- DATABASE_ERROR
- INTERNAL_ERROR

---

## Standard Error Response
Validation Error

HTTP status:

400 Bad Request

Example:
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "User display name is required."
  }
}

Not Found

HTTP status:

404 Not Found

Example:

{
  "error": {
    "code": "NOT_FOUND",
    "message": "User not found."
  }
}

Duplicate

HTTP status:

409 Conflict

Example:

{
  "error": {
    "code": "DUPLICATE",
    "message": "A user with this email already exists."
  }
}

Internal Error

HTTP status:

500 Internal Server Error

Example:

{
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An unexpected server error occurred."
  }
}

Layer Responsibilities
Controller

Handles:

HTTP requests
Validation
Route parameters
HTTP responses
ApiError generation
Service

Handles:

Business logic
Business-level validation
Duplicate detection
Repository

Handles:

PostgreSQL access
SQL queries
Database result mapping
Error Middleware

Handles:

ApiError responses
Unexpected errors
Consistent API error formatting
User Module Verification

The User API has been manually verified for:

List users
Create user
Get user by ID
Duplicate email
Validation error
Update user
Not found
Delete user
Verify deleted user
Empty user collection