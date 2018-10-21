// @flow
import * as React from 'react';
import { withRouter, type RouterHistory } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

import AccountStore from 'stores/AccountStore';

type Props = {
  title: string,
  account: AccountStore,
  history: RouterHistory,
  routes: Array<{
    label: string,
    path: string,
    button: boolean
  }>
};

const defaultRoutes = [
  { label: 'In-patients', path: '/', button: false },
  { label: 'Patients Search', path: '/search', button: false },
  { label: 'HU Doctors', path: '/', button: true }
];

class Navbar extends React.Component<any> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    let $navbarBurgers = Array.prototype.slice.call(
      document.querySelectorAll('.navbar-burger'),
      0
    );

    if ($navbarBurgers.length > 0) {
      $navbarBurgers.forEach(function($el) {
        $el.addEventListener('click', function() {
          let target = $el.dataset.target;
          let $target = document.getElementById(target);
          $el.classList.toggle('is-active');
          // $FlowFixMe this'll be defined. Don't worry flow
          $target.classList.toggle('is-active');
        });
      });
    }
  }

  renderAuthedCorner() {
    const { history } = this.props;
    return (
      <a
        className="navbar-item"
        onClick={() => {
          history.push('/account');
        }}
      >
        <span className="icon" />
        My Account
      </a>
    );
  }

  renderUnauthedCorner() {
    //const { history } = this.props;
    /*(
      <div className="navbar-item">
        <div className="field is-grouped">
          <p className="control">
            <a
              className="button"
              onClick={() => {
                history.push('/signin');
              }}
            >
              <span>Sign in</span>
            </a>
          </p>
          <p className="control">
            <a
              className="button is-primary"
              onClick={() => {
                history.push('/signup');
              }}
            >
              <span>Sign Up</span>
            </a>
          </p>
        </div>
      </div>
    )*/
    return null;
  }

  render() {
    const { history, routes, title } = this.props;
    const navRoutes = routes || defaultRoutes;
    return (
      <Nav className="navbar">
        <div className="navbar-brand">
          <Logo
            className="navbar-item"
            onClick={() => {
              history.push(title.path);
            }}
          >
            {title.label}
          </Logo>
          <div className="navbar-burger burger" data-target="navmenu">
            <span />
            <span />
            <span />
          </div>
        </div>

        <div id="navmenu" className="navbar-menu">
          <div className="navbar-end">
            {navRoutes &&
              navRoutes.length > 0 &&
              navRoutes.filter(r => !r.button).map((route, i) => (
                <a
                  key={i}
                  className="navbar-item"
                  onClick={() => {
                    history.push(route.path);
                  }}
                >
                  {route.label}
                </a>
              ))}
            <div className="navbar-item">
              {navRoutes &&
                navRoutes.length > 0 &&
                navRoutes.filter(r => r.button).map((button, i) => (
                  <p key={i} className="control">
                    <a
                      className="button is-primary"
                      onClick={() => {
                        history.push(button.path);
                      }}
                    >
                      <span>{button.label}</span>
                    </a>
                  </p>
                ))}
            </div>
          </div>
        </div>
      </Nav>
    );
  }
}

const Logo = styled.a`
  font-weight: bold;
  font-size: 25px;
  color: #228ecd !important;
`;

const Nav = styled.nav`
  box-shadow: 0px 2px rgba(204, 204, 204, 0.6);
`;

export default inject('account')(withRouter(observer(Navbar)));
