import React from 'react';

const utils = {

    //get a array for each pixel on screen
    getPixelArray: (width, height, interval) => Array.from([...Array(Math.floor((width / interval) * (height / interval))).keys()], x => x * interval),

    //pick a random index of an item in the array
    randomFromArray: (arr) => arr[utils.random(0, arr.length - 1)],

    // pick a random number between min and max (edges included)
    random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),

    //Check If The Sqare X & Y already exists
    allowSquare: (squares, x, y) => (squares.length == 0 ? true : !squares.some(item => x == item.x && y === item.y)),
};

export default utils;