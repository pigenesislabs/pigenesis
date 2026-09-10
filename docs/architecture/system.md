# PiGenesis System Architecture

## 1. Overview

PiGenesis is being developed as a reusable AI-powered workflow platform for building intelligent, workflow-driven business applications.

The platform is designed around reusable capabilities that can be shared across different products and business domains.

The long-term platform architecture includes:

- Identity
- Workflow
- Knowledge
- AI
- Integrations
- Analytics
- Product Layer

---

## 2. Current Platform

The current PiGenesis platform is the foundation for the larger system.

The application currently provides a platform interface for managing:

- Projects
- Products
- Services
- Settings

The Projects module currently supports:

- Project creation
- Project viewing
- Project editing
- Project deletion
- Project search
- Project filtering
- Project sorting

---

## 3. Current Architecture

The current application follows a layered approach:

```text
User Interface
      ↓
Pages
      ↓
Services
      ↓
Local Storage