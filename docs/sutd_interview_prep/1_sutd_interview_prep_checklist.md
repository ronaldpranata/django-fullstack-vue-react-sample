# SUTD Front-End Engineer Interview Preparation Guide

Based on the [JobStreet posting](https://sg.jobstreet.com/job/91009310?ref=cm-ui) for the Digital Learning Capability Centre (DLCC) at SUTD, this guide covers the core concepts you need to prepare for your interview. 

## Role Overview
- **Focus:** Designing and developing modern, responsive, and intelligent (AI-integrated) front-ends.
- **Key Responsibilities:** UI/UX refinement, integrating backend AI/LLM systems, managing CI/CD pipelines, and creating intuitive user interfaces.
- **Core Stack:** Modern JS Frameworks (React, Vue, Svelte) or HTMX, Python & Django ORM for backend integration, RESTful APIs, and WebSockets.

---

## 1. Python & Django Concepts
Even as a Front-End Engineer, you must understand how data is queried and exposed by the backend, as the job explicitly mentions **Python** and **Django ORM**.

### 1.1 Django ORM (Object-Relational Mapping)
- **Key Concepts:**
  - **QuerySets:** Lazy evaluation, filtering (`filter()`, `exclude()`), and slicing.
  - **Model Relationships:** `ForeignKey` (1-to-N), `OneToOneField` (1-to-1), `ManyToManyField` (N-to-N).
  - **Optimization:** The "N+1 Query Problem". Understand when to use `select_related` (SQL JOIN for single-valued relationships) vs `prefetch_related` (separate queries handled in Python for multi-valued relationships).

### 1.2 RESTful APIs (Django REST Framework - DRF)
- **Key Concepts:**
  - **Serializers:** How Django model instances are converted to JSON format to be consumed by your React/Vue apps.
  - **Pagination:** Handling large datasets efficiently using limit/offset or cursor pagination.
  - **Authentication:** Token-based, JWT, or Session authentication.

### 1.3 WebSockets & Real-time Data (Django Channels)
- **Key Concepts:**
  - **HTTP vs WebSockets:** Understand that HTTP is stateless and request-response based, while WebSockets maintain persistent, full-duplex connections.
  - Integrating real-time features (e.g., live notifications, collaborative features).

---

## 2. Vue.js Concepts
If the team utilizes Vue, they are likely using Vue 3. 

### 2.1 Reactivity & Composition API
- **Key Concepts:**
  - **Composition API:** The standard in Vue 3. Understand `setup()`.
  - **Reactivity:** The difference between `ref` (for primitives like strings/numbers) and `reactive` (for objects/arrays).
  - **Computed Properties & Watchers:** Caching derived state (`computed`) vs running side effects on state changes (`watch`/`watchEffect`).

### 2.2 Component Architecture & State
- **Key Concepts:**
  - **Props & Emits:** Passing data down and emitting events up (one-way data flow). Use of `v-model` for 2-way binding.
  - **Slots:** Default, Named, and especially **Scoped Slots** for creating highly reusable UI components.
  - **State Management:** Using **Pinia** (the modern standard) instead of Vuex.

---

## 3. React Concepts
React is another heavily requested modern framework. Focus on functional components and Hooks.

### 3.1 Essential Hooks & Patterns
- **Key Concepts:**
  - **State & Effects:** `useState` for local state, and `useEffect` for syncing with external systems (API calls, subscriptions). Deeply understand the **dependency array** in `useEffect`.
  - **Custom Hooks:** Abstracting component logic into reusable functions (e.g., `useFetch`, `useWebSocket`).
  - **Context API vs Global State:** When to use native Context vs external libraries (Zustand, Redux Toolkit).

### 3.2 Performance Optimization
- **Key Concepts:**
  - **Memoization:** Preventing unnecessary re-renders using `useMemo` (for expensive calculations), `useCallback` (for referential equality of functions), and `React.memo` (for components).
  - **Virtual DOM:** High-level understanding of React's Diffing algorithm (Reconciliation) and the importance of the `key` prop in lists.

---

## 4. Specialized Requirements (Crucial for SUTD DLCC)

### 4.1 AI & LLM API Integration
The DLCC focuses on digital learning, and the JD explicitly mentions integrating AI/LLMs.
- **Streaming Data:** Understanding **Server-Sent Events (SSE)** and streaming APIs. When you query an LLM (like GPT-4), waiting for the entire response feels slow. You need to stream the chunks into your Vue/React state to create a "typing effect".
- **Prompt Input/Output:** Designing flexible UIs for varied LLM outputs (markdown rendering, code blocks, handling malformed JSON from an LLM).
- **Handling Latency & Errors:** Providing excellent UX (skeletons, loading indicators, graceful degradation) when third-party AI APIs are slow or fail.

### 4.2 Web Fundamentals & UX Quality
- **Accessibility (WCAG):** Designing for all learners. Semantic HTML (`<nav>`, `<header>`, `<main>`, `<article>`), ARIA labels, keyboard navigability, and color contrast.
- **Responsive Design:** Deep proficiency in CSS3 Grid, Flexbox, CSS Variables, and media queries.
- **HTMX:** As an alternative to SPAs, understand the philosophy of HTMX. Sending HTML over the wire rather than JSON, utilizing attributes like `hx-get`, `hx-target`, and `hx-swap` to create dynamic behavior without writing heavy JavaScript.
