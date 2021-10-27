import React from 'react';
import { Link } from 'react-router-dom';

export default function Service(props){
    const link = props.service.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(" ", "-").toLowerCase();
    function createStarField(limit){
        let start = [];
        for(let x = 0; x < limit; x++)
        start.push(<i key={x} className="fas fa-star"/>);
        return start;
    }
    
    return(
        <div className="service">
            {/* {console.log(props.icon_code)} */}
            <div className="service__header">
                <div className="service__header__logo">
                    <img 
                        src={props.icon_code}
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
                        :""
                    }
                </div>
            </div>
            {
                props.withlink ? 
                <Link to={`/orcamento/${link}`} className="service_link">
                    <button className="service__orcamento"> FAZER ORCAMENTO!</button>
                </Link> : 
                null
            }
        </div>
    )
}