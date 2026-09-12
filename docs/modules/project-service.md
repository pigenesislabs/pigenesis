# Project Service

## Purpose

The Project Service is responsible for managing project data and providing a single data-access boundary between the UI and project persistence.

The UI should not directly manage project storage.

Current architecture:

React UI → Project Pages → Project Service → localStorage

Future architecture:

React UI → Project Pages → Project Service → API → Backend → Database

---

## Project Data

A Project contains:

- `id`
- `name`
- `status`
- `description`
- `type`

The Project ID is the stable identifier of the project and must not be changed during editing.

---

## Supported Operations

### Create

`createProject(input)`

Creates a new project after validating the supplied input.

The service:

1. Validates the project data.
2. Loads the current stored projects.
3. Checks for duplicate Project ID.
4. Creates the project.
5. Saves the updated project list.
6. Updates the in-memory project reference.
7. Dispatches the project update event.
8. Logs the operation.

---

### Read

`getProjects()`

Loads the current project data from storage.

`getProjectById(projectId)`

Retrieves a project using its stable Project ID.

Both operations use the service layer rather than allowing pages to access storage directly.

---

### Update

`updateProject(projectId, updates)`

Updates an existing project.

The Project ID remains immutable.

Editable fields are:

- Name
- Type
- Status
- Description

The service validates the update before saving the modified project.

---

### Delete

`deleteProject(projectId)`

Deletes an existing project.

The service first loads the current persisted project data before performing the deletion. This prevents deletion from relying on potentially stale in-memory data.

If the project does not exist, the operation returns `false` and records a diagnostic error.

---

## Validation

Project creation validates:

- Project ID is required.
- Project ID may contain only lowercase letters, numbers, and hyphens.
- Project name is required.
- Project description is required.
- Project type is required.
- Project status must be valid.

Project updates validate:

- Project name.
- Project description.
- Project type.
- Project status.

Validation failures use the application error system.

---

## Error Handling

The Project Service uses the centralized application error system.

Supported error categories include:

- `VALIDATION_ERROR`
- `NOT_FOUND`
- `DUPLICATE`
- `STORAGE_ERROR`
- `NETWORK_ERROR`
- `UNAUTHORIZED`
- `FORBIDDEN`
- `UNKNOWN_ERROR`

Currently the Project Service actively uses:

- `VALIDATION_ERROR`
- `DUPLICATE`
- `STORAGE_ERROR`

---

## Persistence

Current persistence uses browser `localStorage`.

Storage key:

`pigenesis_projects`

The storage implementation is isolated inside the Project Service.

The UI does not directly read or write the storage key.

This allows the persistence mechanism to be replaced later without requiring major changes to the UI.

Future persistence may use:

- API
- Backend service
- Database

---

## Storage Error Handling

Storage reads and writes are protected with error handling.

If storage access fails:

1. The error is logged.
2. A `STORAGE_ERROR` application error is created.
3. The error is propagated to the calling layer.

If stored project JSON is malformed, the service logs the problem and restores the default project data.

---

## Logging

The Project Service uses the centralized logger.

Important operations are logged with contextual information such as:

- Operation name
- Project ID
- Error code
- Original error

Example operations:

- `createProject`
- `deleteProject`
- `readProjectsFromStorage`
- `saveProjectsToStorage`
- `loadProjects`

---

## Reactive Updates

After successful create, update, or delete operations, the service dispatches:

`pigenesis-projects-updated`

Pages can listen for this event and refresh their project data.

This allows multiple UI areas to remain synchronized with project changes.

---

## Testing

The Project Service currently has automated tests covering:

- Default project loading
- Project creation
- Duplicate Project ID protection
- Project updates
- Project deletion
- Deletion of non-existent projects
- Storage read failures
- Storage write failures
- Create validation
- Update validation
- Current-storage deletion consistency

Current test status:

**19 / 19 tests passing**

---

## Architectural Principle

The Project Service is the boundary between the UI and project data.

The core principle is:

> UI consumes data. UI does not own data.

This boundary is intentionally designed so that the current localStorage implementation can later be replaced by a backend persistence layer without redesigning the Project UI.