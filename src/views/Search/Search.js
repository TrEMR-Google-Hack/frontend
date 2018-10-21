// @flow
import * as React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { withRouter, type RouterHistory } from 'react-router-dom';
import Title from 'components/Title';
import Navbar from 'components/Navbar';
import Notification from 'components/Notification';
import Hero from 'components/Hero';
import Level from 'components/Level';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Modal from 'components/Modal';
import Footer from 'components/Footer';
import Web3Store from 'stores/Web3Store';
import ApiClient from 'utils/ApiClient';

type Props = {
  ethereum: Web3Store,
  history: RouterHistory,
  client: ApiClient
};

type State = {
  notification: string,
  featuredItems: Array<Object>,
  search: any
};

class Dashboard extends React.Component<Props, State> {
  state: Object;
  client: ApiClient;
  constructor(props: Props) {
    super(props);
    this.state = {
      notification: 'A notification'
    };
  }

  renderNoEthereumModal() {
    return (
      <Modal
        active
        title="Ethereum makes it better"
        successMsg="Give me Web3!"
        cancelMsg="Later"
        onButtonClick={primaryButton => {
          if (primaryButton) this.props.history.push('/help');
        }}
      >
        <h2>Youre not using ethereum</h2>
      </Modal>
    );
  }

  renderNoTestnetModal() {
    return (
      <Modal active title="Almost there" successMsg="Okay">
        <h2>
          You&#39;re using a Web3 enabled browser, but you&#39;re not on the
          Ethereum mainnet. You can only shop using Ethereum when on mainnet.
        </h2>
      </Modal>
    );
  }

  render() {
    const { found, foundSsn, fetch } = this.props;
    return (
      <React.Fragment>
        <Title title="Central EMR" />
        <Navbar title={{ label: 'Central EMR', path: '/' }} />
        <Hero
          centered
          title={
            <Input
              label={found ? 'Go to patient' : 'Submit'}
              active={found}
              onClick={() => history.push(`/patient?ssn=${foundSsn}`)}
              onChange={e => fetch(e.target.value)}
            />
          }
        />
      </React.Fragment>
    );
  }
}

const Input = props => (
  <div className="columns is-mobile">
    <div className="column is-four-fifths" style={{ paddingRight: '0' }}>
      <input
        className="input is-large"
        type="text"
        placeholder="Type in patient's name..."
        style={{
          borderColor: '#707070',
          borderRadius: '15px 0 0 15px',
          margin: '-70px 0'
        }}
        {...props}
      />
    </div>
    <div className="column has-text-left" style={{ paddingLeft: '0' }}>
      <button
        className="button is-primary is-large"
        disabled={!props.active}
        onClick={props.onClick}
        style={{
          borderRadius: '0 15px 15px 0',
          margin: '-70px 0',
          textAlign: 'right'
        }}
      >
        {props.label}
      </button>
    </div>
  </div>
);

export default inject('search')(withRouter(observer(Dashboard)));
