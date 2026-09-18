# PiGenesis API Endpoints

## Base URL

Local development:

http://localhost:4000

All application endpoints use the `/api` prefix.

---

## API Information

### GET /api

Returns basic API information.

## Health

### GET /api/health

Returns API health information.

## Database

Database-related routes are available under:

`/api/database`

---

# Projects

Base path:

`/api/projects`

### GET /api/projects

Returns all projects.

### GET /api/projects/:id

Returns a project by ID.

Possible responses:

- 200 — Project returned
- 400 — Invalid Project ID
- 404 — Project not found

### POST /api/projects

Creates a project.

Required fields:

- id
- name
- status
- description
- type

Valid statuses:

- Active
- Planning
- Completed

### PUT /api/projects/:id

Updates an existing project.

### DELETE /api/projects/:id

Deletes a project.

---

# Products

Base path:

`/api/products`

### GET /api/products

Returns all products.

### GET /api/products/:id

Returns a product by ID.

### POST /api/products

Creates a product.

### PUT /api/products/:id

Updates a product.

### DELETE /api/products/:id

Deletes a product.

---

# Services

Base path:

`/api/services`

### GET /api/services

Returns all services.

### GET /api/services/:id

Returns a service by ID.

### POST /api/services

Creates a service.

### PUT /api/services/:id

Updates a service.

### DELETE /api/services/:id

Deletes a service.

---

# Users

Base path:

`/api/users`

### GET /api/users

Returns all users.

### GET /api/users/:id

Returns a user by ID.

Possible responses:

- 200 — User returned
- 400 — Invalid User ID
- 404 — User not found

### POST /api/users

Creates a user.

Required fields:

- id
- email
- displayName
- status

Valid statuses:

- Active
- Invited
- Suspended
- Disabled

### PUT /api/users/:id

Updates an existing user.

Required fields:

- email
- displayName
- status

### DELETE /api/users/:id

Deletes a user.

---

# Response Format

Successful responses use:

```json
{
  "data": {}
}