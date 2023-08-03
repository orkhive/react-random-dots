import React from 'react';

const SquareBlock = (props) => {

    return (
      <div key={props.square.number} 
        onClick={() => props.onClick(props.square.number)}
        style={{
                position: "absolute",
                width: props.square.w,
                height: props.square.h,
                left: props.square.x,
                top: props.square.y,
                backgroundColor: props.square.newColor
              }} />
    );
  };

export default SquareBlock;