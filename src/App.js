import React, { Component } from 'react';
import Controller from './components/scroll-magic/Controller';
import Preloader from './components/Preloader';
import Section from './components/Section';
import sections from './sections';
import './App.css';


class App extends Component {

  state = {
    loaded: false,
    loadedProgress: 0
  }

  componentDidMount() {
    let loaded = 0;
    let imgs = sections.filter(({ img }) => !!img).map(({ img }) => img);
    imgs.forEach(img => {
      const _img = new Image();
      _img.src = img;
      _img.onload = () => { 
        const isLoaded = (++loaded === imgs.length);
        this.setState({ loaded: isLoaded, loadedProgress: loaded / imgs.length * 100 })
      };
    });
  }

  render() {
    const { loaded, loadedProgress } = this.state;
    return (
      <div className="App">
        <Preloader visible={!loaded} progress={loadedProgress} />
        <Controller>
          {sections.map((props, i) => <Section key={i} {...props} />)}
        </Controller>
      </div>
    );
  }

}

export default App;
