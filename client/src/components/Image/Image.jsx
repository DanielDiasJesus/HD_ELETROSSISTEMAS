import React from 'react';
import '../Image/Image.scss';

export default function Image(props){
    return(
        <div className="image">
            {console.log(props.src)}
            <img src={props.src} alt={props.alt} />
        </div>
    );
}