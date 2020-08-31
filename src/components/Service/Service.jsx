import React from 'react';
import { Link } from 'react-router-dom';

export default function Service(props){
    function createStarField(limit){
        let start = [];
        for(let x = 0; x < limit; x++)
        start.push(<i className="fas fa-star"/>);
        return start;
    }
    
    return(
        <div className="service">
            <div className="service__header">
                <div className="service__header__logo">
                    {console.log(props.icon_code)}
                    <img src={props.icon_code}
                        alt={props.service} />
                </div>
            </div>
            <div className="service__description">
                <h3>{props.service}</h3>
                <p>{props.description}</p>
                <div className="service__rate" title={`Avaliação dos clientes: ${props.rate !== undefined ? props.rate+ " Estrelas": ""}`}>
                    {
                        props.rate !== undefined 
                        ?createStarField(props.rate)
                        :console.log("nullStar :(")
                    }
                </div>
            </div>
            <Link to={`/orcamento/${props.service.replace(" ", "-").toLowerCase()}`}>
                <button className="service__orcamento"> FAZER ORCAMENTO!</button>
            </Link>
        </div>
    )
}