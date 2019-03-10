import React, { Component } from 'react';
import ScrollMagic from 'scrollmagic';



const refOrInnerRef = (child) => {
  if (
    child.type &&
    child.type.$$typeof &&
    child.type.$$typeof.toString() === 'Symbol(react.forward_ref)') {
    return 'ref';
  }

  // styled-components < 4
  if (child.type && child.type.styledComponentId) {
    return 'innerRef';
  }

  return 'ref';
}

const isGSAP = (child) => {
  if (
    React.Children.count(child) === 1 &&
    child.type &&
    (child.type.displayName === 'Tween' || child.type.displayName === 'Timeline')
  ) {
    return true;
  }
  return false;
}

const controlGSAP = (child, progress, event) => {
  if (isGSAP(child)) {
    const props = { ...child.props, totalProgress: progress, paused: true };
    return <div><child.type {...props} /></div>;
  }
  return child;
}

const callChildFunction = (children, progress, event) => {
  if (children && typeof children === 'function') {
    return children(progress, event);
  }
  return children;
}

const getChild = (children, progress, event) => {
  children = controlGSAP(children, progress, event);
  children = callChildFunction(children, progress, event);
  return React.Children.only(children);
}

const isString = (element) => {
  if (typeof element === 'string' || element instanceof String) {
    return true;
  }
  return false;
}

class SceneBase extends Component {
  
  constructor(...args) {
    super(...args)
    this.state = {
      ref: null,
      scene: null,
      child: null,
      SceneBaseState: {
        event: 'init',
        progress: 0,
      }
    }
  }

  componentDidMount() {
    const {
      children,
      controller,
      classToggle,
      pin,
      pinSettings,
      indicators,
      enabled,
      ...sceneParams
    } = this.props;

    const element = this.ref;
    sceneParams.triggerElement = sceneParams.triggerElement === null ? null : sceneParams.triggerElement || element;
    this.scene = new ScrollMagic.Scene(sceneParams);

    this.initEventHandlers();

    if (classToggle) {
      this.setClassToggle(this.scene, element, classToggle);
    }

    if (pin || pinSettings) {
      this.setPin(this.scene, element, pin, pinSettings);
    }

    if (indicators) {
      this.scene.addIndicators({ name: ' ' });
    }

    this.scene.addTo(controller);
  }

  componentWillUnmount() {
    this.scene.destroy();
  }

  setClassToggle(scene, element, classToggle) {
    if (Array.isArray(classToggle) && classToggle.length === 2) {
      scene.setClassToggle(classToggle[0], classToggle[1]);
    }
    else {
      scene.setClassToggle(element, classToggle);
    }
  }

  setPin(scene, element, pin, pinSettings) {
    element = isString(pin) ? pin : element;
    scene.setPin(element, pinSettings);
  }

  initEventHandlers() {
    let { children } = this.props;

    if (typeof children !== 'function' && !isGSAP(callChildFunction(children, 0, 'init'))) {
      return;
    }

    this.scene.on('start end enter leave', (event) => {
      this.setState({
        event
      });
    });

    this.scene.on('progress', (event) => {
      this.setState({
        progress: event.progress
      });
    });
  }

  render() {
    let { children } = this.props;
    const { progress, event } = this.state;

    const child = getChild(children, progress, event);

    // TODO: Don't add ref to stateless or stateful components 

    return React.cloneElement(child, { [refOrInnerRef(child)]: ref => this.ref = ref });
  }
}

class Scene extends Component {
  static displayName = 'Scene';

  render() {

    if (!this.props.controller) {
      let { children } = this.props;
      const progress = 0;
      const event = 'init';

      return getChild(children, progress, event);
    }
    
    return (
      <SceneBase {...this.props} />
    );
  }
}

export default Scene;