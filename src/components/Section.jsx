import React, { Component } from 'react';
import Scene from './scroll-magic/Scene';
import { Tween, Timeline } from 'react-gsap';

class Section extends Component {
  static displayName = 'Scene';

  render() {
    let { controller, img, title, text } = this.props; 
    return (
      <div className="section">
        <Scene controller={controller} duration={400} offset={100} triggerHook="onCenter">
          <Timeline>
            <Tween
              from={{
                opacity: 0,
                rotation: -15,
                transformOrigin: "right 50%",
              }}
              to={{
                opacity: 1,
                rotation: -1,
              }}
            >
              <h1>{title}</h1>
              
              </Tween>
            </Timeline>
        </Scene>
        <Scene controller={controller} duration={400} offset={50} triggerHook="onLeave">
          <Timeline>
            <Tween
              from={{
                opacity: 1,
                rotation: 0,
                transformOrigin: "right 50%",
                right: 0,
                scale: 1
              }}
              to={{
                opacity: 0,
                rotation: 15,
                right: -400,
                scale: 1.1
              }}
            >
              <div className="img" style={{ backgroundImage: `url(${img})` }}></div>
            </Tween>
          </Timeline>
        </Scene>
        <Scene controller={controller} duration={400} offset={500} triggerHook="onCenter">
          <Timeline>
            <Tween
              from={{
                opacity: 0,
                rotation: -15,
                transformOrigin: "right 50%",
              }}
              to={{
                opacity: 1,
                rotation: -1,
              }}
            >
              <div className="text">{text}</div>
            </Tween>
          </Timeline>
        </Scene>
        </div>
    )
  }
}

export default Section;