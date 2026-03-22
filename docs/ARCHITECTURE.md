# Django Modular Architecture Documentation

This diagram outlines the enterprise-grade modular architecture implemented in this project.

## 1. Project Directory Structure
We use a top-level `config/` wrapper for the project settings, distinct from the app modules. 
```
python-django/
├── config/                  # Django project directory (routing, settings, wsgi, asgi)
│   ├── settings/            # Split settings module
│   │   ├── base.py          # Shared settings (DB config, Installed Apps, etc.)
│   │   ├── local.py         # Local development settings (DEBUG=True)
│   │   └── production.py    # Production settings (Security headers, cache, etc.)
├── core/                    # Core foundation app
│   └── models.py            # Contains CustomUser model extending AbstractUser
├── company/                 # Example domain app
│   ├── services.py          # Business logic (Writes/Mutations)
│   ├── selectors.py         # Complex queries (Reads)
│   ├── models.py            # Data structure definitions ONLY
│   ├── tests.py             # Pytest unit tests for the domain
│   └── views.py             # Thin views orchestrating services and selectors
└── docs/                    # Architecture documentation
```

### Pluggable Apps (Separation of Concerns)
This project strictly enforces **Separation of Concerns** via Django's "Pluggable Apps" pattern:

- **`core/` (System & Foundations)**: Strictly reserved for underlying system mechanics required globally across the ecosystem (e.g., Authentication, `CustomUser` models, Django Channels WebSockets, Global Chat architectures). It holds zero specialized product business logic.
- **`company/` (Domain Business Logic)**: Strictly reserved for specialized product/domain logic (e.g., Employee HR structures, Department frameworks, Staff endpoints).

**Why?** If the codebase scales to require separate `billing/` or `support/` modules, those folders are scaffolded in total isolation. The `core` folder remains untouched but dynamically supplies Base System configurations (like Authentication or WebSocket wrappers) to the new scaling modules natively. This enforces extreme code-hygiene and prevents monolithic tangling.

## 2. Design Patterns

### The Service Layer Pattern
Instead of "Fat Models" or "Fat Views", this architecture enforces a strictly decoupled **Service Layer**:

- **Views** handle HTTP requests, routing, authorization, and returning responses. They do *not* contain database update logic.
- **Models** are strictly "dumb" definitions of database tables (structure, relationships, constraints).
- **Services (`services.py`)** execute all business logic that creates or modifies data (writes). E.g., `create_employee()`.
- **Selectors (`selectors.py`)** handle complex read operations, filtering, and optimizations. E.g., `get_active_employees()`.

**Benefits**:
- **Testability**: You can easily unit test a service function without setting up a RequestFactory or mocking HTTP responses.
- **Reusability**: `create_employee()` can be called from a REST API view, a GraphQL resolver, or a management command like a Celery task.
- **Maintainability**: If the business requirements for creating an employee change, you only update the service layer.

### Environment Management
Using `django-environ`, secrets are injected purely via environment variables (`.env`). Default fallbacks exist where safe, but production requires distinct injections (e.g. `DATABASE_URL`, `SECRET_KEY`).

### Testing
Configured using `pytest` and `pytest-django`. Pytest allows for cleaner syntax, rich fixtures, and simplified execution. Tests strictly target the service layer logic.
