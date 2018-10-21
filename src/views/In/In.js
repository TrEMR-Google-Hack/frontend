// @flow
import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter, type RouterHistory } from 'react-router-dom';
import styled from 'styled-components';
import Title from 'components/Title';
import Navbar from 'components/Navbar';
import InStore from '../../stores/InStore/InStore';

type Props = {
  instore: InStore,
  history: RouterHistory
};

class About extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { instore } = this.props;
    const { isLoaded } = instore;
    if (!isLoaded) instore.fetch();
  }

  render() {
    const { instore, history } = this.props;
    const { patients } = instore;
    return (
      <React.Fragment>
        <Title title="Central EMR" />
        <Navbar title={{ label: 'Central EMR', path: '/' }} />
        <Container>
          <table style={{ width: '100%' }}>
            <tbody>
              <Row>
                <Header>Patient Name</Header>
                <Header>Date of Birth</Header>
                <Header>Illnesses</Header>
                <Header>Drugs</Header>
              </Row>
              {patients.map(({ name, dob, illnesses, drugs, ssn }, i) => (
                <HighlightableRow
                  key={i}
                  onClick={() => {
                    history.push(`/patient?ssn=${ssn}`);
                  }}
                >
                  <Cell>{name}</Cell>
                  <Cell>{dob}</Cell>
                  <Cell>{illnesses}</Cell>
                  <Cell>{drugs}</Cell>
                </HighlightableRow>
              ))}
              <HighlightableRow>
                <Cell>John Doe</Cell>
                <Cell>8:30am</Cell>
                <Cell>Flu</Cell>
                <Cell>Steroids</Cell>
              </HighlightableRow>
            </tbody>
          </table>
        </Container>
      </React.Fragment>
    );
  }
}

const Container = styled.div`
  padding: 50px 75px;
`;

const Row = styled.tr`
  border-top: 1px solid rgba(204, 204, 204, 0.6);
  border-bottom: 1px solid rgba(204, 204, 204, 0.6);
  line-height: 50px;
`;

const HighlightableRow = styled(Row)`
  &:hover {
    background: #eee;
  }
`;

const Header = styled.th`
  padding-left: 10px;
`;

const Cell = styled.td`
  padding-left: 10px;
`;

const Emphasized = styled.span`
  font-weight: bold;
  font-style: italic;
`;

export default inject('instore')(withRouter(observer(About)));
