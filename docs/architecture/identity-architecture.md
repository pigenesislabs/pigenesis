# PiGenesis Identity Architecture

## Purpose

The Identity layer defines how PiGenesis represents users and prepares
the platform for authentication, authorization, organizations, roles,
permissions, and enterprise identity providers.

The Identity layer is separate from the authentication mechanism.

## Core Principle

A User represents an identity.

Authentication represents how that identity proves who they are.

Authorization determines what that identity is allowed to do.

The conceptual separation is:

User
  ↓
Authentication
  ↓
Authorization
  ↓
Resources

## User Identity

The core PiGenesis User represents:

- Stable user identity
- Email address
- Display name
- Account status
- Creation timestamp
- Update timestamp

The User entity does not directly contain authentication credentials.

## User Status

Current user statuses:

- Active
- Invited
- Suspended
- Disabled

### Active

The user is allowed to operate normally according to their
organization and permissions.

### Invited

The user has been invited but has not completed account activation.

### Suspended

The account temporarily cannot operate.

### Disabled

The account has been deactivated.

## Stable User ID

Every user has a stable immutable ID.

The ID identifies the user independently of:

- Email address
- Display name
- Authentication provider
- Organization membership

Email addresses may change.

Display names may change.

Authentication providers may change.

The User ID remains the identity anchor.

## Authentication Separation

Authentication should not be tightly coupled to the User entity.

Future authentication mechanisms may include:

- Email and password
- Google
- Microsoft
- Enterprise SSO
- OAuth
- OpenID Connect
- Multi-factor authentication

The authentication layer should resolve an authenticated identity
to a PiGenesis User.

Conceptually:

Authentication Provider
  ↓
Authenticated Identity
  ↓
PiGenesis User ID

## Authorization

Authentication answers:

"Who are you?"

Authorization answers:

"What are you allowed to do?"

Authorization will be implemented separately from authentication.

Future authorization concepts include:

- Organizations
- Organization membership
- Roles
- Permissions
- Resource access
- Ownership
- Administrative privileges

## Organizations

A user may eventually belong to one or more organizations.

The relationship should not be stored directly as a single organization
ID on the User entity because a user may participate in multiple
organizations.

Future conceptual model:

User
  ↓
Organization Membership
  ↓
Organization

The membership can later contain:

- Organization ID
- User ID
- Role
- Membership status
- Joined timestamp

## Roles

Roles represent groups of permissions.

Examples may eventually include:

- Owner
- Administrator
- Manager
- Member
- Viewer

The final role system will be defined during the authorization phase.

## Permissions

Permissions represent specific actions.

Examples:

- project.read
- project.create
- project.update
- project.delete
- product.read
- service.manage

The exact permission catalogue will be defined later.

## Resource Access

Authentication and authorization will eventually protect platform
resources.

Example:

User
  ↓
Authentication
  ↓
Authorization
  ↓
Project API
  ↓
Project

The backend must never rely on the frontend alone to determine
whether a user is allowed to access a resource.

## Security Boundary

The React frontend is not a trusted security boundary.

The API is responsible for enforcing:

- Authentication
- Authorization
- Resource access
- Validation
- Security policies

The frontend may hide unavailable actions for usability, but the
backend must enforce the actual permission.

## Current User Model

Current core User fields:

- id
- email
- displayName
- status
- createdAt
- updatedAt

## Authentication Credentials

Authentication credentials should be represented separately from
the core User identity.

For example, a future authentication architecture may contain
separate concepts for:

- Password credentials
- External identity providers
- OAuth/OIDC identities
- MFA configuration
- Sessions
- Refresh tokens

Credentials must never be exposed through normal User API responses.

## Session Architecture

Future authenticated requests will follow a model similar to:

Client
  ↓
Authentication
  ↓
Session / Access Token
  ↓
PiGenesis API
  ↓
Identity Resolution
  ↓
Authorization
  ↓
Resource

The exact token/session technology will be selected during the
authentication implementation phase.

## API Responsibility

The API will eventually provide authenticated identity information
to downstream application logic.

Example conceptual request context:

request.user
  ├── userId
  ├── organizationId
  └── permissions

This information must be derived from a trusted authentication
mechanism rather than from arbitrary client-supplied values.

## Current Development State

At the beginning of Task 65:

- User identity model is being established.
- Authentication is not yet enabled.
- API endpoints are currently development endpoints.
- Organization membership is not yet implemented.
- Roles are not yet implemented.
- Permissions are not yet implemented.

## Future Identity Architecture

The intended platform structure is:

User
  │
  ├── Authentication Identity
  │
  └── Organization Membership
          │
          ├── Organization
          │
          └── Role
                  │
                  └── Permissions

This identity context will eventually protect all major PiGenesis
platform resources.

## Design Principles

### Identity First

Create a stable identity model before implementing authentication.

### Authentication Separation

Do not mix authentication credentials into the core User entity.

### Authorization Separation

Do not treat authentication as authorization.

### Organization Ready

The identity model must support users participating in multiple
organizations.

### Backend Enforcement

Security rules must be enforced by the API.

### Provider Independence

The platform should avoid becoming permanently dependent on a single
authentication provider.

### Enterprise Ready

The architecture should support future SSO, OIDC, MFA, and
organization-level security requirements.

## Status

Task 65.1 Identity Foundation:

In Progress

Completed:

- Core User model
- User status model
- Stable identity principle
- Authentication separation
- Organization-ready architecture
- Authorization boundary
- Identity documentation

Next:

Authentication strategy and provider boundary.