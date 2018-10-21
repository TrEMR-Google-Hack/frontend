import * as React from 'react';

type Props = {
  children: React.Element[]
};

const GridItem = ({ children }: Props) => (
  <div className="column">{children}</div>
);

export default GridItem;
