import React, { Component } from "react";
import PropTypes from "prop-types";
import { Dialog as EvergreenDialog, Pane } from "evergreen-ui";

class Dialog extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    confirmLabel: PropTypes.string.isRequired,
    onConfirm: PropTypes.func,
    title: PropTypes.string.isRequired,
    trigger: PropTypes.node.isRequired
  };

  static defaultProps = {
    onConfirm: close => close()
  };

  constructor(props) {
    super(props);

    this.state = {
      isShown: false
    };

    this.onConfirm = this.onConfirm.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  onConfirm() {
    this.props.onConfirm();
    this.close();
  }

  close() {
    this.setState({ isShown: false });
  }

  open() {
    this.setState({ isShown: true });
  }

  render() {
    return (
      <div>
        <Pane>
          <EvergreenDialog
            confirmLabel={this.props.confirmLabel}
            isShown={this.state.isShown}
            onCloseComplete={this.close}
            onConfirm={this.onConfirm}
            title={this.props.title}
          >
            {this.props.children}
          </EvergreenDialog>
        </Pane>
        <div onClick={this.open}>{this.props.trigger}</div>
      </div>
    );
  }
}

export default Dialog;
