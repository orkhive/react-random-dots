import React, { useEffect, useState } from 'react';
import '../styles/App.css';
import SquareBlock from './SquareBlock.js';
import utils from '../utils.js';
 
function App() {

  //Game Variables
  const drawSpeed = 1; //100ms
  const buttonSize = 5;
  const scoreHeight = 25;
  const screenWidth = window.innerWidth - buttonSize;
  const screenHeight = window.innerHeight - scoreHeight - buttonSize;

  //Use States
  const [squares, setSquares] = useState([]);
  const [score, setScore] = useState(0);
  const [availSquares, setAvailSquares] = useState(() => {
    return utils.getPixelArray(screenWidth, screenHeight, buttonSize);
  });

  // initialize the canvas context
  useEffect(() => {

    //This Does The Rendering
    if (availSquares.length > 0) {
    const timerId = setTimeout(() => {
      drawFillRect();
    }, drawSpeed);

    //This Happens When The Rendering Finishes
    return () => clearTimeout(timerId);
    }
  });
 
  // draw rectangle with background
  const drawFillRect = () => {

    // function randomIntFromInterval(min, max, interval) { // min and max included 
    //   let x = Math.floor(Math.random() * (max - min + 1) + min);

    //   if (interval > 1)
    //   {
    //     var remainder = (x % interval);
    //     (remainder > x / 2) ? x = x + interval - remainder : x = x - remainder;
    //   }
    //   return x;
    // }
    
    const w = buttonSize; //randomIntFromInterval(10, 50);
    const h = buttonSize; //randomIntFromInterval(10, 50);
    let x = 0;
    let y = 0;
    
      //Get The Pixel From The Array Randomly
      var grid = Math.floor(screenWidth / buttonSize) * buttonSize;
      var number = utils.randomFromArray(availSquares); 
      x = (number % grid);
      x = Math.floor(x / buttonSize) * buttonSize;
      
      y = ((number - x) / grid);
      y = (y * buttonSize) + scoreHeight;
      
      //Remove It So It Can't Be Used Again
      const newAvailSquares = availSquares.filter(n => n != number);
      setAvailSquares(newAvailSquares);

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
    const newSquares = [...squares, {number: number, x: x, y: y, w: w, h: h, newColor: newColor}];
    setSquares(newSquares);

  };

  const squareClick = (number) => {
    const newSquares = squares.filter(function(el) { return el.number != number; });
    setScore(score+1);
    setSquares(newSquares);   
    
    const newAvailSquares = [...availSquares, number];
    setAvailSquares(newAvailSquares);
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