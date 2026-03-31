# SUTD Comprehensive Study Guide: Deep Dive

This document contains detailed, practical explanations and code examples for the core technologies mentioned in the SUTD Front-End Engineer job description. Use this to study the actual implementation details.

---

## 1. Python & Django: Deep Dive

### 1.1 Django ORM Optimization (N+1 Problem)
The most common backend interview question is how to optimize database queries. The N+1 problem occurs when you query a list of objects, and then for *each* object, you make *another* query to fetch its related data.

**The Bad Way (N+1 Problem):**
```python
# Assume a Book has a ForeignKey to Author
books = Book.objects.all() # 1 Query
for book in books:
    print(book.author.name) # N Queries (one for each book!)
```

**The Good Way (`select_related`):**
Use `select_related` for single-valued relationships (ForeignKey, OneToOne). It does a SQL `JOIN` immediately.
```python
# 1 Query with a JOIN
books = Book.objects.select_related('author').all()
for book in books:
    print(book.author.name) # No extra query!
```

**The Good Way (`prefetch_related`):**
Use `prefetch_related` for multi-valued relationships (ManyToMany, Reverse ForeignKey). It does separate queries and joins them in Python.
```python
# Assume Author has many Books
# 2 Queries total: one for authors, one for all their books
authors = Author.objects.prefetch_related('books').all()
for author in authors:
    for book in author.books.all(): # No extra queries!
        print(book.title)
```

### 1.2 Django REST Framework (DRF)
Frontends communicate with Django via APIs. DRF is the standard. You must understand **Serializers**.
Serializers convert complex QuerySets into Python dictionaries, which are then rendered into JSON.

```python
from rest_framework import serializers
from .models import Employee

class EmployeeSerializer(serializers.ModelSerializer):
    # You can add custom fields that aren't in the database model
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = Employee
        fields = ['id', 'email', 'full_name', 'department']
        
    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"
```

---

## 2. Vue 3 vs React: A Direct Comparison

The JD mentions both Vue and React. Understanding how they compare conceptually will make you look like an expert framework-agnostic engineer.

### 2.1 State & Reactivity

**Vue 3 (Composition API):**
Vue uses an observable reactivity system. You wrap values in `ref` or `reactive`. When the value changes, Vue automatically knows what to re-render.
```vue
<script setup>
import { ref, computed } from 'vue'

const count = ref(0) // ref for primitives
const double = computed(() => count.value * 2)

const increment = () => { count.value++ } // Vue tracks this automatically
</script>
```

**React (Hooks):**
React uses a pull-based conceptual model. You call `useState` to get a value and a setter. You *must* use the setter to trigger a re-render.
```jsx
import { useState, useMemo } from 'react'

function Counter() {
  const [count, setCount] = useState(0)
  const double = useMemo(() => count * 2, [count])

  const increment = () => { setCount(count + 1) } // Triggers re-render
  // ...
}
```

### 2.2 Lifecycle and Side Effects

**Vue 3:**
Lifecycle hooks are explicit. You use `onMounted` or `watch`.
```vue
<script setup>
import { ref, onMounted, watch } from 'vue'

const userId = ref(1)

// Code that runs once when component appears
onMounted(() => { console.log('Mounted!') })

// Code that runs whenever userId changes
watch(userId, (newId) => {
    fetchUser(newId)
})
</script>
```

**React:**
React handles lifecycles primarily through `useEffect`.
```jsx
import { useState, useEffect } from 'react'

function UserProfile({ userId }) {
  
  // Empty dependency array = onMounted
  useEffect(() => { console.log('Mounted!') }, [])
  
  // Dependency array with variables = watch(userId)
  useEffect(() => {
    fetchUser(userId)
  }, [userId]) // Critical: Dependency Array
}
```
*Interview Tip for React:* Always know that omitting the dependency array causes the effect to run on *every* single render (usually a bad idea).

---

## 3. WebSockets & Real-Time Streaming Data

This is critical for the AI and Digital Learning aspects of the JD.

### 3.1 WebSockets (Two-Way Communication)
WebSockets keep a persistent connection open. They are ideal for chat apps or live collaborative editors.

**Backend (Django Channels approach):**
Instead of `urls.py`, you use `routing.py`. Instead of Views, you use **Consumers**. Consumers have `connect()`, `disconnect()`, and `receive()` methods. (You can see a great example of this in your `core/consumers.py` file!).

**Frontend (Vue/React) connecting to WebSockets:**
```javascript
const socket = new WebSocket('ws://localhost:8000/ws/chat/')

// Listen for messages from the server
socket.onmessage = (event) => {
    const data = JSON.parse(event.data)
    messages.value.push(data) // Vue
    // setMessages(prev => [...prev, data]) // React
}

// Send message to server
socket.send(JSON.stringify({ message: "Hello AI" }))
```

### 3.2 Server-Sent Events (SSE) (One-Way Streaming)
When an LLM (like OpenAI) generates text, it doesn't return it all at once; it "streams" it token-by-token. WebSockets *can* be used for this, but **SSE** is the standard HTTP way to stream data efficiently from Server -> Client.

**How SSE looks in the Frontend (JavaScript API: `EventSource` or `fetch` with `ReadableStream`):**

To read a stream of chunks from an AI API:
```javascript
async function fetchAIStream() {
  const response = await fetch('/api/ai/chat_stream/', { method: 'POST' });
  
  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    
    // Decode the chunk (e.g., "The capital", " of", " France", " is...")
    const chunk = decoder.decode(value, { stream: true });
    
    // Append the chunk to your React/Vue state immediately!
    aiResponseText.value += chunk; 
  }
}
```
*Interview Tip:* If asked "How do you build a responsive UI when waiting for an AI API that takes 10 seconds to generate a response?", explain that you would NOT wait 10 seconds. You would use **Streaming** (SSE or WebSockets) and a `ReadableStream` to display the text to the user as the AI generates it, chunk by chunk.

---

## 4. Web Layouts (CSS Grid & Responsive Design)

Never use CSS frameworks as a crutch in an interview unless specified. They state "HTML5 and CSS3" directly. 

### 4.1 CSS Grid vs Flexbox
- Use **Flexbox** for 1-dimensional layouts (a row of buttons, a navigation bar).
- Use **Grid** for 2-dimensional layouts (a complete dashboard layout, a grid of cards).

A common interview question is to center a div:
```css
/* Flexbox Way */
.container {
  display: flex;
  justify-content: center; /* horizontal */
  align-items: center; /* vertical */
}

/* Grid Way (Shorter) */
.container {
  display: grid;
  place-items: center; 
}
```

### 4.2 Accessibility (WCAG)
If you're interviewing for a university/educational role, accessibility is non-negotiable.
- Ensure all images have `alt` text.
- Form inputs must have an associated `<label>`.
- Never use `<div>` when a semantic tag (`<nav>`, `<header>`, `<footer>`, `<button>`) exists.
- Contrast ratios for text should be at least 4.5:1 to pass standard accessibility checkers.
