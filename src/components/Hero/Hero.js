// @flow
import * as React from 'react';
import styled from 'styled-components';

type Props = {
  title?: any,
  subtitle?: any,
  centered?: ?boolean
};

const Hero = ({ title, subtitle, centered }: Props) => (
  <Section>
    <div className="hero-body">
      <div className={`container ${centered ? 'has-text-centered' : ''}`}>
        {title && <Title>{title}</Title>}
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </div>
    </div>
  </Section>
);

const Section = (props: any) => (
  <section className="hero is-fullheight is-bold">{props.children}</section>
);

const Title = styled.div`
  font-size: 3em;
`;
const Subtitle = styled.div`
  margin: 20px 0;
  font-size: 2em;
`;

export default Hero;
