// @flow
import 'whatwg-fetch';

class ApiClient {
  async get(url: string): ?Promise<Object> {
    try {
      const res = await fetch(url);
      return await res.json();
    } catch (e) {
      return undefined;
    }
  }

  async post(url: string, data: Object, headers?: Object): ?Promise<Object> {
    try {
      const res = await fetch(url, {
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
      const res = await fetch(url, {
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
      const res = await fetch(url, {
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
  constructor() {}
}

export default ApiClient;
