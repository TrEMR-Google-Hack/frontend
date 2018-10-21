// @flow
import * as React from 'react';
import styled from 'styled-components';

const chunk = (arr, chunkSize, cache = []) => {
  const tmp = [...arr];
  while (tmp.length) cache.push(tmp.splice(0, chunkSize));
  return cache;
};

type Props = {
  padding?: number,
  fillGrid: boolean,
  perRow: number,
  children: any
};

const GridContainer = ({ padding, children, fillGrid, perRow }: Props) => {
  children = React.Children.toArray(children);
  let newChildren = children;
  let remainingGridCells = (newChildren.length % perRow) + 1;
  if (fillGrid && remainingGridCells !== 0) {
    for (let i = 0; i < remainingGridCells; i++) {
      newChildren.push(<React.Fragment />);
    }
  }
  const rows = chunk(newChildren, perRow);
  return (
    <Container padding={padding}>
      {rows.map((row, i) => (
        <div key={i} className="columns">
          {row.map((column, j) => (
            <div key={j} className="column">
              {column}
            </div>
          ))}
        </div>
      ))}
    </Container>
  );
};

const Container = styled.div`
  ${({ padding }) => (padding ? `padding ${padding}px;` : '')};
`;

export default GridContainer;
