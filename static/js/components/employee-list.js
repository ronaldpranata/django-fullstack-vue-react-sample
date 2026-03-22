import { ApiService } from '../api.js';

class EmployeeList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.employees = [];
    }

    async connectedCallback() {
        this.renderLoading();
        this.employees = await ApiService.getEmployees();
        this.render();
    }

    renderLoading() {
        this.shadowRoot.innerHTML = `
            <style>
                .loader { text-align: center; padding: 2rem; color: #888; }
            </style>
            <div class="loader">Loading directory data...</div>
        `;
    }

    render() {
        const style = `
            <style>
                ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                li {
                    background: #2a2a2a;
                    margin-bottom: 1rem;
                    padding: 1.5rem;
                    border-radius: 8px;
                    transition: transform 0.2s ease, box-shadow 0.2s;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                li:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
                }
                .info h3 {
                    margin: 0 0 0.5rem 0;
                    color: #e0e0e0;
                    font-size: 1.2rem;
                }
                .info p {
                    margin: 0;
                    color: #a0a0a0;
                    font-size: 0.9rem;
                }
                .badge {
                    background: #bb86fc;
                    color: #121212;
                    padding: 0.4rem 0.8rem;
                    border-radius: 20px;
                    font-size: 0.85rem;
                    font-weight: bold;
                }
                .empty {
                    text-align: center;
                    padding: 2rem;
                    color: #888;
                }
            </style>
        `;

        if (this.employees.length === 0) {
            this.shadowRoot.innerHTML = style + `<div class="empty">No employees found. Did you seed the database?</div>`;
            return;
        }

        const items = this.employees.map(emp => `
            <li>
                <div class="info">
                    <h3>${emp.name}</h3>
                    <p>${emp.email}</p>
                </div>
                <div class="badge">${emp.department}</div>
            </li>
        `).join('');

        this.shadowRoot.innerHTML = style + `<ul>${items}</ul>`;
    }
}

// Define the custom element
customElements.define('employee-list', EmployeeList);
