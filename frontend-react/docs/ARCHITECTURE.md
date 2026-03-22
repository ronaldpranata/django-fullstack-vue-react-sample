# React Component-Based Architecture

## Principle: Separation of Concerns
This React frontend is strictly decoupled and utilizes a scaled **Component-Based Architecture** unified entirely by **Tailwind CSS** for aesthetic rendering.

## Directory Layout Layers
- `src/components/common/`: **Atomic UI**. Domain-agnostic components (`Button`, `Badge`) that manage generic presentation logic via Tailwind classes.
- `src/components/features/`: **Domain Components**. Components specific to business logic (`auth/LoginForm`, `employees/EmployeeList`, `notifications/Chat`). These interact closely with states and props injected by container pages.
- `src/layouts/`: **Structural Containers**. Examples like `MainLayout` dictate the macro DOM hierarchy (e.g. Navigation headers bounding the `children` prop).
- `src/pages/`: **View Orchestrators**. High-level structural views (`DashboardPage`, `LoginPage`) that compile Layouts and Features together, managing active states fetching from the `ApiService`.
- `src/services/`: **Network Transport**. Abstracted `api.js` bindings automating `fetch` routines, handling `localStorage` JWT extraction, and injecting standardized headers for backend requests.

## Styling Standardization
Styles strictly leverage **Tailwind CSS** generic utility string parameters, entirely avoiding massive custom `App.css` file bloat. Global brand specifications (like the `primary` color theme) have been integrated inside `tailwind.config.js`.

## State Management Topography
The topography prevents "prop drilling" by isolating contexts.
Example: The Create/Edit data structure runs explicitly inside `DashboardPage`, allowing `EmployeeForm` to sit detached as a conditional portal while cleanly dispatching payload callbacks.
