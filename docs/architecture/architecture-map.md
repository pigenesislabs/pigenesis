# PiGenesis Architecture Map

## 1. Purpose

This document describes the current architecture of PiGenesis and its planned architectural evolution.

PiGenesis is being developed as a reusable AI-powered workflow platform for building intelligent, workflow-driven business applications.

The architecture is intentionally evolving in stages.

---

# 2. Current Architecture

The current PiGenesis platform is primarily a frontend application with a service layer and local persistence.

```text
                    PIGENESIS PLATFORM
                           │
                           ▼
                    React Frontend
                           │
             ┌─────────────┼─────────────┐
             ▼             ▼             ▼
          Pages        Components      Layout
             │
             ▼
          Services
             │
             ▼
        localStorage