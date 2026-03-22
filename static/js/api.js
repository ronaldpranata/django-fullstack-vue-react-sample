/**
 * Frontend Service Layer for API communication.
 * This mirrors the backend services setup by abstracting API calls tightly.
 */

export class ApiService {
    /**
     * Fetch active employees from the Django JSON API.
     * @returns {Promise<Array>} Array of employee objects
     */
    static async getEmployees() {
        try {
            const response = await fetch('/api/company/employees/');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const json = await response.json();
            return json.data;
        } catch (error) {
            console.error('API Error:', error);
            return [];
        }
    }
}
