import React from 'react'
import '../App.css' 

const Image = ({src, style={ width: "35%" }, alt}) => {
  return (
    <img 
        src={src}
        style={style}
        alt={alt} 
    />
  )
};

export default Image;
