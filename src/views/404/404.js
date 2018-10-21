// @flow
import * as React from 'react';
import styled from 'styled-components';
import { withRouter, type RouterHistory } from 'react-router-dom';
import Title from 'components/Title';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';

type Props = {
  history: RouterHistory
};

const Page404 = ({ history }: Props) => (
  <React.Fragment>
    <Title title="Page not found" />
    <Navbar />
    <section className="section">
      <SuperMessage className="has-text-centered">
        {'Sorry! This page doesn\'t exist. Try going back to the '}
        <Underlined
          onClick={() => {
            history.push('/');
          }}
        >
          homepage.
        </Underlined>
      </SuperMessage>
    </section>
    <Footer />
  </React.Fragment>
);

const SuperMessage = styled.h1`
  font-size: 3em;
  font-weight: bold;
  margin: 300px 0;
`;

const Underlined = styled.span`
  text-decoration: underline;
  cursor: pointer;
`;

export default withRouter(Page404);
