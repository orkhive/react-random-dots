import React, { useRef, useEffect, useState } from 'react';
import './App.css';
 
function App() {
  const [squares, setSquares] = useState([]);
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const [availableSquares, setAvailableSquares] = useState([])

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
        console.log(x);
      }
      return x;
    }
    
    const w = 5; //randomIntFromInterval(10, 50);
    const h = 5; //randomIntFromInterval(10, 50);
    const x = randomIntFromInterval(0, screenWidth - w, 5);
    const y = randomIntFromInterval(0, screenHeight - h, 5);

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
    const number = squares.length + 1;
    const newSquares = [...squares, {number: number, x: x, y: y, w: w, h: h, newColor: newColor}];
    setSquares(newSquares);

  };

  return (
    <div className="App" width={screenWidth} height={screenHeight}>
          {squares.map(square => (
            <div key={square.number} style={{
              position: "absolute",
              width: square.w,
              height: square.h,
              left: square.x,
              top: square.y,
              backgroundColor: square.newColor
            }} />
          ))}
    </div>
  );
}
 
export default App;