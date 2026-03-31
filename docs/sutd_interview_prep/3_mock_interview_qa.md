# SUTD Mock Interview Q&A

This document contains a curated list of mock interview questions and ideal answers specifically designed for the **Front-End Engineer (Digital Learning Capability Centre)** position at SUTD.

## Python & Django

**Q: In Django ORM, what is the exact difference between `select_related()` and `prefetch_related()`, and when would you use each?**
**A:** Both are used to solve the N+1 query optimization problem. 
- `select_related()` works by creating an SQL `JOIN` and fetching the related fields in a single, larger query. I use it for single-valued relationships, like `ForeignKey` or `OneToOneField`.
- `prefetch_related()` does a separate lookup for each relationship and does the "joining" in Python. I use this for multi-valued relationships like `ManyToManyField` or a reverse `ForeignKey`, because using `select_related` on those would result in a massive Cartesian product SQL query.

**Q: Explain how you would implement robust pagination in a Django REST Framework API for a frontend dataset with millions of rows.**
**A:** With millions of rows, standard `LimitOffsetPagination` or `PageNumberPagination` becomes extremely slow because the database must use `OFFSET`, which scans through all previous rows before slicing. Instead, I would implement **Cursor Pagination**. Cursor pagination uses an indexed column (like `created_at` or `id`) to fetch the next set of rows directly (e.g., `WHERE id > last_seen_id LIMIT 20`), which is O(1) time complexity and incredibly fast.

**Q: What is Django Channels, and why do we need ASGI instead of WSGI?**
**A:** Django originally operates on WSGI, which is strictly built for synchronous, blocking, request-response cycles. However, for real-time features like WebSockets (which maintain long-lived, persistent connections), a synchronous server would quickly exhaust its worker threads. ASGI (Asynchronous Server Gateway Interface) allows Django to handle asynchronous, non-blocking code. Django Channels utilizes ASGI to run WebSocket consumers alongside traditional HTTP views.

---

## Vue 3 / React (Frontend Frameworks)

**Q: Let's say we are fetching an API in a React `useEffect` hook, but the user navigates away before the fetch completes. How do you prevent a memory leak or state update on an unmounted component?**
**A:** I need to use a cleanup function inside the `useEffect`. The standard approach is to use an `AbortController`. I pass the controller's `signal` to the `fetch` request. If the component unmounts, the `useEffect` cleanup function calls `controller.abort()`, which cancels the network request safely.

**Q: What is the difference between `ref` and `reactive` in the Vue 3 Composition API?**
**A:** 
- `ref()` is used predominantly for primitive values (Strings, Numbers, Booleans). Under the hood, Vue wraps the primitive in an object with a `.value` property to track mutations.
- `reactive()` is used exclusively for objects and arrays. It converts the object itself into a Proxy. 
You cannot reassign a `reactive` variable entirely (e.g., `myObject = {}`) without breaking reactivity, whereas you can safely reassign a `ref` via `myRef.value = {}`.

**Q: How do you handle deep component communication (e.g., a grandmother component passing data to a granddaughter component) without Prop Drilling?**
**A:** In Vue 3, I would use the `provide/inject` pattern. The parent calls `provide('key', value)`, and any descendant can call `inject('key')` to access it. In React, the equivalent is creating a `Context` and using the `useContext` hook. Alternatively, if the state needs to be accessed globally across unrelated components, I would use Pinia (Vue) or Redux Toolkit/Zustand (React).

---

## AI & Streaming Data (Crucial for SUTD)

**Q: The job description mentions integrating with AI APIs and handling streaming data. If we ping an LLM API and it takes 15 seconds to generate an answer, how do you provide a good UX on the frontend?**
**A:** I wouldn't wait 15 seconds. Instead of a standard HTTP request waiting for the full payload, I would configure the backend to stream the response using **Server-Sent Events (SSE)**. On the frontend, using the `fetch` API, I would access the `ReadableStream` on the response body (`response.body.getReader()`). As chunks of bytes arrive, I decode them using `TextDecoder` and immediately append them to my state (`text.value += chunk`). This creates the classic "typing effect" instantly, eliminating perceived latency.

**Q: Give an example of a prompt engineering challenge when building a frontend interface for an LLM.**
**A:** LLMs are non-deterministic, meaning they don't always return data exactly how you asked. A major challenge is asking an LLM to return strict JSON to populate a frontend UI element (like a chart). Sometimes, the LLM will wrap the JSON in Markdown block quotes (````json ... ````). The frontend and backend must be robust enough to strip out conversational filler, parse malformed JSON gracefully, and provide fallback UI states if the LLM hallucination breaks the data schema.

---

## Design, Operations, and CI/CD

**Q: Since you'll be dealing with Digital Learning platforms, how do you ensure the frontend is highly accessible (WCAG compliant)?**
**A:** Accessibility starts with semantic HTML—using `<nav>`, `<main>`, `<button>` instead of clickable `<div>` elements, so screen readers can parse the DOM tree correctly. Second, I ensure visual contrast ratios meet at least WCAG AA standards (4.5:1 for normal text). Third, I implement keyboard navigability, ensuring every interactive element has a visible `:focus` state and can be reached via the `Tab` key without getting trapped.

**Q: What is your process for deploying a modern frontend application?**
**A:** I utilize a CI/CD pipeline (like GitHub Actions or GitLab CI). 
1. **Continuous Integration:** Whenever code is pushed to a PR, the pipeline automatically installs dependencies (`npm ci`), runs linters (ESLint), and executes unit tests (Vitest/Jest). 
2. **Continuous Deployment:** On merge to the `main` branch, the pipeline builds the production artifacts (`npm run build`), which generates optimized HTML/JS/CSS assets. 
3. **Hosting:** These static assets are then synced to a CDN or cloud storage bucket (like AWS S3 + CloudFront) or deployed to a platform like Vercel/Netlify for instant edge delivery.
