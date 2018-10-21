import { decorate, observable, action } from 'mobx';
import ApiClient from 'utils/ApiClient';
class SearchStore {
  found: boolean;
  foundSsn: string;
  async fetch(match: string) {
    const res = await this.client.get(
      '/search?query=' + encodeURIComponent(match)
    );
    if (res && res.name) {
      this.foundSsn = res.ssn;
      this.found = true;
    } else {
      this.found = false;
    }
  }
  constructor(client: ApiClient) {
    this.client = client;
    this.found = false;
  }
}

decorate(SearchStore, {
  foundSsn: observable,
  found: observable,
  fetch: action
});

export default SearchStore;
