// API.ts

class API {
    private baseURL: string;

    constructor() {
        this.baseURL = 'https://randomuser.me/api/';
    }

    private async request(url: string, options: RequestInit): Promise<Response> {
        const response = await fetch(url, options);
        return response;
    }

    async get(endpoint: string): Promise<any> {
        const url = this.baseURL + endpoint;
        const options: RequestInit = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await this.request(url, options);
        const data = await response.json();
        return data;
    }

    async post(endpoint: string, body: any): Promise<any> {
        const url = this.baseURL + endpoint;
        const options: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        };

        const response = await this.request(url, options);
        const data = await response.json();
        return data;
    }
}

// Create an instance of the API class
const api = new API();

export default api;
