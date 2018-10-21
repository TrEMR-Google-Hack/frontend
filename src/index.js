import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import ApiClient from 'utils/ApiClient';
import AccountStore from 'stores/AccountStore';
import Web3Store from 'stores/Web3Store';
import PatientStore from 'stores/PatientStore';
import Search from 'views/Search';
import In from 'views/In';
import Patient from 'views/Patient';
import Page404 from 'views/404';
import 'index.scss';
import InStore from 'stores/InStore';
//import 'assets/favicon.ico';

const apiClient = new ApiClient('http://localhost:8080');
const web3Store = new Web3Store();
const stores = {
  ethereum: web3Store,
  account: new AccountStore(web3Store.isWeb3Enabled),
  patient: new PatientStore(apiClient),
  instore: new InStore(apiClient)
};

// eslint-disable-next-line no-undef
if (__DEV__) {
  window.client = apiClient;
  window.stores = stores;
}

const App = () => (
  <Provider {...stores}>
    <BrowserRouter>
      <Switch>
        <Redirect from="/index.html" to="/" />
        <Route exact path="/" component={In} />
        <Route path="/search" component={Search} />
        <Route path="/patient" component={Patient} />
        <Route component={Page404} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
