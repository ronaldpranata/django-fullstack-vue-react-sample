const API_URL = 'http://127.0.0.1:8000/api/company/employees/';
const TOKEN_URL = 'http://127.0.0.1:8000/api/token/';

export const ApiService = {
  setToken(token) {
    localStorage.setItem('access_token', token);
  },
  
  getToken() {
    return localStorage.getItem('access_token');
  },
  
  clearToken() {
    localStorage.removeItem('access_token');
  },

  isAuthenticated() {
    return !!this.getToken();
  },

  async login(username, password) {
    const res = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || 'Invalid credentials');
    
    this.setToken(data.access);
    return true;
  },

  getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    };
  },

  handleUnauthorized(res) {
    if (res.status === 401) {
      this.clearToken();
      window.location.reload();
      throw new Error("Session expired. Please log in again.");
    }
  },

  async getEmployees() {
    const res = await fetch(API_URL, { headers: this.getHeaders() });
    this.handleUnauthorized(res);
    if (!res.ok) throw new Error('Failed to fetch');
    const json = await res.json();
    return json.data;
  },
  
  async createEmployee(data) {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data)
    });
    this.handleUnauthorized(res);
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to create');
    return json;
  },

  async updateEmployee(id, data) {
    const res = await fetch(`${API_URL}${id}/`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data)
    });
    this.handleUnauthorized(res);
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to update');
    return json;
  },

  async deleteEmployee(id) {
    const res = await fetch(`${API_URL}${id}/`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });
    this.handleUnauthorized(res);
    if (!res.ok) throw new Error('Failed to delete');
    return true;
  }
};
