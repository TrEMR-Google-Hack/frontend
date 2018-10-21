// @flow
import { decorate, observable } from 'mobx';

class AccountStore {
  isAuthed: boolean;

  constructor(_isAuthed: boolean) {
    this.isAuthed = _isAuthed;
  }
}

decorate(AccountStore, {
  isAuthed: observable
});

export default AccountStore;
