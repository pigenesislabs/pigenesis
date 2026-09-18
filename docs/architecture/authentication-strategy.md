# PiGenesis Authentication Strategy

## Purpose

The authentication layer is responsible for verifying the identity of
users attempting to access PiGenesis.

Authentication is intentionally separated from the core User identity
model and from authorization.

## Authentication Questions

Authentication answers:

"Who is this user?"

Authorization answers:

"What is this user allowed to do?"

These responsibilities must remain separate.

## Provider Independence

PiGenesis should not permanently depend on a single authentication
provider.

The intended architecture supports:

- Local authentication
- Google
- Microsoft
- OpenID Connect
- Enterprise SSO

Additional providers may be added later.

## Provider Boundary

All authentication providers should implement a common provider
interface.

Conceptually:

Authentication Request
        ↓
Authentication Provider
        ↓
Authenticated Identity
        ↓
PiGenesis User
        ↓
Authorization

The provider-specific implementation must remain behind the
authentication boundary.

## External Identity

An external provider may have its own user identifier.

Example:

Provider:

Google

Provider User ID:

123456789

PiGenesis:

User ID:

pigenesis-user-001

The external provider ID and PiGenesis User ID are different concepts.

## Why Provider IDs Are Not User IDs

A user may eventually:

- Change authentication provider
- Add another authentication provider
- Move from local authentication to enterprise SSO
- Use multiple supported identity providers

Therefore the PiGenesis User ID must remain independent.

## Authentication Providers

### Local

Local authentication represents credentials managed by PiGenesis.

It is currently the initial development provider.

Actual credential implementation will be added in a later task.

### Google

Google authentication will eventually allow users to authenticate
through Google identity services.

### Microsoft

Microsoft authentication will eventually support Microsoft accounts
and enterprise Microsoft identity environments.

### OIDC

OpenID Connect provides a provider-independent path for enterprise
identity systems.

This can eventually support enterprise SSO environments.

## Current Configuration

The current development configuration enables:

local

Future providers are defined by the authentication architecture but
are not yet enabled.

## Provider Adapter

The backend will use a provider adapter boundary.

Conceptually:

AuthProviderAdapter

    authenticate()
          ↓
AuthenticatedIdentity

Each provider implementation is responsible for converting its own
authentication mechanism into a common PiGenesis identity structure.

## Identity Resolution

After authentication succeeds:

Authentication Provider
        ↓
Authenticated Identity
        ↓
Provider Identity Resolution
        ↓
PiGenesis User
        ↓
Authenticated User Context

The application should operate using the PiGenesis User ID rather
than provider-specific identifiers.

## Authentication vs Authorization

Authentication:

"Who are you?"

Authorization:

"Are you allowed to perform this action?"

Example:

User authenticates successfully.

This does not automatically mean:

- The user can access every organization.
- The user can edit every project.
- The user can delete products.
- The user can administer the platform.

Authorization will be implemented separately.

## Security Boundary

The frontend must never be treated as the final authentication or
authorization authority.

The API must validate authenticated requests.

The backend is the trusted security boundary for protected resources.

## Future Authentication Flow

The intended flow is:

Client
  ↓
Login / Identity Provider
  ↓
Authentication
  ↓
Authenticated Identity
  ↓
PiGenesis User
  ↓
Session / Access Token
  ↓
API Request
  ↓
Authentication Middleware
  ↓
Authenticated User Context
  ↓
Authorization
  ↓
Controller
  ↓
Repository
  ↓
PostgreSQL

## Current State

Implemented:

- Authentication provider type
- Authenticated identity model
- Authenticated user model
- Provider adapter boundary
- Authentication configuration
- Provider-independent architecture documentation

Not yet implemented:

- Password authentication
- Password hashing
- Login endpoint
- Sessions
- Access tokens
- Refresh tokens
- Google authentication
- Microsoft authentication
- OIDC
- MFA
- Authentication middleware

These will be implemented in later tasks.

## Architectural Principle

Authentication providers should be replaceable without changing the
core PiGenesis business modules.

The Projects, Products, Services, Workflow, AI, and other platform
modules should operate on PiGenesis identities rather than directly
depending on a specific authentication provider.

## Status

Task 65.2:

Authentication Strategy & Provider Boundary — Complete