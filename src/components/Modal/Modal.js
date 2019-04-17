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
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    const { onButtonClick } = this.props;
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      onButtonClick(false);
    }
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
        ref={this.setWrapperRef}
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