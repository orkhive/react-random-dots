import React, { useEffect, useState } from 'react';
import '../styles/App.css';
import SquareBlock from './SquareBlock.js';
 
function App() {
  const [squares, setSquares] = useState([]);
  const [score, setScore] = useState(0);
  const scoreHeight = 25;
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight - scoreHeight;

  // initialize the canvas context
  useEffect(() => {

    //This Does The Rendering
    const timerId = setTimeout(() => {
      drawFillRect();
    }, 100);

    //This Happens When The Rendering Finishes
    return () => clearTimeout(timerId);
  });
 
  // draw rectangle with background
  const drawFillRect = () => {

    function randomIntFromInterval(min, max, interval) { // min and max included 
      let x = Math.floor(Math.random() * (max - min + 1) + min);

      if (interval > 1)
      {
        var remainder = (x % interval);
        (remainder > x / 2) ? x = x + interval - remainder : x = x - remainder;
      }
      return x;
    }
    
    const w = 5; //randomIntFromInterval(10, 50);
    const h = 5; //randomIntFromInterval(10, 50);
    const x = randomIntFromInterval(0, screenWidth - w, 5);
    const y = randomIntFromInterval(scoreHeight, screenHeight - h, 5);

    const generateColor = () => {
        let randomColorString = "#";
        const arrayOfColorFunctions = "0123456789abcdef";
        for (let x = 0; x < 6; x++) {
          let index = Math.floor(Math.random() * 16);
          let value = arrayOfColorFunctions[index];
    
          randomColorString += value;
        }
        return randomColorString;
    };

    const newColor = generateColor();
    let number = 1;
    if (squares.length > 0) {
      number = Math.max.apply(null, squares.map(function (o) {return o.number;})) + 1;
    }
    const newSquares = [...squares, {number: number, x: x, y: y, w: w, h: h, newColor: newColor}];
    setSquares(newSquares);

  };

  const squareClick = (number) => {
    const newSquares = squares.filter(function(el) { return el.number != number; });
    setScore(score+1);
    setSquares(newSquares);    
  };

  return (
    <div className="App" width={screenWidth} height={screenHeight}>
        <label name="scoreLabel">Score: {score}</label>
          {squares.map(square => (
            <SquareBlock key={square.number} square={square} onClick={squareClick}/>
          ))}
    </div>
  );
}
 
export default App;