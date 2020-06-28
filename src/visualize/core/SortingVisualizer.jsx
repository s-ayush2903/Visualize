import React from 'react'
import './VisualizeUI.css'
import { animate } from './algorithms';


const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';
const speed = 4; // in ms

//Normal app stuff
export default class SortingVisualizer extends React.Component {

  //kinda injection
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  //similar to overriding of onCreate()
  componentDidMount() {
    this.generateArray();   //do this so that screen doesn't appear blank when app is just loaded for the first time
  }


  generateArray() {
    const array = [];
    for (let i = 0; i < 100; i++)
      array.push(pickRandNum(7, 432));
    this.setState({ array })
  }

  //I'll be avoiding architecture now, as i'm doing all this on vsc and not interested devoting time to imports
  //So everything will be here in this MainActivity analogue

  mergeSort() {
    const animations = animate(this.state.array);

    for (let i = 0; i < animations.length; i++) {
      const array_bars = document.getElementsByClassName('arrayBar');
      const change_color = i % 3 !== 2;

      if (change_color) {
        const [first_bar, second_bar] = animations[i]; //not an iterable
        const first_bar_ui = array_bars[first_bar].style;
        const second_bar_ui = array_bars[second_bar].style;

        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;

        setTimeout(() => {
          first_bar_ui.backgroundColor = color;
          second_bar_ui.backgroundColor = color;
        }, i * speed);
      } else {
        setTimeout(() => {
          const [first_bar, new_height] = animations[i];
          const first_bar_ui = array_bars[first_bar].style;
          first_bar_ui.height = `${new_height}px`;
        }, i * speed);
      }
    }
  }

  render() {
    const { array } = this.state;

    return (
      <div className="arrayContainer">
        {array.map((value, index) => (
          <div className="arrayBar" key={index}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}
          >
          </div>
        ))}
        <button onClick={() => this.generateArray()}>Generate New Array</button>
        <button onClick={() => this.mergeSort()}>Execute Merge Sort</button>
      </div>
    );
  }
}

  //helper method
  function pickRandNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }