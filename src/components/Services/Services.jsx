import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import servicos from '../../data/servicos.json';
// import './Services.css';
import './Services.scss';

import { faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Services() {
    const [useServices] = useState(servicos.services);
    
    return (
        <div className="services" id="services">
            <div className="services__info">
                <div className="services__info__title">
                    <div className = "services__info__title__line"></div>
                    <h3>NOSSOS SERVIÇOS</h3>
                    <div className = "services__info__title__line"></div>
                </div>
                <div className="services__info__description">
                    <p>
                        A HD segue intrinsecamente a lealdade e fidelidade com seus fornecedores e clientes
                        fornecemos sempre os <span>melhores serviços</span>, atuando com o <span>melhor método</span> do mercado
                        garantido pela <span>tradicionalidade</span>, <span>confiabilidade</span> de nossos clientes e por <span>nossa marca ao longo do tempo.</span>
                    </p>
                    <p>Você pode escolher um serviço abaixo e fazer um orçamento com poucos cliques</p>
                </div>
            </div>
            <div className="services__carroussel">
                {useServices.map((obj, index) => (
                    <div className="services__carroussel__service-slim" key={index}>
                        <div className="services__carroussel__service-slim__header">
                            <div className="services__carroussel__service-slim__header__logo">
                                <img src={require(`../../assets/img/icons/${obj.iconCode}`)}
                                    alt={obj.servico} />
                            </div>
                        </div>
                        <div className="services__carroussel__service-slim__description">
                            <h3>{obj.servico}</h3>
                            <p>{obj.descricao}</p>
                            <div className="services__carroussel__service-slim__description__rate" title={`Avaliação dos clientes: ${obj.proficiency.length} Estrelas`}>
                                {obj.proficiency.map((rate, index) => (
                                    <FontAwesomeIcon className="i" key={index} icon={faStar} size="2x"></FontAwesomeIcon>
                                ))}
                            </div>
                        </div>
                        <Link to={`/orcamento/${obj.servico.replace(" ", "-").toLowerCase()}`}>
                            <button className="services__carroussel__service-slim__orcamento"> FAZER ORCAMENTO!</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}