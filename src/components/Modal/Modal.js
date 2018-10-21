import * as React from 'react';

type Props = {
  title: string,
  active: boolean,
  onButtonClick?: Function,
  onActivationChange?: Function,
  children?: ?React.Node,
  successMsg?: string,
  cancelMsg?: string,
  successColor?: string
};

class Modal extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isActive: props.active
    };
  }

  render() {
    const {
      title,
      onButtonClick,
      onActivationChange,
      children,
      successMsg,
      cancelMsg,
      successColor
    } = this.props;
    const primaryColor = successColor || 'primary';
    return (
      <div
        className={`modal ${this.state.isActive ? 'is-active' : ''}`}
        onClick={() => {
          if (onActivationChange) onActivationChange(!this.state.isActive);
          this.setState(s => ({
            isActive: !s.isActive
          }));
        }}
      >
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{title}</p>
            <button className="delete" aria-label="close" />
          </header>
          <section className="modal-card-body">{children}</section>
          {(successMsg || cancelMsg) && (
            <footer className="modal-card-foot">
              {successMsg && (
                <button
                  className={`button is-${primaryColor}`}
                  onClick={() => {
                    if (onButtonClick) onButtonClick(true);
                  }}
                >
                  {successMsg}
                </button>
              )}
              {cancelMsg && (
                <button
                  className="button"
                  onClick={() => {
                    if (onButtonClick) onButtonClick(false);
                  }}
                >
                  {cancelMsg}
                </button>
              )}
            </footer>
          )}
        </div>
      </div>
    );
  }
}
export default Modal;
