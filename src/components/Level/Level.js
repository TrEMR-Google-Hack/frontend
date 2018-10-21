// @flow
import * as React from 'react';
import styled from 'styled-components';

type Props = {
  title: string
};

const Level = ({ title }: Props) => (
  <nav className="level">
    <p className="level-item has-text-centered">
      <LevelTitle>{title}</LevelTitle>
    </p>
  </nav>
);

const LevelTitle = styled.span`
  font-size: 3em;
`;

export default Level;
