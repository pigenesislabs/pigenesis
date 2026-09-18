# Service Module — Service Layer

## Purpose

The Service Service is the data-access boundary for the PiGenesis Service
registry.

The UI does not directly manage service persistence. Pages communicate with
the Service Service, and the Service Service manages storage, validation,
events, logging, and service data operations.

Current architecture:

React Page
    ↓
Service Service
    ↓
localStorage

Future architecture:

React Page
    ↓
Frontend Service Layer
    ↓
API
    ↓
Backend Service Layer
    ↓
Database