import React from 'react';
import { Link } from 'react-router-dom';

export default function Service(props){
    return(
        <div className="service">
            <div className="service__header">
                <div className="service__header__logo">
                    <img src={require(`../../assets/img/icons/${props.iconCode}`)}
                        alt={props.service} />
                </div>
            </div>
            <div className="service__description">
                <h3>{props.service}</h3>
                <p>{props.description}</p>
                <div className="service__rate" title={`Avaliação dos clientes: ${props.proficiency !== undefined ? props.proficiency.length + " Estrelas": ""}`}>
                    {
                        props.proficiency !== undefined 
                        ?props.proficiency.map((rate, index) => (
                            <i className="fas fa-star"/>
                        ))
                        :null
                    }
                </div>
            </div>
            <Link to={`/orcamento/${props.service.replace(" ", "-").toLowerCase()}`}>
                <button className="service__orcamento"> FAZER ORCAMENTO!</button>
            </Link>
        </div>
    )
}