import { decorate, observable, action } from 'mobx';
import ApiClient from 'utils/ApiClient';

const API_URL = '/api/patients';
class InStore {
  patients: Array<Object>;
  isLoaded: boolean;
  async fetch() {
    const res = await this.client.get(API_URL);
    console.log(this.client);
    if (res && res.length > 0) {
      this.patients = res;
    }
  }
  constructor(client: ApiClient) {
    this.client = client;
    this.patients = [];
    this.isLoaded = false;
  }
}

decorate(InStore, {
  patients: observable.struct,
  isLoaded: observable,
  fetch: action
});

export default InStore;
