import React, { Component } from 'react';
import Controller from './components/scroll-magic/Controller';
import Preloader from './components/Preloader';
import Section from './components/Section';
import './App.css';

const sections = [
  {
    img: "/img/smile.jpg",
    title: (
      <React.Fragment>
        My Name is <b>Khadim</b>, feel Free to <b>scroll 👇️</b> through my Life
      </React.Fragment>
    ),
    text: (
      <React.Fragment>
        The last thing I wanted, was another uncreative boring portfolio page.<br />
        I want you to <b>have fun</b> while scrolling through my life.<br />
        See how I am and why I became a <b>developer</b>.
      </React.Fragment>
    ),
  },
  {
    img: "/img/senegal.jpg",
    title: (
      <React.Fragment>
        Born and raised in <b>Germany</b> with roots in <b>Senegal</b>
      </React.Fragment>
    ),
    text: (
      <React.Fragment>
        <b>"Do you speak german?"</b> To be honest, I barely get this question asked.<br />
        I am enjoying my life in <b>Munich 🔥</b>, where so many nationalities come together.<br />
        I was raised here by my <b>german mother</b> and my <b>senegalese dad</b>.
      </React.Fragment>
    ),
  },
  {
    img: "/img/book.jpg",
    title: (
      <React.Fragment>
        <b>High school</b> was no fun, but i magically made it
      </React.Fragment>
    ),
    text: (
      <React.Fragment>
        I visited the <b>"Montessori-School at the Olympic-Park"</b> and the <b>"Therese-von-Bayern Schule"</b>.<br />
        I was never really interested in school subjects like german or history and 
        spent the most of my time with <b>👨‍💻 programming</b>, <b>🏋️ fitness</b> and <b>🥊 boxing</b>.<br />
      </React.Fragment>
    ),
  },
  {
    img: "/img/construct.jpg",
    title: (
      <React.Fragment>
        Started studying <b>Web Development</b>
      </React.Fragment>
    ),
    text: (
      <React.Fragment>
        In 2015 I started studying Web Development at the <b>SAE Institute</b> in Munich.<br />
        2017 I won the <a target="_blank" href="https://alumni.sae.edu/2017/10/21/the-winners-of-the-sae-alumni-awards-and-sae-student-awards-2017/">SAE Alumni Award 🏆️</a> for the best Web Production.<br />
        Finally, mid of 2018, I received my <b>Bachelor of Science 🎓️</b> with First Class Honours in Web Development.
      </React.Fragment>
    ),
  },
]

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
