# Vue.js Component-Based Architecture

## Principle: Separation of Concerns
This Vue.js frontend operates as an entirely decoupled SPA and explicitly implements a rigorous **Component-Based Architecture** orchestrated under Vue 3's modern `<script setup>` API and styled wholly via **Tailwind CSS**.

## Directory Layout Layers
- `src/components/common/`: **Atomic UI**. Domain-agnostic logic components (`Button.vue`, `Badge.vue`) utilizing dynamic `$event` binds and generic CSS.
- `src/components/features/`: **Domain SFCs**. Components unique to corporate workflow logic (`auth/LoginForm.vue`, `employees/EmployeeList.vue`, `notifications/Chat.vue`). Highly isolated scope rendering explicitly mapped via `defineProps` and returning payload states via `defineEmits`.
- `src/layouts/`: **Structural Containers**. Templates defining generic view bounds (`MainLayout.vue` hosting Top Navigation).
- `src/pages/`: **View Orchestrators**. Core controller components (`DashboardPage.vue`, `LoginPage.vue`) stitching Features and Layouts dynamically reacting directly to the API State Hooks avoiding deeper recursive prop-drilling operations.
- `src/services/`: **Network Transport**. Abstracted `api.js` bindings automating `fetch` mapping identically with backend endpoints.

## State Management
Vue `ref()` handles state cleanly on a per-page basis inside `src/pages/`. Complex overlays like `<EmployeeForm />` execute autonomously, rendering only via isolated dynamic thresholds (`v-if`). Tailwind eliminates convoluted DOM CSS trees ensuring `<style>` tags remain practically nonexistent across component domains.
