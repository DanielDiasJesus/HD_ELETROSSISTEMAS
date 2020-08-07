import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import servicos from '../../data/servicos.json';
// import './Services.css';
import './Services.scss';

import { faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Services() {
    const [useServices] = useState(servicos.services);

    function createStyleFlat(index, bool = false) {
        const colorsSlim = ["rgba(000, 102, 255)", 
                            "rgba(251, 000, 255)",
                            "rgba(000, 214, 197)",
                            "rgba(057, 227, 000)",
                            "rgba(255, 000, 000)", 
                            "rgba(207, 079, 000)",
                            "rgba(255, 179, 000)", 
                            "rgba(191, 191, 191)"];
        const styles = !bool ? {
            boxShadow: `inset 0em 0em 0em 15em ${colorsSlim[index]}`
        } : {
                color: colorsSlim[index]
            }

        return styles;
    }
    return (
        <div className="services" id="services">
            <div className="services__info">
                <div className="services__info__title">
                    <h3 style={{opacity: 1}}>NOSSOS SERVIÇOS</h3>
                    <h3 style={{opacity: 0.4}}>NOSSOS SERVIÇOS</h3>
                    <h3 style={{opacity: 0.2}}>NOSSOS SERVIÇOS</h3>
                    <h3 style={{opacity: 0.1}}>NOSSOS SERVIÇOS</h3>
                </div>
                <div className="services__info__description">
                    <p>
                        <span className='services__info__description__icon'>
                            <FontAwesomeIcon icon={faStar} size="lg"/>
                        </span>
                        A HD segue intrinsecamente a lealdade e fidelidade com seus fornecedores e clientes
                    </p>
                    <p>
                        <span className='services__info__description__icon'>
                            <FontAwesomeIcon icon={faStar} size="lg"/>
                        </span>
                        Fornecemos sempre os <span>melhores serviços</span>, atuando com o <span>melhor método</span> do mercado
                    </p>
                    <p>
                        <span className='services__info__description__icon'>
                            <FontAwesomeIcon icon={faStar} size="lg"/>
                        </span>
                        Garantido pela <span>tradicionalidade</span>, <span>confiabilidade</span> de nossos clientes e por <span>nossa marca ao longo do tempo.</span>
                    </p>
                    <p>
                        Você pode escolher um serviço abaixo e fazer um orçamento em poucos cliques
                    </p>
                </div>
            </div>
            <div className="services__carroussel">
                {useServices.map((obj, index) => (
                    <div className="services__carroussel__service-slim" key={index}>
                        <div className="services__carroussel__service-slim__header" style={createStyleFlat(index)}>
                            <div className="services__carroussel__service-slim__header__logo">
                                <img src={require(`../../assets/img/icons/${obj.iconCode}`)}
                                    alt={obj.servico} />
                            </div>
                        </div>
                        <div className="animate" style={createStyleFlat(index)}></div>
                        <div className="services__carroussel__service-slim__description">
                            <h3>{obj.servico}</h3>
                            <p>{obj.descricao}</p>
                            <div className="services__carroussel__service-slim__description__rate" title={`Avaliação dos clientes: ${obj.proficiency.length} Estrelas`}>
                                {obj.proficiency.map((rate, index) => (
                                    <FontAwesomeIcon className="i" key={index} icon={faStar} size="2x"></FontAwesomeIcon>
                                ))}
                            </div>
                        </div>
                        <Link to={`/orcamento/${obj.servico}`}>
                            <button className="services__carroussel__service-slim__orcamento" style={createStyleFlat(index, true)}> FAZER ORCAMENTO!</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}