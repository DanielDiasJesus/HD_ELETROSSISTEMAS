import React from 'react';

import './Fact.scss';

export default function Fact(props){
    return(
        <div className="fact">
            <div className="fact__title">
                <h2>{props.title}</h2>
            </div>
            <div className="fact__subtitle">
                <h3>{props.subtitle}</h3>
            </div>
        </div>
    )
}