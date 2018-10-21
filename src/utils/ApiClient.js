// @flow
import 'whatwg-fetch';

class ApiClient {
  API_URL: string;

  async get(url: string): ?Promise<Object> {
    try {
      const res = await fetch(API_URL + url);
      return await res.json();
    } catch (e) {
      return undefined;
    }
  }

  async post(url: string, data: Object, headers?: Object): ?Promise<Object> {
    try {
      const res = await fetch(API_URL + url, {
        method: 'POST',
        headers: Object.assign(headers || {}, {
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(data)
      });
      return await res.json();
    } catch (e) {
      return undefined;
    }
  }

  async put(url: string, data: Object, headers?: Object): ?Promise<Object> {
    try {
      const res = await fetch(API_URL + url, {
        method: 'PUT',
        headers: Object.assign(headers || {}, {
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(data)
      });
      return await res.json();
    } catch (e) {
      return undefined;
    }
  }

  async delete(url: string, data?: Object, headers?: Object): ?Promise<Object> {
    try {
      const res = await fetch(API_URL + url, {
        method: 'DELETE',
        headers: Object.assign(headers || {}, {
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(data) || JSON.stringify({})
      });
      return await res.json();
    } catch (e) {
      return undefined;
    }
  }

  constructor(BASE_URL: string) {
    this.API_URL = BASE_URL;
  }
}

export default ApiClient;
