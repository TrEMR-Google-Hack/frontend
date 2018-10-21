// @flow
import * as React from 'react';
import styled from 'styled-components';

type Props = {
  type?: 'info' | 'warning' | 'danger',
  onExitClick: Function,
  children: React.Node
};

const Notification = ({ type, onExitClick, children }: Props) => (
  <NotificationContainer>
    {/* $FlowFixMe */}
    <div className={`notification is-${type}`}>
      <button className="delete" onClick={onExitClick} />
      {children}
    </div>
  </NotificationContainer>
);

Notification.defaultProps = {
  type: 'info'
};

const NotificationContainer = styled.div`
  margin: 20px 0;
  padding: 0 50px;
`;

export default Notification;
