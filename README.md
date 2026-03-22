# Corporate Directory - Dual-Stack Prototype

This project is a highly modular, enterprise-grade prototype featuring a **Django Backend (REST + WebSockets)** executing concurrently alongside two distinct decoupled Frontends (**Vue.js** and **React.js**). Both frontends demonstrate identical Component-Based Architecture strictly unified by **Tailwind CSS**.

## Architecture Topography
- **Backend (`/`)**: Django core logic layer, Django Channels (WebSockets), and structural ORM constraints. Secures connections via JWT. Runs on `http://127.0.0.1:8000`.
- **Frontend A (`/frontend/`)**: Vue 3 + Vite Interface. Runs on `http://localhost:5173`.
- **Frontend B (`/frontend-react/`)**: React 18 + Vite Interface. Runs on `http://localhost:5174`.

## System Prerequisites
- **Python 3.10+** (For ASGI operations)
- **Node.js 18+** & **npm** (For Vite compilation)

---

## 1. Booting the Backend (Django ASGI)

The backend acts as the sole source of truth and must run continuously to process JWT Negotiations, CRUD interactions, and WebSocket pipes.

Open a new terminal instance and navigate to the project root:
```bash
cd ~/Projects/python-django

# 1. Activate the Python Virtual Environment
source venv/bin/activate

# 2. Assert Dependencies are resolved (if pulling from remote)
pip install -r requirements.txt

# 3. Synchronize structural database mapping
python manage.py migrate

# 4. Generate identical mocked testing profiles
python manage.py seed_db

# 5. Boot the Daphne ASGI Server
python manage.py runserver
```
> *Success:* The API engine will allocate itself to `http://127.0.0.1:8000/`. Let this terminal run continuously.

---

## 2. Booting Frontend A (Vue.js Client)

Open a **second terminal instance** and navigate to the Vue infrastructure:
```bash
cd ~/Projects/python-django/frontend

# 1. Resolve Node Modules (if initial boot)
npm install

# 2. Boot the Vite Compilation Engine
npm run dev
```
> *Success:* The VUE portal will allocate itself to `http://localhost:5173/`. 

---

## 3. Booting Frontend B (React Client)

Open a **third terminal instance** and navigate to the React infrastructure:
```bash
cd ~/Projects/python-django/frontend-react

# 1. Resolve Node Modules (if initial boot)
npm install

# 2. Boot the Vite Compilation Engine
npm run dev
```
> *Success:* The REACT portal will allocate itself to `http://localhost:5174/`. 

---

## Testing Real-Time Architecture Capabilities
To witness the power of a fully decoupled dual-stack schema:
1. Open both `http://localhost:5173/` (Vue) and `http://localhost:5174/` (React) synchronously in two split browser windows. 
2. Log into both architectures utilizing the prototype Django credentials (`admin` / `admin`).
3. **Validating CRUD states**: Create a new mock Employee in the React interface. Reload the Vue interface, and watch as it maps directly downstream identical data fetched from the Django Services layer.
4. **Validating WebSockets**: Target the "Live Intercom" window. Broadcast a string from React, and observe the string dynamically inject itself synchronously into the Vue component via the open Daphne Channel connection, completely devoid of page reloads or local persistence conflicts!
