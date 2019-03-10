import React, { Component } from 'react';

class Preloader extends Component {
  state = {
    visible: false,
    removed: true
  }

  componentDidUpdate() {
    if (!this.props.visible && this.state.visible) {
      setTimeout(() => { this.setState({ visible: false }); }, 2000);
      setTimeout(() => { this.setState({ removed: true }); }, 2400);
    }
    if (this.props.visible && this.state.removed) {
      this.setState({ visible: true, removed: false });
    }
  }

  render() {
    const { removed, visible } = this.state;
    return removed ? null : (
      <div className={"preloader" + (visible ? "" : " done")}>
        <span className="preloader-char">K</span>
      </div>
    )
  }
}

export default Preloader;