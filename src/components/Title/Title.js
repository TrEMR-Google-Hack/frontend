// @flow
import * as React from 'react';

type Props = { title: string };

export default class Title extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  componentDidMount() {
    document.title = this.props.title;
  }
  render() {
    return null;
  }
}
