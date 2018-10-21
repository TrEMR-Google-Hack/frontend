// @flow
import * as React from 'react';
import styled from 'styled-components';

type Props = {
  imageUrl?: string,
  imageAlt?: string,
  children: React.Node,
  footer?: React.Node
};

const Card = ({ imageUrl, imageAlt, children, footer }: Props) => (
  <Container className="card">
    {imageUrl && (
      <div className="card-image">
        <figure className="image is-4by3">
          <img src={imageUrl} alt={`${imageAlt || 'Card'} image`} />
        </figure>
      </div>
    )}
    <div className="card-content">{children}</div>
    {footer && <footer className="card-footer">{footer}</footer>}
  </Container>
);

const Container = styled.div`
  word-wrap: break-word;
`;

export default Card;
