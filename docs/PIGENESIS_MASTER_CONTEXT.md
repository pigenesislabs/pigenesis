# PIGENESIS MASTER CONTEXT

> **Authoritative project context for future PiGenesis ChatGPT
> conversations**
>
> **Last updated:** 2026-09-18\
> **Timezone:** IST (UTC+5:30)\
> **Current phase:** Engineering Phase\
> **Current task:** Task 65 --- Backend Service/Controller Consistency\
> **Current backend baseline:** Backend foundation + REST APIs
> implemented; PostgreSQL connected and tables initialized; build
> passing.

This document is the authoritative preservation artifact for the
PiGenesis project. It captures the project identity, architecture,
implementation history, decisions, code/file references, Git and
deployment information, testing, errors and fixes, UX rules, current
status, pending work, and instructions for continuing the project in a
new ChatGPT conversation.

------------------------------------------------------------------------

# 1. CURRENT STATE

## 1.1 Project identity

-   **Company:** PiGenesis
-   **Parent / mission identity:** PI --- Project Independence
-   **Mission:** Project Independence
-   **GitHub organization:** `pigenesislabs`
-   **Company/project Git email:** `pigenesis.pi@gmail.com`
-   **Live website:** `https://pigenesis.pages.dev`
-   **Cloudflare:** Cloudflare Pages / Workers infrastructure has been
    created and used for deployment.
-   **Long-term direction:** PiGenesis is intended to become a reusable,
    modular, AI-enabled digital workflow operating system/platform
    rather than a collection of isolated apps.
-   **Long-term product concepts:** PI Flow, PI Docs, PI AI, PI Vault,
    and other reusable platform capabilities.
-   **Long-term ambition:** Enterprise-grade and eventually
    government-grade reach, but government is not the initial target.

## 1.2 Current phase

**Foundation Phase: COMPLETE**

**Engineering Phase: IN PROGRESS**

Foundation completed: 1. Company Name --- PiGenesis 2. Mission ---
Project Independence 3. GitHub 4. Cloudflare 5. Live Website 6. Brand
Logo 7. Initial Design Language

The frontend entity-registry foundation is substantially complete. The
backend/data architecture phase is now active.

## 1.3 Current architecture

Historical frontend architecture:

``` text
React UI
  ↓
Pages
  ↓
Frontend service layer
  ↓
localStorage
```

Current backend direction:

``` text
React UI
  ↓
Pages / UI components
  ↓
Frontend service/API boundary
  ↓
HTTP REST API
  ↓
Express controllers
  ↓
Backend services
  ↓
PostgreSQL repositories
  ↓
PostgreSQL database
```

Backend entity flow:

``` text
Route
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
PostgreSQL
```

Future platform layers:

``` text
Identity
Workflow
Knowledge / Documents
AI
Integrations
Analytics
Product Layer
Security / Governance
```

## 1.4 Current database state

PostgreSQL:

-   Database: `pigenesis`
-   User: `postgres`
-   Host: `localhost`
-   Port: `5432`
-   PostgreSQL version observed: `18.6`

Confirmed tables:

``` text
public | products | table | postgres
public | projects | table | postgres
public | services | table | postgres
public | users    | table | postgres
```

Users table was initialized successfully.

Current user count:

``` text
0
```

Known entity table structures:

### Projects

``` text
id
name
status
description
type
created_at
updated_at
```

### Products

``` text
id
name
status
description
category
created_at
updated_at
```

### Services

``` text
id
name
status
description
category
created_at
updated_at
```

### Users

``` text
id
email
display_name
status
created_at
updated_at
```

## 1.5 Current API state

API has been manually verified on:

``` text
http://localhost:4000
```

Observed database health response:

``` json
{"status":"ok","database":"connected"}
```

REST API behavior tested for Projects, Products and Services.

Examples tested:

-   GET existing project
-   GET missing project
-   POST invalid project
-   PUT missing project
-   GET missing product
-   POST duplicate product
-   GET/list product
-   POST duplicate service
-   GET/list service
-   DELETE success returning HTTP 204

## 1.6 Current build state

Backend:

``` powershell
cd D:\PiGenesis\pigenesis\apps\api
npm run build
```

Current result:

``` text
> @pigenesis/api@0.1.0 build
> tsc
```

No errors.

Frontend historical baseline:

``` text
58/58 tests passed
Build passed
```

## 1.7 Current task

### Task 65 --- Backend Service/Controller Consistency

The next implementation task is to standardize the User module so it
follows the same architecture and error-handling conventions already
established by Project/Product/Service.

Target:

``` text
User Route
    ↓
User Controller
    ↓
User Service
    ↓
User Repository
    ↓
PostgreSQL
```

Do not add full authentication yet.

Do not redesign the database.

Do not introduce unnecessary abstractions.

------------------------------------------------------------------------

# 2. COMPANY / PRODUCT IDENTITY

## 2.1 PiGenesis

The finalized company/platform name is:

``` text
PiGenesis
```

## 2.2 PI

Parent identity:

``` text
PI
```

Meaning / mission:

``` text
Project Independence
```

## 2.3 Mission

``` text
Project Independence
```

The platform is being built as a long-term company/product foundation.

## 2.4 Core philosophy

Established principles:

-   **Build Platforms, Not Apps**
-   **Build Once. Improve Forever**
-   Digital Workflow & AI Automation
-   Build reusable capabilities rather than repeatedly rebuilding
    isolated applications.
-   Create a scalable platform that can eventually serve many industries
    and organizations.
-   Build the foundation correctly before adding advanced enterprise
    features.
-   Avoid unnecessary complexity.
-   Avoid framework hopping.
-   Keep architecture consistent.

## 2.5 Future products

Discussed product/platform concepts:

``` text
PI Flow
PI Docs
PI AI
PI Vault
```

### PI Flow

Development API data has used:

``` text
id: pi-flow
name: PI Flow
status: Active
category: Workflow Automation
```

Conceptually:

> PiGenesis workflow automation platform for designing, executing, and
> improving digital workflows.

These development records are not necessarily final production seed
data.

------------------------------------------------------------------------

# 3. DEVELOPMENT WORKING PREFERENCES

These are important operating instructions for future PiGenesis
conversations.

## 3.1 Continuous execution

The user wants continuous implementation.

Do not stop for routine confirmation.

Do not repeatedly ask:

-   "Should I continue?"
-   "Do you want me to proceed?"
-   "OK?"
-   "Shall we move to the next task?"

Continue unless there is:

-   an actual error,
-   unexpected behavior,
-   missing information that genuinely blocks correctness,
-   or a real architectural/business decision.

## 3.2 One concrete task at a time

The user does not want to be overwhelmed with a huge implementation
list.

Maintain the overall roadmap internally, but present and execute the
next concrete task.

## 3.3 Complete replacement files

When changing a page/file, prefer a **complete replacement file** rather
than a middle snippet.

Reason: - partial snippets caused confusion, - variable names were
previously assumed incorrectly, - user wants direct, reliable
implementation.

## 3.4 Preserve existing variable names

Known important variables:

``` text
filteredProjects
filteredAndSortedProducts
filteredAndSortedServices
```

Do not rename them unnecessarily.

## 3.5 Preserve working code

Do not rewrite stable code unnecessarily.

Make the smallest correct change.

Do not generate/download a whole project/package unless explicitly
requested.

## 3.6 Architecture consistency

Frontend:

``` text
UI
 ↓
Page
 ↓
Frontend Service / API boundary
 ↓
Backend
```

Backend:

``` text
Route
 ↓
Controller
 ↓
Service
 ↓
Repository
 ↓
Database
```

## 3.7 UI does not own data

UI/pages should consume data.

Data persistence/business logic should remain in service/repository
layers.

## 3.8 Development philosophy

``` text
Build
→ Understand
→ Test
→ Break intentionally
→ Debug
→ Fix
→ Document
→ Deploy
→ Monitor
```

The user wants to understand the architecture and reasoning, not blindly
paste code.

## 3.9 No framework hopping

Keep the chosen technology stack unless a real architectural requirement
justifies change.

## 3.10 Exact working directories

Repository:

``` text
D:\PiGenesis\pigenesis
```

Frontend:

``` text
D:\PiGenesis\pigenesis\apps\platform
```

Backend:

``` text
D:\PiGenesis\pigenesis\apps\api
```

Git commands normally run from repository root.

Backend npm commands run from `apps/api`.

Frontend npm commands run from `apps/platform`.

## 3.11 Timestamp

Every PiGenesis ChatGPT response should include the current India time:

``` text
IST (UTC+5:30)
```

------------------------------------------------------------------------

# 4. TECHNOLOGY STACK

## 4.1 Frontend

Current:

-   React
-   TypeScript
-   Vite
-   Tailwind CSS
-   React Router
-   Vitest
-   jsdom

Location:

``` text
apps/platform
```

## 4.2 Backend

Current:

-   Node.js
-   TypeScript
-   Express
-   PostgreSQL
-   `pg`
-   `dotenv`
-   `tsx`

Package:

``` text
@pigenesis/api@0.1.0
```

Build:

``` text
tsc
```

## 4.3 Database

Current database:

``` text
PostgreSQL
```

## 4.4 Infrastructure

-   GitHub
-   GitHub organization `pigenesislabs`
-   Cloudflare Pages
-   Cloudflare Workers

Live frontend:

``` text
https://pigenesis.pages.dev
```

## 4.5 Technologies intentionally avoided

The project has intentionally avoided:

-   unnecessary framework changes
-   framework hopping
-   premature enterprise abstractions
-   premature soft-delete
-   trash/restore systems before the proper enterprise stage
-   premature audit logging
-   premature advanced permission systems
-   direct database access from React pages
-   direct SQL in controllers
-   premature entity relationships
-   unnecessary duplicate database connection modules

------------------------------------------------------------------------

# 5. REPOSITORY / GIT

## 5.1 Repository root

``` text
D:\PiGenesis\pigenesis
```

## 5.2 GitHub organization

``` text
pigenesislabs
```

## 5.3 Git identity

Project/company Git email:

``` text
pigenesis.pi@gmail.com
```

Git user name was configured for the company/project identity.

## 5.4 Branching

Primary development branch:

``` text
develop
```

Production branch:

``` text
main
```

Workflow:

``` text
develop
  ↓
test
  ↓
build
  ↓
commit
  ↓
push develop
  ↓
merge develop → main
  ↓
push main
  ↓
deploy / verify
```

## 5.5 Important package-lock decision

There is an intentionally untracked file:

``` text
apps/package-lock.json
```

This was deliberately NOT added to the repository.

Do not stage it accidentally.

Tracked package lockfiles include:

``` text
apps/platform/package-lock.json
apps/api/package-lock.json
```

## 5.6 Known recent Git history

At the latest backend foundation point:

``` text
17cd547 (HEAD -> develop, origin/develop)
Task 64: Build backend foundation and REST APIs

9498702
Complete project module foundation and documentation

d8ee57e
Align product and service registry UI

b1b59ea
Align project product and service module UI

fbfb443
Task 62: Add service creation
```

Other important historical commits:

``` text
72fb6a5
Sprint 2: Build platform navigation and dynamic dashboard

a53199f
Task 42 testing foundation

8apvsm
Product search/filter/sort

bxypg5
Product service error handling and diagnostics

z85oqf
Service module foundation

2kjzyy
Service deletion
```

These hashes are historical references; do not assume every hash is the
current HEAD.

------------------------------------------------------------------------

# 6. FOUNDATION PHASE

**STATUS: COMPLETE**

Completed:

1.  Company Name --- PiGenesis
2.  Mission --- Project Independence
3.  GitHub
4.  Cloudflare
5.  Live Website
6.  Brand Logo
7.  Initial Design Language

------------------------------------------------------------------------

# 7. SPRINT 1

**STATUS: COMPLETE**

Established:

-   GitHub desktop workflow
-   GitHub local linkage
-   Git identity
-   `develop` branch
-   initial routing
-   sidebar/menu
-   platform shell
-   initial platform UI
-   Cloudflare deployment foundation

A deployment issue occurred during early work and was resolved.

------------------------------------------------------------------------

# 8. SPRINT 2

**STATUS: COMPLETE**

Major work:

-   React Router installed
-   `App.tsx` renders `AppRouter`
-   localhost routing verified
-   ProjectsPage
-   ProductsPage
-   ServicesPage
-   SettingsPage
-   MainLayout
-   Header
-   Sidebar
-   active sidebar navigation
-   Project registry/details
-   Product registry/details
-   Service registry/details
-   StatusBadge
-   StatCard
-   dynamic dashboard statistics
-   responsive shell
-   settings foundation
-   production build validation

Commit:

``` text
72fb6a5
Sprint 2: Build platform navigation and dynamic dashboard
```

------------------------------------------------------------------------

# 9. FRONTEND ARCHITECTURE

## 9.1 Historical local-first architecture

The frontend initially used:

``` text
React UI
 ↓
Pages
 ↓
Service layer
 ↓
localStorage
```

This was deliberate.

Benefits: - fast development - easy CRUD testing - clear data boundary -
storage implementation could later be replaced

## 9.2 Current migration direction

The target is:

``` text
React UI
 ↓
Page
 ↓
Frontend API service
 ↓
REST API
 ↓
Express
 ↓
Service
 ↓
Repository
 ↓
PostgreSQL
```

The frontend should eventually stop treating localStorage as the
authoritative source.

## 9.3 Entity registries

Three core registries:

``` text
PROJECT
PRODUCT
SERVICE
```

Definitions:

``` text
PROJECT = work / initiative
PRODUCT = reusable offering / capability
SERVICE = capability / service provided
```

They are currently independent intentionally.

## 9.4 Future relationships

Potential relationships:

``` text
Project ↔ Product
Project ↔ Service
Product ↔ Service
```

Potential relationship types:

``` text
develops
supports
uses
delivers
depends_on
```

Do not prematurely add:

``` text
productId
serviceId
```

to every entity.

When relationships are implemented, explicit relationship
entities/tables should be considered, especially for many-to-many
relationships.

Future conceptual flow:

``` text
Project
   ↓ develops
Product
   ↓ enables
Service
   ↓ delivered to
Customer / Organization
```

------------------------------------------------------------------------

# 10. FRONTEND ENTITY MODELS

## 10.1 Project

Current model:

``` ts
export type ProjectStatus = "Active" | "Planning" | "Completed";

export type Project = {
  id: string;
  name: string;
  status: ProjectStatus;
  description: string;
  type: string;
};

export type CreateProjectInput = {
  name: string;
  id: string;
  status: ProjectStatus;
  description: string;
  type: string;
};
```

ID is stable/immutable.

Editable:

``` text
name
type
status
description
```

## 10.2 Product

Current model:

``` ts
export type ProductStatus = "Active" | "Planning" | "Coming Soon";

export type Product = {
  id: string;
  name: string;
  status: ProductStatus;
  description: string;
  category: string;
};

export type CreateProductInput = {
  id: string;
  name: string;
  status: ProductStatus;
  description: string;
  category: string;
};
```

## 10.3 Service

Current model:

``` ts
export type ServiceStatus = "Active" | "Planning" | "Coming Soon";

export type Service = {
  id: string;
  name: string;
  status: ServiceStatus;
  description: string;
  category: string;
};
```

A `CreateServiceInput` was added.

------------------------------------------------------------------------

# 11. PROJECT MODULE HISTORY

## Task 31 --- Core Entity & Data Model Audit

**COMPLETE**

Fields finalized:

``` text
id
name
status
description
type
```

Statuses:

``` text
Active
Planning
Completed
```

## Task 32 --- Project Creation Model

**COMPLETE**

Files:

``` text
src/types/project.ts
src/services/projectService.ts
```

Storage key:

``` text
pigenesis_projects
```

Functions:

``` text
loadProjects()
getProjects()
getProjectById()
createProject()
updateProject()
deleteProject()
```

Reactive event:

``` text
pigenesis-projects-updated
```

## Task 33 --- Create Project Form

**COMPLETE**

File:

``` text
src/pages/CreateProjectPage.tsx
```

Fields:

``` text
Project ID
Name
Type
Status
Description
```

ID rule:

``` text
lowercase letters
numbers
hyphens
```

Duplicate message:

``` text
A project with this ID already exists.
```

Success route:

``` text
/projects/:id
```

## Task 34 --- Reactive Projects List

**COMPLETE**

ProjectsPage: - uses `getProjects()` - uses React state - listens to
`pigenesis-projects-updated`

## Task 35 --- Project Editing

**COMPLETE**

Added:

``` text
getProjectById()
updateProject()
EditProjectPage.tsx
```

Route:

``` text
/projects/:projectId/edit
```

ID is disabled/immutable.

## Task 36 --- Dynamic Project Details Architecture

**COMPLETE**

ProjectDetailsPage uses:

``` text
getProjectById()
```

instead of direct array search.

## Task 37 --- Project Search / Filter / Sort

**COMPLETE**

Search covers:

``` text
name
id
description
type
```

Known variable:

``` text
filteredProjects
```

## Task 38 --- Project Delete

**COMPLETE**

Added:

``` text
deleteProject()
```

Uses confirmation.

Final navigation:

``` text
navigate("/projects")
```

## Task 39 --- Engineering Documentation Foundation

**COMPLETE**

Created:

``` text
docs/architecture/system.md
```

Documents:

Current:

``` text
React UI → Pages → Services → localStorage
```

Future:

``` text
React → frontend services → API → backend → database
```

Future platform layers documented:

``` text
Identity
Workflow
Knowledge
AI
Integrations
Analytics
Product Layer
```

## Task 40 --- Architecture Map

**COMPLETE**

Created:

``` text
docs/architecture/architecture-map.md
```

## Task 41 --- Error Handling Foundation

**COMPLETE**

File:

``` text
src/types/appError.ts
```

Exact error codes:

``` ts
export type AppErrorCode =
  | "VALIDATION_ERROR"
  | "NOT_FOUND"
  | "DUPLICATE"
  | "STORAGE_ERROR"
  | "NETWORK_ERROR"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "UNKNOWN_ERROR";
```

Interface:

``` ts
export interface AppError {
  code: AppErrorCode;
  message: string;
  details?: string;
}
```

File:

``` text
src/utils/errorHandler.ts
```

Functions:

``` text
createAppError()
getErrorMessage()
```

Important detail: - Page-level duplicate checking occurs before service
duplicate handling. - Therefore the browser duplicate UI does not invoke
the service duplicate logger. - This was explicitly reviewed and
intentionally left unchanged.

## Task 42 --- Testing Foundation

**COMPLETE**

Installed: - Vitest - jsdom

Scripts:

``` json
"test": "vitest",
"test:run": "vitest run"
```

Vite config uses: - `vitest/config` - React plugin - Tailwind plugin -
jsdom - globals

## Task 43 --- Debugging & Diagnostics

**COMPLETE**

File:

``` text
src/utils/logger.ts
```

Functions:

``` text
logInfo
logWarn
logError
```

A separate browser/VM/web-vitals `reportAllChanges/startTime` error was
observed but did not affect the application.

## Task 44 --- Configuration & Environment Foundation

**COMPLETE**

File:

``` text
src/config/appconfig.ts
```

Exact content:

``` ts
const appConfig = {
  appName: "PiGenesis",
  environment: "development",
  version: "1.0.0",
} as const;

export default appConfig;
```

Settings displayed: - Environment: Production - System Status: Online -
Theme: Dark

## Task 45 --- Service Layer Storage Error Handling

**COMPLETE**

Project service: - catches localStorage read failures - catches save
failures - logs - throws `STORAGE_ERROR` - handles malformed JSON by
logging/resetting defaults

Vitest required replacing `globalThis.localStorage` because jsdom spy
interception did not behave as expected.

## Task 46 --- Project Service Validation

**COMPLETE**

`validateProjectInput` validates: - ID required - ID format - name -
description - type - status

Tests reached 14.

## Task 47 --- Project Update Validation

**COMPLETE**

Added:

``` text
validateProjectUpdates()
```

Tests reached 18.

## Task 48 --- Project Service Consistency

**COMPLETE**

`deleteProject()` reloads storage before deleting.

Tests reached 19.

## Task 49 --- Project Service Documentation

**COMPLETE**

Created:

``` text
docs/modules/project-service.md
```

------------------------------------------------------------------------

# 12. PRODUCT MODULE HISTORY

## Task 50 --- Product Service Foundation

**COMPLETE**

Files:

``` text
src/types/product.ts
src/services/productService.ts
```

Storage:

``` text
pigenesis_products
```

Default products:

``` text
pi-flow
pi-docs
pi-ai
pi-vault
```

Functions: - load - get - getById - create - update - delete

Event:

``` text
pigenesis-products-updated
```

## Task 51 --- Product Creation Model

**COMPLETE**

Validation: - ID required - lowercase - numbers - hyphens - name
required - description required - category required - valid status

## Task 52 --- Product Editing

**COMPLETE**

Added:

``` text
validateProductUpdates()
updateProduct()
EditProductPage.tsx
```

Route:

``` text
/products/:productId/edit
```

ID immutable.

## Task 53 --- Product Delete

**COMPLETE**

Added:

``` text
deleteProduct()
```

Behavior: - reload storage - existence check - filter - save - cache
update - event - logging

## Task 54 --- Product Search / Filter / Sort

**COMPLETE**

Search:

``` text
name
id
category
description
```

Filter:

``` text
All
Planning
Active
Coming Soon
```

Sort:

``` text
Name A-Z
Name Z-A
Category A-Z
Status
```

Known variable:

``` text
filteredAndSortedProducts
```

Result:

``` text
Showing X of Y products
```

## Task 55 --- Product Error Handling & Diagnostics

**COMPLETE**

Added: - `createAppError` - `logError` - `logInfo` - storage error
handling - malformed storage handling - operation logging

Tests reached 35 combined at that stage.

## Task 56 --- Product Service Documentation

**COMPLETE**

Created:

``` text
docs/modules/product-service.md
```

## Task 61 --- Product Creation

**COMPLETE**

File:

``` text
src/pages/CreateProductPage.tsx
```

Fields:

``` text
Product ID
Name
Category
Status
Description
```

Uses:

``` text
createProduct()
getErrorMessage()
```

Route:

``` text
/products/new
```

Added:

``` text
+ Create Product
```

Tested: - creation - duplicate ID - validation - registry update -
refresh persistence - edit - delete - ID visibility

------------------------------------------------------------------------

# 13. SERVICE MODULE HISTORY

## Task 57 --- Service Module Foundation

**COMPLETE**

Files:

``` text
src/types/service.ts
src/services/serviceService.ts
```

Storage:

``` text
pigenesis_services
```

Default services:

``` text
ai-consulting
workflow-automation
digital-solutions
```

Event:

``` text
pigenesis-services-updated
```

## Task 58 --- Service Editing

**COMPLETE**

Added:

``` text
validateServiceUpdates()
updateService()
EditServicePage.tsx
```

Route:

``` text
/services/:serviceId/edit
```

ID immutable.

Important TypeScript fix:

``` ts
const currentServiceId = service.id;
const currentServiceName = service.name;
```

before nested handlers.

## Task 59 --- Service Deletion

**COMPLETE**

Added:

``` text
deleteService()
```

Historical implementation:

``` text
window.location.href = "/services"
```

Problem: - full page reload - console state lost

Final implementation:

``` text
useNavigate()
navigate("/services")
```

## Task 60 --- Service Search / Filter / Sort

**COMPLETE**

Search:

``` text
name
id
category
description
```

Filter:

``` text
All
Planning
Active
Coming Soon
```

Sort:

``` text
Name A-Z
Name Z-A
Category A-Z
Status
```

Known variable:

``` text
filteredAndSortedServices
```

Result:

``` text
Showing X of Y services
```

Event:

``` text
pigenesis-services-updated
```

## Task 62 --- Service Creation

**COMPLETE**

File:

``` text
CreateServicePage.tsx
```

Fields:

``` text
Service ID
Name
Category
Status
Description
```

Route:

``` text
/services/new
```

Added:

``` text
+ Create Service
```

Manual creation/validation testing succeeded.

------------------------------------------------------------------------

# 14. REGISTRY UI STANDARDIZATION

The final decision was to make Projects, Products and Services
consistent in overall layout and behavior.

The Project page had initially served as the richer visual reference.
The final direction standardized all three.

## Standard structure

``` text
Page wrapper
  ↓
Title + InfoTooltip
Subtitle
Create button
  ↓
Search / Status / Sort box
  ↓
Result count
  ↓
Entity cards
```

## Page wrapper

``` text
max-w-7xl
```

## Header

``` text
flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between
```

## Title

``` text
text-4xl font-bold
```

## Subtitle

``` text
mt-2 text-lg
```

## Filter container

``` text
mt-8 rounded-xl border border-slate-700 bg-slate-900 p-5
```

## Filter grid

``` text
grid gap-4 md:grid-cols-3
```

## Input styling

``` text
bg-slate-800
border-slate-700
text-sm
focus:border-blue-500
focus:outline-none
focus:ring-1
focus:ring-blue-500
```

## Cards

``` text
group rounded-xl border border-slate-700 bg-slate-900 p-6
transition
hover:-translate-y-1
hover:border-blue-500
hover:bg-slate-800
```

## Card grid

``` text
mt-5 grid gap-6 md:grid-cols-2 xl:grid-cols-3
```

## Registry card content

``` text
Name
ID
Status
----------------
Type / Category
View action
```

Descriptions were removed from registry cards because long descriptions
made the cards awkward.

Full descriptions remain on Details pages.

## Result counts

``` text
Showing X of Y projects
Showing X of Y products
Showing X of Y services
```

## Search

Descriptions remain searchable even though they are not displayed on
cards.

------------------------------------------------------------------------

# 15. INFO TOOLTIP

Reusable component:

``` text
apps/platform/src/components/ui/InfoTooltip.tsx
```

Purpose: - circular info icon - explain what entity means - explain what
user should add - avoid duplicated tooltip implementations

Suggested content:

## Projects

``` text
Projects represent initiatives or bodies of work that PiGenesis is building, improving, researching, or executing.

Add a clear ID, project name, type, status, and meaningful description.
```

## Products

``` text
Products represent reusable products or platform capabilities that PiGenesis builds and offers.

Add a clear ID, product name, category, status, and meaningful description.
```

## Services

``` text
Services represent capabilities or services that PiGenesis provides to customers or organizations.

Add a clear ID, service name, category, status, and meaningful description.
```

This component is a UX enhancement, not a change to the platform's
underlying data architecture.

------------------------------------------------------------------------

# 16. STATUS UI

Reusable components:

``` text
src/components/ui/StatusBadge.tsx
src/components/ui/StatusText.tsx
```

Project statuses:

``` text
Active
Planning
Completed
```

Product/Service statuses:

``` text
Active
Planning
Coming Soon
```

User's explicit preferred visual mapping:

``` text
Active       → green
Planning     → blue
Completed    → red
Coming Soon  → purple
```

Important exact preference:

``` text
Completed = text-red-300
```

An older implementation used grey for Completed. The final user
preference is red.

Do not revert this to grey.

------------------------------------------------------------------------

# 17. RESPONSIVE UI

Sidebar: - full desktop display - hidden/collapsed in narrow view

Registry cards:

``` text
md:grid-cols-2
xl:grid-cols-3
```

Header:

``` text
flex-col
```

on narrow screens and:

``` text
sm:flex-row
```

on larger screens.

Do not redesign the UI unnecessarily while working on backend
functionality.

------------------------------------------------------------------------

# 18. DETAILS PAGE RULES

Registry page is summary.

Details page is full information.

Registry:

``` text
Name
ID
Status
Type/Category
View
```

Details:

``` text
Name
ID
Status
Description
Type/Category
Edit
Delete
```

Future Details pages may include: - relationships - activity/history -
dependencies - ownership - workflow links

ProductDetailsPage was specifically adjusted: - description removed from
header when already present in Product Overview - Product ID added under
title

IDs were also added to Project and Service page/details presentation.

------------------------------------------------------------------------

# 19. ROUTING

Actual routing folder:

``` text
apps/platform/src/routes/
```

Important correction:

``` text
src/router/
```

is NOT the current routing directory.

Actual router:

``` text
apps/platform/src/routes/AppRouter.tsx
```

Known routes:

``` text
/projects
/projects/new
/projects/:projectId
/projects/:projectId/edit

/products
/products/new
/products/:productId
/products/:productId/edit

/services
/services/new
/services/:serviceId
/services/:serviceId/edit

/settings
```

Edit routes must be registered before generic detail routes where
necessary.

------------------------------------------------------------------------

# 20. FRONTEND TESTING HISTORY

Known progression:

``` text
Project tests → initial foundation
Task 45 → expanded
Task 46 → 14
Task 47 → 18
Task 48 → 19
Product module → 30
Product delete → 33
Product diagnostics → 35
Service module → 48
Service editing → 55
Service deletion → 58
```

Latest frontend baseline before backend transition:

``` text
58/58 tests passed
```

Build:

``` text
passed
```

------------------------------------------------------------------------

# 21. BACKEND FOUNDATION --- TASK 64

**STATUS: COMPLETE**

Git commit:

``` text
17cd547
Task 64: Build backend foundation and REST APIs
```

Backend now includes: - Express - TypeScript - PostgreSQL - routes -
controllers - services - repositories - database configuration -
database initialization scripts - health endpoints - Project REST API -
Product REST API - Service REST API - User foundation

------------------------------------------------------------------------

# 22. CURRENT BACKEND FOLDER STRUCTURE

Known current structure:

``` text
apps/api/
│
├── database/
│   └── schema.sql
│
├── dist/
│
├── node_modules/
│
├── src/
│   ├── config/
│   │   ├── appConfig.ts
│   │   ├── auth.ts
│   │   ├── database.ts
│   │   └── databaseConfig.ts
│   │
│   ├── controllers/
│   │   ├── apiController.ts
│   │   ├── databaseController.ts
│   │   ├── healthController.ts
│   │   ├── productController.ts
│   │   ├── projectController.ts
│   │   ├── serviceController.ts
│   │   └── userController.ts
│   │
│   ├── database/
│   │   └── users.sql
│   │
│   ├── middleware/
│   │
│   ├── routes/
│   │   ├── apiRoutes.ts
│   │   ├── databaseRoutes.ts
│   │   ├── healthRoutes.ts
│   │   ├── productRoutes.ts
│   │   ├── projectRoutes.ts
│   │   └── serviceRoutes.ts
│   │
│   ├── scripts/
│   │   ├── initDatabase.ts
│   │   └── initUsersTable.ts
│   │
│   └── services/
│       ├── authProvider.ts
│       ├── productRepository.ts
│       ├── projectRepository.ts
│       ├── serviceRepository.ts
│       ├── userRepository.ts
│       └── userService.ts
│
├── package.json
└── package-lock.json
```

The latest file listing is the source for this known structure. The full
route/controller/repository dump confirmed these files and
implementations.

The exact backend application entrypoint filename is **UNKNOWN** from
the available project context and must be checked in the repository
before documenting it as final.

------------------------------------------------------------------------

# 23. DATABASE CONFIGURATION

## `apps/api/src/config/databaseConfig.ts`

Current:

``` ts
const databaseConfig = {
  host: process.env.DB_HOST ?? "localhost",
  port: process.env.DB_PORT
    ? Number(process.env.DB_PORT)
    : 5432,
  name: process.env.DB_NAME ?? "pigenesis",
  user: process.env.DB_USER ?? "postgres",
  password: process.env.DB_PASSWORD ?? "",
} as const;

export default databaseConfig;
```

## `apps/api/src/config/database.ts`

Current:

``` ts
import { Pool } from "pg";
import databaseConfig from "./databaseConfig";

const pool = new Pool({
  host: databaseConfig.host,
  port: databaseConfig.port,
  database: databaseConfig.name,
  user: databaseConfig.user,
  password: databaseConfig.password,
});

export default pool;
```

Important:

There is **no `db.ts` file**.

Do not create one unnecessarily.

`database.ts` is the current PostgreSQL pool module.

------------------------------------------------------------------------

# 24. DATABASE DIRECTORY DECISION

Two directories exist:

``` text
apps/api/database/
apps/api/src/database/
```

Current files:

``` text
apps/api/database/schema.sql
apps/api/src/database/users.sql
```

They are not duplicate runtime database connection modules.

Runtime database connection:

``` text
apps/api/src/config/database.ts
```

Database configuration:

``` text
apps/api/src/config/databaseConfig.ts
```

SQL artifacts are separate.

A future cleanup/consolidation of SQL/migration organization may be
considered, but it is not currently a reason to restructure the backend.

------------------------------------------------------------------------

# 25. ENVIRONMENT / PASSWORD DEBUGGING

An important backend error occurred:

``` text
SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string
```

It occurred during:

``` text
npm run db:init:users
```

Initial client configuration used a password value that was not
guaranteed to be a string:

``` ts
password: process.env.PGPASSWORD,
```

The environment was inspected.

Command:

``` powershell
node -e "require('dotenv').config(); console.log(process.env.DB_PASSWORD ? 'DB_PASSWORD = SET' : 'DB_PASSWORD = MISSING')"
```

Result:

``` text
DB_PASSWORD = SET
```

Configuration was also checked safely:

``` text
host: localhost
name: pigenesis
user: postgres
password: SET
```

Actual password was never supposed to be printed.

The working configuration aligned the database initialization with:

``` text
DB_PASSWORD
```

Then:

``` powershell
npm run build
npm run db:init:users
```

succeeded.

Security rule:

-   Never print the actual DB password.
-   Never commit secrets.
-   `.env` should remain local/untracked.
-   Use `SET` / `MISSING` checks for debugging.

------------------------------------------------------------------------

# 26. DATABASE INITIALIZATION

Scripts:

``` text
apps/api/src/scripts/initDatabase.ts
apps/api/src/scripts/initUsersTable.ts
```

Command:

``` powershell
npm run db:init:users
```

Package script executes:

``` text
tsx src/scripts/initUsersTable.ts
```

Final successful output:

``` text
PiGenesis users table initialized successfully.
```

PostgreSQL verification:

``` powershell
psql -U postgres -d pigenesis
```

Then:

``` sql
\dt
```

showed:

``` text
products
projects
services
users
```

------------------------------------------------------------------------

# 27. DATABASE TABLE DETAILS

## 27.1 Projects

Verified structure:

``` text
Column      Type                       Nullable
id          text                       not null
name        text                       not null
status      text                       not null
description text                       not null
type        text                       not null
created_at  timestamp with time zone   not null default now()
updated_at  timestamp with time zone   not null default now()
```

Indexes:

``` text
projects_pkey PRIMARY KEY, btree (id)
idx_projects_name btree (name)
idx_projects_status btree (status)
```

Status constraint:

``` text
Active
Planning
Completed
```

## 27.2 Products

Verified structure:

``` text
id
name
status
description
category
created_at
updated_at
```

Indexes:

``` text
products_pkey PRIMARY KEY, btree (id)
idx_products_name btree (name)
idx_products_status btree (status)
```

Status constraint:

``` text
Active
Planning
Coming Soon
```

## 27.3 Services

Verified structure:

``` text
id
name
status
description
category
created_at
updated_at
```

Indexes:

``` text
services_pkey PRIMARY KEY, btree (id)
idx_services_name btree (name)
idx_services_status btree (status)
```

Status constraint:

``` text
Active
Planning
Coming Soon
```

## 27.4 Users

Verified structure:

``` text
id             text                       not null
email          text                       not null
display_name   text                       not null
status         text                       not null
created_at     timestamp with time zone   not null default now()
updated_at     timestamp with time zone   not null default now()
```

Indexes/constraints:

``` text
users_pkey PRIMARY KEY, btree (id)
idx_users_email btree (email)
idx_users_status btree (status)
users_email_key UNIQUE CONSTRAINT, btree (email)
```

Status check:

``` text
Active
Invited
Suspended
Disabled
```

Current row count:

``` text
0
```

------------------------------------------------------------------------

# 28. BACKEND ROUTES

## `apiRoutes.ts`

``` ts
import { Router } from "express";
import { getApiInfo } from "../controllers/apiController";

const router = Router();

router.get("/", getApiInfo);

export default router;
```

## `databaseRoutes.ts`

``` ts
import { Router } from "express";
import { getDatabaseHealth } from "../controllers/databaseController";

const router = Router();

router.get("/health", getDatabaseHealth);

export default router;
```

## `healthRoutes.ts`

``` ts
import { Router } from "express";
import { getHealth } from "../controllers/healthController";

const router = Router();

router.get("/", getHealth);

export default router;
```

## `productRoutes.ts`

``` ts
import { Router } from "express";

import {
  createProductHandler,
  deleteProductHandler,
  getProduct,
  listProducts,
  updateProductHandler,
} from "../controllers/productController";

const router = Router();

router.get("/", listProducts);
router.get("/:id", getProduct);
router.post("/", createProductHandler);
router.put("/:id", updateProductHandler);
router.delete("/:id", deleteProductHandler);

export default router;
```

## `projectRoutes.ts`

``` ts
import { Router } from "express";

import {
  createProjectHandler,
  deleteProjectHandler,
  getProject,
  listProjects,
  updateProjectHandler,
} from "../controllers/projectController";

const router = Router();

router.get("/", listProjects);
router.get("/:id", getProject);
router.post("/", createProjectHandler);
router.put("/:id", updateProjectHandler);
router.delete("/:id", deleteProjectHandler);

export default router;
```

## `serviceRoutes.ts`

``` ts
import { Router } from "express";

import {
  createServiceHandler,
  deleteServiceHandler,
  getService,
  listServices,
  updateServiceHandler,
} from "../controllers/serviceController";

const router = Router();

router.get("/", listServices);
router.get("/:id", getService);
router.post("/", createServiceHandler);
router.put("/:id", updateServiceHandler);
router.delete("/:id", deleteServiceHandler);

export default router;
```

### User routes

A `userController.ts`, `userService.ts`, and `userRepository.ts` exist.

The latest route file listing did **not** show a `userRoutes.ts` file.

Whether user routes are mounted through another router is **UNKNOWN**
and must be verified from the actual backend entrypoint/router before
adding or documenting a public user route.

------------------------------------------------------------------------

# 29. BACKEND PROJECT REPOSITORY

File:

``` text
apps/api/src/services/projectRepository.ts
```

Row:

``` ts
type ProjectRow = {
  id: string;
  name: string;
  status: Project["status"];
  description: string;
  type: string;
  created_at: Date;
  updated_at: Date;
};
```

Mapping:

``` text
created_at → createdAt
updated_at → updatedAt
```

Functions:

``` text
getProjects()
getProjectById(id)
createProject(input)
updateProject(id, input)
deleteProject(id)
```

List query:

``` sql
SELECT
  id,
  name,
  status,
  description,
  type,
  created_at,
  updated_at
FROM projects
ORDER BY created_at DESC
```

Get:

``` sql
WHERE id = $1
```

Create:

``` sql
INSERT INTO projects (
  id,
  name,
  status,
  description,
  type
)
VALUES ($1, $2, $3, $4, $5)
RETURNING ...
```

Update:

``` sql
UPDATE projects
SET
  name = $1,
  status = $2,
  description = $3,
  type = $4,
  updated_at = NOW()
WHERE id = $5
RETURNING ...
```

Delete:

``` sql
DELETE FROM projects
WHERE id = $1
```

Queries are parameterized.

------------------------------------------------------------------------

# 30. BACKEND PRODUCT REPOSITORY

File:

``` text
apps/api/src/services/productRepository.ts
```

Row:

``` ts
type ProductRow = {
  id: string;
  name: string;
  status: Product["status"];
  description: string;
  category: string;
  created_at: Date;
  updated_at: Date;
};
```

Functions:

``` text
getProducts()
getProductById(id)
createProduct(input)
updateProduct(id, input)
deleteProduct(id)
```

List:

``` sql
SELECT
  id,
  name,
  status,
  description,
  category,
  created_at,
  updated_at
FROM products
ORDER BY created_at DESC
```

Get:

``` sql
WHERE id = $1
```

Create:

``` sql
INSERT INTO products (
  id,
  name,
  status,
  description,
  category
)
VALUES ($1, $2, $3, $4, $5)
RETURNING ...
```

Update:

``` sql
UPDATE products
SET
  name = $1,
  status = $2,
  description = $3,
  category = $4,
  updated_at = NOW()
WHERE id = $5
RETURNING ...
```

Delete:

``` sql
DELETE FROM products
WHERE id = $1
```

------------------------------------------------------------------------

# 31. BACKEND SERVICE REPOSITORY

File:

``` text
apps/api/src/services/serviceRepository.ts
```

Row:

``` ts
type ServiceRow = {
  id: string;
  name: string;
  status: Service["status"];
  description: string;
  category: string;
  created_at: Date;
  updated_at: Date;
};
```

Functions:

``` text
getServices()
getServiceById(id)
createService(input)
updateService(id, input)
deleteService(id)
```

List:

``` sql
SELECT
  id,
  name,
  status,
  description,
  category,
  created_at,
  updated_at
FROM services
ORDER BY created_at DESC
```

Get:

``` sql
WHERE id = $1
```

Create:

``` sql
INSERT INTO services (
  id,
  name,
  status,
  description,
  category
)
VALUES ($1, $2, $3, $4, $5)
RETURNING ...
```

Update:

``` sql
UPDATE services
SET
  name = $1,
  status = $2,
  description = $3,
  category = $4,
  updated_at = NOW()
WHERE id = $5
RETURNING ...
```

Delete:

``` sql
DELETE FROM services
WHERE id = $1
```

------------------------------------------------------------------------

# 32. USER BACKEND MODULE

## 32.1 User repository

File:

``` text
apps/api/src/services/userRepository.ts
```

User status type:

``` ts
export type UserStatus =
  | "Active"
  | "Invited"
  | "Suspended"
  | "Disabled";
```

User record:

``` ts
export type UserRecord = {
  id: string;
  email: string;
  displayName: string;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
};
```

Database row:

``` ts
type UserRow = {
  id: string;
  email: string;
  display_name: string;
  status: UserStatus;
  created_at: Date;
  updated_at: Date;
};
```

Mapping:

``` text
display_name → displayName
created_at → createdAt.toISOString()
updated_at → updatedAt.toISOString()
```

Functions:

``` text
findAllUsers()
findUserById(userId)
findUserByEmail(email)
insertUser(input)
updateUser(userId, input)
deleteUser(userId)
```

## 32.2 User service

File:

``` text
apps/api/src/services/userService.ts
```

Create input:

``` ts
export type CreateUserInput = {
  id: string;
  email: string;
  displayName: string;
  status: UserStatus;
};
```

Update input:

``` ts
export type UpdateUserInput = {
  email: string;
  displayName: string;
  status: UserStatus;
};
```

Functions:

``` text
getUsers()
getUserById()
createUser()
editUser()
removeUser()
```

Current duplicate behavior:

``` text
createUser()
  ↓
findUserByEmail()
  ↓
existing user?
  ↓
throw new Error("A user with this email already exists.")
```

`editUser()` checks whether another user already owns the requested
email.

This ordinary `Error` behavior is a known inconsistency.

------------------------------------------------------------------------

# 33. USER CONTROLLER

File:

``` text
apps/api/src/controllers/userController.ts
```

Handlers:

``` text
listUsers
getUser
createNewUser
updateExistingUser
deleteExistingUser
```

## listUsers

Calls:

``` text
getUsers()
```

Success:

``` http
200
```

Response:

``` json
{
  "data": []
}
```

Current errors use:

``` text
console.error(...)
res.status(500)
```

## getUser

ID normalization:

``` ts
const userId = Array.isArray(req.params.id)
  ? req.params.id[0]
  : req.params.id;
```

Missing ID:

``` http
400
```

Not found:

``` http
404
```

Message:

``` text
User not found.
```

## createNewUser

Required:

``` text
id
email
displayName
status
```

Missing field:

``` http
400
```

Success:

``` http
201
```

Duplicate handling currently uses:

``` text
error.message.includes("already exists")
```

and returns:

``` http
409
```

## updateExistingUser

Fields:

``` text
email
displayName
status
```

Missing required field:

``` http
400
```

Not found:

``` http
404
```

Duplicate email:

``` http
409
```

## deleteExistingUser

Uses:

``` text
removeUser(userId)
```

Not found:

``` http
404
```

Success:

``` http
204
```

------------------------------------------------------------------------

# 34. BACKEND ERROR ARCHITECTURE

## 34.1 Newer pattern

Project/Product/Service controllers use centralized `ApiError` behavior.

Example:

``` ts
throw new ApiError(
  409,
  "DUPLICATE",
  "A service with this ID already exists."
);
```

Not found:

``` ts
throw new ApiError(
  404,
  "NOT_FOUND",
  "Service not found."
);
```

## 34.2 Service controller flow

Create:

``` text
validateServiceInput(request.body)
        ↓
getServiceById(request.body.id)
        ↓
duplicate?
        ↓
ApiError(409, "DUPLICATE", ...)
        ↓
createService(...)
        ↓
201 { data: service }
```

Update:

``` text
getServiceId(request)
        ↓
validateServiceUpdate(request.body)
        ↓
updateService(...)
        ↓
null?
        ↓
ApiError(404, "NOT_FOUND", ...)
        ↓
200 { data: service }
```

Delete:

``` text
getServiceId(request)
        ↓
deleteService(...)
        ↓
false?
        ↓
ApiError(404, "NOT_FOUND", ...)
        ↓
204
```

## 34.3 User inconsistency

User currently uses: - ordinary `Error` - manual try/catch - direct
response formatting - duplicate detection based on message matching

This is the key reason for Task 65.

------------------------------------------------------------------------

# 35. BACKEND MANUAL API TESTING

PowerShell command pattern:

``` powershell
Invoke-RestMethod `
  -Uri "http://localhost:4000/api/projects" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{ ... }'
```

## Invalid Project ID

Test request:

``` json
{
  "id": "INVALID ID",
  "name": "Test Project",
  "status": "Active",
  "description": "Test",
  "type": "Platform"
}
```

Response:

``` json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Project ID must contain only lowercase letters, numbers, and hyphens."
  }
}
```

## Missing Project

GET:

``` text
http://localhost:4000/api/projects/not-found-project
```

returned a not-found response.

PUT:

``` text
http://localhost:4000/api/projects/does-not-exist
```

returned:

``` json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Project not found."
  }
}
```

## Missing Product

GET:

``` text
http://localhost:4000/api/products/not-found-product
```

returned:

``` json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Product not found."
  }
}
```

## Duplicate Product

Posting an existing `pi-flow` produced:

``` json
{
  "error": "A product with this ID already exists."
}
```

## Duplicate Service

Posting an existing service ID produced:

``` json
{
  "error": "A service with this ID already exists."
}
```

## Successful delete

Observed:

``` text
StatusCode        : 204
StatusDescription : No Content
Content           : {}
```

Expected REST behavior.

------------------------------------------------------------------------

# 36. TYPE-SAFETY ERROR THAT MUST NOT BE REPEATED

Express parameter typing produced:

``` text
Argument of type 'string | string[]' is not assignable to parameter of type 'string'.
```

Problematic pattern:

``` ts
getUserById(req.params.id)
```

Correct normalization:

``` ts
const userId = Array.isArray(req.params.id)
  ? req.params.id[0]
  : req.params.id;
```

This lesson applies to every handler receiving route parameters.

Do not repeat this TypeScript mistake.

------------------------------------------------------------------------

# 37. SECURITY / AUTHENTICATION

## Current state

Full production authentication is **NOT YET COMPLETE**.

Existing foundation:

``` text
apps/api/src/config/auth.ts
apps/api/src/services/authProvider.ts
```

Adapter:

``` ts
export interface AuthProviderAdapter {
  readonly provider: AuthProvider;

  authenticate(
    credential: string
  ): Promise<AuthenticatedIdentity>;
}
```

This indicates an adapter-based authentication boundary.

Planned sequence:

``` text
Backend foundation
    ↓
Users
    ↓
Authentication
    ↓
Authorization
    ↓
Organizations / Roles
```

Do not jump directly to full authentication before Task 65.

------------------------------------------------------------------------

# 38. AUTHORIZATION / PERMISSIONS

PiGenesis does not yet have its complete production authorization
architecture.

Future concepts:

``` text
Identity
Organization
Role
Permission
Resource
Action
Policy
Audit
```

Enterprise capabilities were deliberately deferred.

Earlier admin/counsellor role work belonged to the separate ManaFuture
educational consultancy project and should not be confused with
PiGenesis's final authorization model.

------------------------------------------------------------------------

# 39. DATABASE / SECURITY RULES

Important:

-   Never commit `.env`.
-   Never print DB passwords.
-   Never place credentials in source code.
-   Use environment variables.
-   Parameterize PostgreSQL queries.
-   Preserve immutable entity IDs.
-   Avoid destructive schema changes without migration planning.
-   Authentication and authorization must eventually be implemented at
    backend level.
-   Production secrets management is not yet documented as complete.

------------------------------------------------------------------------

# 40. SCALABILITY DECISIONS

Established:

1.  Stable IDs are immutable.
2.  Database access belongs in repositories.
3.  Business logic belongs in services.
4.  Controllers handle HTTP concerns.
5.  Routes define HTTP routing.
6.  PostgreSQL is the current relational foundation.
7.  REST is the current API style.
8.  SQL uses parameters.
9.  DB columns use snake_case.
10. TypeScript domain objects use camelCase.
11. Timestamps use PostgreSQL `timestamp with time zone`.
12. Relationships will be introduced explicitly later.
13. Enterprise features are delayed until their appropriate stage.
14. One consistent stack is preferred.
15. Documentation evolves with the implementation.
16. Testing accompanies meaningful behavior.
17. Build must pass before committing/pushing.

------------------------------------------------------------------------

# 41. DOCUMENTATION

Existing known documentation:

``` text
docs/architecture/system.md
docs/architecture/architecture-map.md
docs/modules/project-service.md
docs/modules/product-service.md
```

Service documentation was part of the Service module work.

Future:

``` text
docs/modules/user-service.md
docs/api/endpoints.md
docs/api/error-handling.md
```

Potential later:

``` text
docs/api/authentication.md
docs/api/authorization.md
docs/database/schema.md
docs/security/security-model.md
docs/deployment/deployment.md
```

Documentation must describe the **actual implementation**, not planned
features as though they already exist.

------------------------------------------------------------------------

# 42. API DOCUMENTATION DIRECTION

Known REST endpoint patterns:

``` text
GET    /api/projects
GET    /api/projects/:id
POST   /api/projects
PUT    /api/projects/:id
DELETE /api/projects/:id

GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id

GET    /api/services
GET    /api/services/:id
POST   /api/services
PUT    /api/services/:id
DELETE /api/services/:id
```

Health:

``` text
GET /api/health
```

Database health:

``` text
GET /api/database/health
```

API information:

``` text
GET /api
```

User endpoint URLs are not yet authoritative because user route mounting
has not been verified from the latest route listing.

------------------------------------------------------------------------

# 43. FRONTEND → BACKEND MIGRATION

The migration should be incremental.

Old:

``` text
Page
 ↓
localStorage service
```

Target:

``` text
Page
 ↓
frontend API service
 ↓
REST API
 ↓
Controller
 ↓
Service
 ↓
Repository
 ↓
PostgreSQL
```

Do not rewrite every page at once.

Create a clean frontend API boundary first, then migrate
Projects/Products/Services incrementally.

Maintain current UI behavior while replacing persistence.

------------------------------------------------------------------------

# 44. DEVELOPMENT DATABASE DATA

Verified Project:

``` text
id: pigenesis-platform
name: PiGenesis Platform
status: Active
type: Platform
```

Verified Product:

``` text
id: pi-flow
name: PI Flow
status: Active
category: Workflow Automation
```

Verified Service:

``` text
id: workflow-automation
name: Workflow Automation
status: Planning
category: Automation
```

These are development/test records.

Do not automatically treat them as final production seed data.

------------------------------------------------------------------------

# 45. CURRENT RISKS / TECHNICAL DEBT

## User error handling

**PENDING**

User module still uses older error handling.

## User route mounting

**UNKNOWN**

Need verify whether User routes are mounted.

## Backend testing

**PENDING**

Frontend testing foundation is mature enough for the current work, but
backend testing needs a dedicated foundation.

## Database migration/versioning

**PENDING**

A complete production migration/versioning strategy has not yet been
established.

Do not perform ad-hoc destructive production schema changes.

## Authentication

**PENDING**

Only foundation exists.

## Authorization

**PENDING**

Not yet production implemented.

## Organizations / multi-tenancy

**PENDING**

Not implemented.

## Relationships

**PENDING**

Project/Product/Service remain independent.

## Frontend API migration

**PENDING**

Frontend still has historical localStorage-backed services.

## API production deployment

**UNKNOWN / NOT CONFIRMED**

Local API works. Production API hosting has not been verified.

## Production secrets management

**PENDING**

Need proper production secret management before production backend
deployment.

## Audit logs

**FUTURE**

## Soft delete

**FUTURE**

## Trash / restore

**FUTURE**

## Advanced enterprise governance

**FUTURE**

------------------------------------------------------------------------

# 46. COMPLETED / IN PROGRESS / PENDING / FUTURE

## COMPLETED

### Foundation

-   PiGenesis identity
-   Project Independence
-   GitHub
-   Cloudflare
-   live website
-   logo
-   design language

### Frontend

-   React/Vite/TypeScript/Tailwind
-   React Router
-   dashboard
-   sidebar
-   layout
-   settings
-   Project registry
-   Product registry
-   Service registry
-   CRUD
-   validation
-   search/filter/sort
-   status components
-   stat cards
-   responsive shell
-   error handling
-   logging
-   config
-   tests
-   architecture documentation
-   module documentation
-   registry UX standardization
-   InfoTooltip
-   card description removal
-   ID visibility

### Backend

-   Express
-   TypeScript
-   PostgreSQL connection
-   database configuration
-   health/API/database endpoints
-   Project REST CRUD
-   Product REST CRUD
-   Service REST CRUD
-   repositories
-   User table
-   User repository
-   User service
-   User controller
-   database initialization
-   manual API testing
-   successful TypeScript build

## IN PROGRESS

``` text
Task 65 — Backend Service/Controller Consistency
```

## PENDING

-   User module standardization
-   backend testing foundation
-   API documentation
-   frontend API service boundary
-   frontend migration from localStorage
-   authentication
-   authorization
-   organization model
-   relationship model
-   production API deployment
-   production secrets management
-   migration/versioning strategy

## FUTURE

-   workflow engine
-   PI Flow full implementation
-   PI AI
-   PI Docs
-   PI Vault
-   knowledge layer
-   integrations
-   analytics
-   enterprise governance
-   audit
-   soft delete
-   restore
-   multi-tenancy
-   advanced permissions
-   compliance
-   observability
-   backup/recovery
-   deployment automation
-   enterprise/government-grade capabilities

------------------------------------------------------------------------

# 47. NEXT ACTIONS

## NEXT ACTION 1 --- Task 65

Standardize User module.

Steps:

1.  Inspect existing `ApiError`.
2.  Inspect centralized backend error middleware.
3.  Inspect `userController.ts`.
4.  Inspect `userService.ts`.
5.  Inspect `userRepository.ts`.
6.  Add/align User validation.
7.  Replace ordinary duplicate `Error` with `ApiError`.
8.  Standardize duplicate response.
9.  Standardize not-found response.
10. Standardize validation response.
11. Normalize `req.params.id`.
12. Ensure errors flow through centralized middleware.
13. Keep repository focused on DB access.
14. Keep service focused on business logic.
15. Keep controller focused on HTTP.
16. Build.
17. Test.
18. Manually test mounted User endpoints if available.
19. Document User module.

## NEXT ACTION 2 --- Verify User routes

Check actual route mounting before assuming:

``` text
userRoutes.ts
```

exists.

If missing, determine correct route architecture from the real backend
entrypoint/router.

## NEXT ACTION 3 --- Backend testing foundation

After User consistency: - establish backend test framework - repository
tests - service tests - controller/API tests - validation tests - error
tests - database integration tests where appropriate

Exact backend testing framework is currently **UNKNOWN**.

## NEXT ACTION 4 --- API documentation

Create:

``` text
docs/api/endpoints.md
docs/api/error-handling.md
```

## NEXT ACTION 5 --- Frontend API boundary

Create a frontend API service layer.

## NEXT ACTION 6 --- Migrate entity registries

Migrate:

``` text
Projects
Products
Services
```

from localStorage to API-backed persistence.

## NEXT ACTION 7 --- Authentication

After User/API foundation is stable.

## NEXT ACTION 8 --- Authorization

Then:

``` text
Organizations
Roles
Permissions
```

## NEXT ACTION 9 --- Relationships

Then implement:

``` text
Project ↔ Product
Project ↔ Service
Product ↔ Service
```

## NEXT ACTION 10 --- Workflow engine

Then implement core workflow infrastructure.

## NEXT ACTION 11 --- AI

Then introduce AI workflow capabilities / PI AI.

## NEXT ACTION 12 --- Documents / Knowledge

Then PI Docs / knowledge architecture.

## NEXT ACTION 13 --- Integrations

Then external system integrations.

## NEXT ACTION 14 --- Enterprise

Then: - audit - advanced permissions - multi-tenancy - governance -
compliance - observability - backup/recovery - deployment automation

------------------------------------------------------------------------

# 48. LONG-TERM ROADMAP

``` text
Foundation
   ↓
Entity Registry
   ↓
Backend Architecture
   ↓
Database
   ↓
API Layer
   ↓
Authentication
   ↓
Organizations / Permissions
   ↓
Workflow Engine
   ↓
AI Integration
   ↓
Documents / Knowledge
   ↓
Integrations
   ↓
Analytics
   ↓
Enterprise Capabilities
```

Target platform concept:

``` text
PiGenesis
│
├── Identity
├── Organizations
├── Users
├── Projects
├── Products
├── Services
├── Workflows
├── Documents
├── Knowledge
├── AI
├── Integrations
├── Analytics
└── Security / Governance
```

This is the target architecture, not a claim that all modules currently
exist.

------------------------------------------------------------------------

# 49. KRIYA / KriDA CONCEPT

Related AI automation idea:

-   **Kriya (క్రియ)** --- Action / Performance
-   **KriDA** --- Kriya + Daily Activity

This is an AI/task automation concept.

It may eventually fit into the PiGenesis workflow/AI layer.

It is not currently a production implementation.

------------------------------------------------------------------------

# 50. SEPARATE PROJECTS --- DO NOT MIX

## ManaFuture

Separate Flutter/Firebase educational consultancy application.

Historical features: - university listing - admission consultancy -
career guidance - chat counselor - admin dashboard - CRM - leads -
Firestore - Firebase Auth - admin/counsellor roles

Do not treat this as PiGenesis code unless explicitly requested.

## Vana Wellness

Separate wellness/diet application.

Do not mix its personal health/diet requirements with PiGenesis unless
explicitly requested.

------------------------------------------------------------------------

# 51. IMPORTANT NAMING

Use exact names.

``` text
PiGenesis
PI
Project Independence
PI Flow
PI Docs
PI AI
PI Vault
```

Backend entities:

``` text
Project
Product
Service
User
```

Database:

``` text
pigenesis
```

Database columns:

``` text
created_at
updated_at
display_name
```

TypeScript properties:

``` text
createdAt
updatedAt
displayName
```

------------------------------------------------------------------------

# 52. DO-NOT-REPEAT RULES

1.  Do not create `db.ts`; use `src/config/database.ts`.
2.  Do not assume `req.params.id` is always a string.
3.  Normalize Express route params safely.
4.  Do not print DB passwords.
5.  Do not commit `.env`.
6.  Do not stage `apps/package-lock.json`.
7.  Do not duplicate database pool modules.
8.  Do not rewrite stable frontend code unnecessarily.
9.  Do not rename known variables without reason.
10. Do not put SQL directly in controllers.
11. Do not put database logic directly in routes.
12. Do not put persistence logic directly in React pages.
13. Do not prematurely implement enterprise features.
14. Do not prematurely implement entity relationships.
15. Do not claim backend production deployment without verification.
16. Do not change the chosen technology stack without a real reason.
17. Do not treat the old \~25% estimate as an exact current percentage.
18. Do not stop for routine confirmation.
19. Prefer complete replacement page files for page modifications.
20. Keep documentation synchronized with actual code.
21. Preserve historical decisions.
22. Clearly mark current decisions.
23. Do not invent missing files/endpoints/configuration.
24. Verify actual repository state before changing architecture.
25. Build and test after meaningful implementation changes.

------------------------------------------------------------------------

# 53. CURRENT FILE REFERENCE

## Frontend

``` text
apps/platform/src/
├── components/
│   └── ui/
│       ├── InfoTooltip.tsx
│       ├── StatCard.tsx
│       ├── StatusBadge.tsx
│       └── StatusText.tsx
├── config/
│   └── appconfig.ts
├── pages/
│   ├── CreateProductPage.tsx
│   ├── CreateProjectPage.tsx
│   ├── CreateServicePage.tsx
│   ├── EditProductPage.tsx
│   ├── EditProjectPage.tsx
│   ├── EditServicePage.tsx
│   ├── ProductDetailsPage.tsx
│   ├── ProductsPage.tsx
│   ├── ProjectDetailsPage.tsx
│   ├── ProjectsPage.tsx
│   ├── ServiceDetailsPage.tsx
│   ├── ServicesPage.tsx
│   └── SettingsPage.tsx
├── routes/
│   └── AppRouter.tsx
├── services/
│   ├── productService.ts
│   ├── projectService.ts
│   └── serviceService.ts
├── types/
│   ├── appError.ts
│   ├── product.ts
│   ├── project.ts
│   └── service.ts
└── utils/
    ├── errorHandler.ts
    └── logger.ts
```

This is the known important tree, not guaranteed to be exhaustive.

## Backend

``` text
apps/api/
├── database/
│   └── schema.sql
├── src/
│   ├── config/
│   │   ├── appConfig.ts
│   │   ├── auth.ts
│   │   ├── database.ts
│   │   └── databaseConfig.ts
│   ├── controllers/
│   │   ├── apiController.ts
│   │   ├── databaseController.ts
│   │   ├── healthController.ts
│   │   ├── productController.ts
│   │   ├── projectController.ts
│   │   ├── serviceController.ts
│   │   └── userController.ts
│   ├── database/
│   │   └── users.sql
│   ├── middleware/
│   ├── routes/
│   │   ├── apiRoutes.ts
│   │   ├── databaseRoutes.ts
│   │   ├── healthRoutes.ts
│   │   ├── productRoutes.ts
│   │   ├── projectRoutes.ts
│   │   └── serviceRoutes.ts
│   ├── scripts/
│   │   ├── initDatabase.ts
│   │   └── initUsersTable.ts
│   └── services/
│       ├── authProvider.ts
│       ├── productRepository.ts
│       ├── projectRepository.ts
│       ├── serviceRepository.ts
│       ├── userRepository.ts
│       └── userService.ts
├── dist/
├── node_modules/
├── package.json
└── package-lock.json
```

Exact backend entrypoint: **UNKNOWN** from the current preserved
context.

------------------------------------------------------------------------

# 54. COMMAND REFERENCE

## Backend

``` powershell
cd D:\PiGenesis\pigenesis\apps\api
```

Build:

``` powershell
npm run build
```

Initialize users:

``` powershell
npm run db:init:users
```

PostgreSQL:

``` powershell
psql -U postgres -d pigenesis
```

Useful SQL:

``` sql
\dt
\d users
SELECT COUNT(*) FROM users;

SELECT id, name, status, type
FROM projects;

SELECT id, name, status, category
FROM products;

SELECT id, name, status, category
FROM services;
```

## Frontend

``` powershell
cd D:\PiGenesis\pigenesis\apps\platform
```

Test:

``` powershell
npm run test:run
```

Build:

``` powershell
npm run build
```

## Git

``` powershell
cd D:\PiGenesis\pigenesis
```

Status:

``` powershell
git status
```

Branch:

``` powershell
git branch --show-current
```

History:

``` powershell
git log -5 --oneline
```

Commit:

``` powershell
git add <specific files>
git commit -m "..."
git push origin develop
```

Merge:

``` powershell
git checkout main
git merge develop
git push origin main
```

Return:

``` powershell
git checkout develop
```

Do not stage:

``` text
apps/package-lock.json
```

unless explicitly changed as an architectural decision.

------------------------------------------------------------------------

# 55. API PORT / LOCAL ENDPOINTS

Current local API port:

``` text
4000
```

Known:

``` text
http://localhost:4000/api
http://localhost:4000/api/health
http://localhost:4000/api/database/health
http://localhost:4000/api/projects
http://localhost:4000/api/products
http://localhost:4000/api/services
```

Production API URL:

``` text
UNKNOWN
```

------------------------------------------------------------------------

# 56. DEPLOYMENT STATE

## Frontend

Cloudflare Pages:

``` text
https://pigenesis.pages.dev
```

Cloudflare Workers/Pages foundation exists.

## Backend

Local development API works.

Production backend deployment:

``` text
UNKNOWN / NOT CONFIRMED
```

Do not claim otherwise.

------------------------------------------------------------------------

# 57. COMPLETION ESTIMATE HISTORY

A previous rough engineering estimate was:

``` text
~25% complete
```

where 100% meant the full long-term production-grade PiGenesis vision.

That estimate was not a formal project-management measurement.

At the time it was roughly described as:

``` text
Foundation                 ~100%
Entity Registry             ~90%
Frontend Architecture       ~70%
Backend/API                   0%
Identity/Security             0%
Workflow Engine               0%
AI Layer                     0%
Integrations                 0%
Enterprise Platform           0%
```

The backend has since been built to a foundation level.

Therefore the old `~25%` number is historical only.

Current exact percentage:

``` text
UNKNOWN / not formally measured
```

------------------------------------------------------------------------

# 58. HISTORICAL TIMELINE

## Stage 1 --- PiGenesis conception

PiGenesis was created around:

``` text
PI — Project Independence
```

The long-term goal is to build owned technology/assets and eventually
build an independent business.

The user emphasized: - long-term platform building - reusable
capabilities - consistent technology - scalable architecture - eventual
enterprise/government-grade capabilities

## Stage 2 --- Foundation

Completed:

``` text
PiGenesis
Project Independence
GitHub
Cloudflare
Live Website
Brand Logo
Initial Design Language
```

## Stage 3 --- Sprint 1

Established: - Git workflow - development branch - initial platform
shell - navigation - early deployment

## Stage 4 --- Sprint 2

Established: - React Router - dashboard - sidebar - layout - settings -
Projects - Products - Services - reusable UI components

## Stage 5 --- Tasks 31--49

Project module was built:

``` text
Model
Create
Read
Update
Delete
Validation
Search
Filter
Sort
Persistence
Error handling
Logging
Testing
Documentation
```

## Stage 6 --- Tasks 50--56

Product module was built:

``` text
Model
Create
Read
Update
Delete
Validation
Search
Filter
Sort
Error handling
Diagnostics
Documentation
Testing
```

## Stage 7 --- Tasks 57--60

Service module was built:

``` text
Model
Create
Read
Update
Delete
Validation
Search
Filter
Sort
Error handling foundation
Documentation
Testing
```

## Stage 8 --- Task 61

Product creation UI completed.

## Stage 9 --- Task 62

Service creation UI completed.

## Stage 10 --- Registry UX

Projects, Products and Services were standardized.

Final registry design: - consistent filter box - consistent card
layout - IDs visible - descriptions removed from cards - details pages
contain full descriptions - InfoTooltip added

## Stage 11 --- Backend transition

PostgreSQL was introduced.

Express REST API was introduced.

Repository/service/controller architecture was introduced.

## Stage 12 --- Task 64

Backend foundation completed.

PostgreSQL tables:

``` text
projects
products
services
users
```

REST CRUD:

``` text
Projects
Products
Services
```

User foundation:

``` text
users table
user repository
user service
user controller
```

## Stage 13 --- User database debugging

Initial error:

``` text
client password must be a string
```

Environment was inspected safely.

`DB_PASSWORD` confirmed set.

Initialization then succeeded.

Users table verified.

## Stage 14 --- Current

Latest inspection showed that User module uses an older error-handling
style while Project/Product/Service use the newer `ApiError`
architecture.

Therefore:

``` text
Task 65 — Backend Service/Controller Consistency
```

is the next implementation task.

------------------------------------------------------------------------

# 59. ARCHITECTURAL DECISION LOG

## PiGenesis is a platform, not a single app

**CURRENT**

Reason: - reusable technology foundation - multiple products - multiple
capabilities - multi-industry future

## React + Vite + TypeScript + Tailwind

**CURRENT**

Reason: - existing working frontend - rapid development - typed
architecture - reusable styling - no framework hopping

## Express + TypeScript

**CURRENT**

Reason: - lightweight backend foundation - same TypeScript ecosystem -
clear REST implementation

## PostgreSQL

**CURRENT**

Reason: - relational model - future relationships - transactional
consistency - long-term enterprise suitability

## Repository layer

**CURRENT**

Reason: - isolates database access - keeps SQL out of controllers -
makes data boundaries clear

## Service layer

**CURRENT**

Reason: - business logic should not live in controllers - reusable
operations - clean separation

## REST

**CURRENT**

Reason: - clear frontend/backend boundary - easy manual testing -
integration-friendly

## Stable IDs

**CURRENT**

Reason: - immutable identity - future references depend on stable
identifiers

## Independent entity registries

**CURRENT**

Projects/Products/Services are initially independent.

Reason: - build clean entity foundations - avoid premature relationships

## localStorage first

**HISTORICAL / TRANSITIONING**

Reason: - rapid frontend development - easy persistence testing -
service layer made migration possible

Current direction:

``` text
API + PostgreSQL
```

## Reusable UI components

**CURRENT**

Examples:

``` text
StatusBadge
StatusText
StatCard
InfoTooltip
```

Reason: - consistency - reuse - centralized behavior

## Registry cards are summaries

**CURRENT**

Reason: - long descriptions made cards awkward - details pages are the
full-information view

## Enterprise features delayed

**CURRENT**

Deferred: - soft delete - trash - restore - audit - advanced permissions

Reason: - foundation first - implement at correct backend stage

## Documentation alongside implementation

**CURRENT**

Reason: - maintainability - architectural continuity - future ChatGPT
continuity - human developer continuity

------------------------------------------------------------------------

# 60. FUTURE PLATFORM ARCHITECTURE

Target:

``` text
                         PiGenesis Platform
                                │
          ┌─────────────────────┼─────────────────────┐
          │                     │                     │
       Identity             Organizations          Governance
          │                     │                     │
          └─────────────────────┼─────────────────────┘
                                │
        ┌─────────────── Entity Registry ───────────────┐
        │                  │             │              │
     Projects          Products       Services       Users
        │                  │             │              │
        └──────────────────┼─────────────┼──────────────┘
                           │
                      Relationships
                           │
                       Workflows
                           │
                    Knowledge / Docs
                           │
                          AI
                           │
                    Integrations
                           │
                       Analytics
                           │
                  Enterprise / Governance
```

This is a future target, not current implementation.

------------------------------------------------------------------------

# 61. RECOVERY / NEW CHAT INSTRUCTIONS

This section is mandatory for future PiGenesis ChatGPT conversations.

## 61.1 Load this file first

When `PIGENESIS_MASTER_CONTEXT.md` is uploaded:

**Treat it as the authoritative PiGenesis project context.**

Do not restart the project.

Do not recreate the Foundation Phase.

Do not assume the project is empty.

## 61.2 Preserve architecture

Do not propose replacing:

``` text
React + Vite + TypeScript + Tailwind
```

or:

``` text
Express + TypeScript + PostgreSQL
```

unless the user explicitly requests an architectural reassessment.

## 61.3 Preserve backend architecture

Always start from:

``` text
Route
 ↓
Controller
 ↓
Service
 ↓
Repository
 ↓
PostgreSQL
```

## 61.4 Preserve frontend architecture

Use:

``` text
UI
 ↓
Page
 ↓
Frontend Service / API
 ↓
Backend
```

## 61.5 Continue from the current task

Current:

``` text
Task 64 = COMPLETE
Task 65 = NEXT
```

Task 65:

``` text
Backend Service/Controller Consistency
```

First inspect actual current: - `ApiError` - error middleware - User
controller - User service - User repository - route mounting

Then implement the smallest correct consistency changes.

## 61.6 Do not repeat completed work

Do not rebuild: - Foundation - Sprint 1 - Sprint 2 - Project CRUD -
Product CRUD - Service CRUD - frontend testing foundation - frontend
error foundation - PostgreSQL connection - Project/Product/Service REST
CRUD

unless an actual defect requires it.

## 61.7 Verify before modifying

For each backend change:

``` text
Inspect actual files
 ↓
Confirm architecture
 ↓
Modify
 ↓
Build
 ↓
Test
 ↓
Manual verify
 ↓
Document
 ↓
Commit
 ↓
Push
```

## 61.8 Do not guess UNKNOWN items

If this file says:

``` text
UNKNOWN
```

inspect the repository/current files.

Do not invent.

## 61.9 Git continuation

Use:

``` text
develop
```

for development.

Normal path:

``` text
develop
→ test/build
→ commit
→ push
→ merge to main
```

## 61.10 Database continuation

Database:

``` text
pigenesis
```

Connection:

``` text
localhost:5432
```

Configuration:

``` text
apps/api/src/config/databaseConfig.ts
```

Pool:

``` text
apps/api/src/config/database.ts
```

## 61.11 Security continuation

Never request or expose the actual DB password.

Use:

``` text
DB_PASSWORD = SET
```

or:

``` text
DB_PASSWORD = MISSING
```

for diagnostics.

## 61.12 Documentation continuation

After meaningful module completion, update:

``` text
docs/
```

Documentation must describe reality.

## 61.13 User interaction style

Do not repeatedly ask for confirmation.

The user wants implementation to continue.

When a task is completed and the build/tests pass, proceed to the next
task.

Only stop for: - real errors - unexpected behavior - genuine
architecture decisions - missing required information

------------------------------------------------------------------------

# 62. MASTER CONTEXT UPDATE RULE

Whenever future PiGenesis conversations make changes:

1.  Update `CURRENT STATE`.
2.  Update `NEXT ACTIONS`.
3.  Update the task status.
4.  Add the new change to the chronological timeline.
5.  Preserve the old decision in the historical section.
6.  Mark the new decision as CURRENT.
7.  Update file paths if files move.
8.  Update known risks/technical debt.
9.  Update testing state.
10. Update Git state when relevant.
11. Update deployment state when relevant.
12. Never silently remove old project history.
13. Never invent missing information.

If an old decision conflicts with a newer explicit user decision, the
newer explicit decision is current, but the old decision should remain
documented as historical.

------------------------------------------------------------------------

# 63. FINAL AUTHORITATIVE SNAPSHOT

As of **2026-09-18 IST**:

``` text
PiGenesis
Mission: Project Independence

Foundation Phase: COMPLETE
Sprint 1: COMPLETE
Sprint 2: COMPLETE

Frontend Entity Registry:
Projects: COMPLETE
Products: COMPLETE
Services: COMPLETE

Frontend CRUD:
Create: COMPLETE
Read: COMPLETE
Update: COMPLETE
Delete: COMPLETE

Frontend UX:
Registry alignment: COMPLETE
IDs visible: COMPLETE
Details pages: COMPLETE
InfoTooltip: IMPLEMENTED
Card descriptions removed: COMPLETE

Frontend testing:
58/58 baseline tests passed
Build passed

Backend:
Express: ACTIVE
TypeScript: ACTIVE
PostgreSQL: CONNECTED
REST APIs: ACTIVE

Project API CRUD: COMPLETE
Product API CRUD: COMPLETE
Service API CRUD: COMPLETE

User database table: COMPLETE
User repository: COMPLETE
User service: IMPLEMENTED
User controller: IMPLEMENTED
User module standardization: PENDING

Database:
pigenesis: CONNECTED
projects: EXISTS
products: EXISTS
services: EXISTS
users: EXISTS
users rows: 0

Cloudflare:
Pages/Workers foundation: COMPLETE
Frontend live: https://pigenesis.pages.dev

Production backend:
UNKNOWN / NOT CONFIRMED

Current Git development branch:
develop

Latest known develop commit:
17cd547 — Task 64: Build backend foundation and REST APIs

Next:
Task 65 — Backend Service/Controller Consistency
```

------------------------------------------------------------------------

# 64. READY-TO-USE CONTINUATION PROMPT

A future new ChatGPT conversation can be started with:

> **PiGenesis context loaded from `PIGENESIS_MASTER_CONTEXT.md`. Treat
> this file as the authoritative project history and current
> architecture. Do not restart or redesign established architecture.
> Current phase: Engineering. Task 64 is complete. Continue with Task 65
> --- Backend Service/Controller Consistency. Inspect the actual
> existing User controller/service/repository, existing ApiError/error
> middleware, and route mounting first. Implement the smallest correct
> changes that align User with the established Route → Controller →
> Service → Repository → PostgreSQL architecture. Preserve all existing
> behavior that is correct. Build and test after changes. Do not ask for
> routine confirmation. If there is an actual error or unexpected
> behavior, stop and diagnose it.**

------------------------------------------------------------------------

# 65. END OF MASTER CONTEXT

This document is the preserved working context for PiGenesis.

**PiGenesis --- Project Independence**

**Build Platforms, Not Apps.**

**Build Once. Improve Forever.**
