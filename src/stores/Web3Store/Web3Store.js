// @flow
import { decorate, observable, computed } from 'mobx';

class Web3Store {
  isWeb3Enabled: boolean;
  isUnlocked: boolean;
  network: 'mainnet' | 'ropsten' | 'kovan' | 'rinkeby' | 'unknown';

  get isMainnet(): boolean {
    return this.network === 'mainnet';
  }

  get isTestnet(): boolean {
    return this.network === 'ropsten';
  }

  constructor() {
    if (typeof window.web3 !== 'undefined') {
      // $FlowFixMe ffs
      window.web3 = new Web3(window.web3.currentProvider); // eslint-disable-line no-undef
      this.isWeb3Enabled = true;
      this.isUnlocked = window.web3.eth.accounts.length <= 0;
      switch (window.web3.version.network) {
      case '1':
        this.network = 'mainnet';
        break;
      case '3':
        this.network = 'ropsten';
        break;
      case '42':
        this.network = 'kovan';
        break;
      case '4':
        this.network = 'rinkeby';
        break;
      default:
        this.network = 'unknown';
        break;
      }
    } else {
      this.isWeb3Enabled = false;
      this.isUnlocked = false;
      window.addEventListener('message', ({ data }) => {
        if (data && data.type && data.type === 'ETHEREUM_PROVIDER_SUCCESS') {
          // $FlowFixMe web3 will be defined and if not, we can handle it
          window.web3 = new Web3(window.ethereum); // eslint-disable-line no-undef
        }
      });
      window.postMessage({ type: 'ETHEREUM_PROVIDER_REQUEST' }, '*');
    }
  }
}

decorate(Web3Store, {
  isWeb3Enabled: observable,
  isUnlocked: observable,
  network: observable,
  isTestnet: computed
});

export default Web3Store;
