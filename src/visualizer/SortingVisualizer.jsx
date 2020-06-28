import React from 'react'
import './SortingVisualizer.css'

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
    this.setState({array})
  }

  render() {
    const { array } = this.state;

    return (
      <> {array.map((value, index) => (
        <div className="array-bar" key={index}>
          {value}
        </div>
      ))}
      </>
    );
  }
}

//helper method
function pickRandNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
