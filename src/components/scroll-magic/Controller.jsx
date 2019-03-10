import React, { Component } from 'react';
import ScrollMagic from 'scrollmagic';

class Controller extends Component {

  constructor(...args) {
    super(...args)
    this.state = {
      controller: null,
    }
  }

  componentDidMount() {
    const { children, ...controllerProps } = this.props;
    this.setState({
      controller: new ScrollMagic.Controller(controllerProps)
    });
  }

  componentWillUnmount() {
    this.controller = null;
  }

  render() {
    const { children } = this.props;
    const { controller } = this.state;

    if (!controller) {
      return children;
    }

    return React.Children.map(children, (child) => {
      if (child.type.displayName !== 'Scene') {
        return child;
      }
      const props = { ...child.props, controller };
      return <child.type {...props} />;
    });
  }
}

export default Controller;