import React, { Component } from 'react';
import Scene from './scroll-magic/Scene';
import { Tween, Timeline } from 'react-gsap';
import Clip from './Clip';

const breakWidth = 1000;

class Section extends Component {
  static displayName = 'Scene';

  state = {
    mobile: false,
    clipOpen: false
  };

  componentWillMount() {
    this.setState({
      mobile: (window.screen.width < breakWidth)
    });
  }

  render() {
    const { mobile, clipOpen } = this.state;
    let { controller, img, title, text, youtube, mobileHeight = 900 } = this.props; 
    return (
      <div className="section" style={mobile ? { height: mobileHeight } : null}>
        <Scene
          controller={controller}
          duration={400}
          offset={100}
          triggerHook="onCenter"
        >
          <Timeline>
            <Tween
              from={{
                opacity: 0,
                rotation: -15,
                transformOrigin: "right 50%"
              }}
              to={{
                opacity: 1,
                rotation: -1
              }}
            >
              <h1>{title}</h1>
            </Tween>
          </Timeline>
        </Scene>
        <Scene
          controller={controller}
          duration={mobile ? 200 : 400}
          offset={50}
          triggerHook="onLeave"
        >
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
              <div className="img" style={{ backgroundImage: `url(${img})` }}>
                {youtube && (
                  <div
                    class="play-button"
                    onClick={() => this.setState({ clipOpen: true })}
                  >
                    📽️ PLAY CLIP
                  </div>
                )}
                {youtube && (
                  <Clip
                    src={youtube}
                    visible={clipOpen}
                    close={() => this.setState({ clipOpen: false })}
                  />
                )}
              </div>
            </Tween>
          </Timeline>
        </Scene>
        <Scene
          controller={controller}
          duration={400}
          offset={mobile ? 200 : 500}
          triggerHook={mobile ? "onEnter" : "onCenter"}
        >
          <Timeline>
            <Tween
              from={{
                opacity: 0,
                rotation: -15,
                transformOrigin: "right 50%"
              }}
              to={{
                opacity: 1,
                rotation: -1
              }}
            >
              <div className="text">{text}</div>
            </Tween>
          </Timeline>
        </Scene>
      </div>
    );
  }
}

export default Section;