import React, { useState } from 'react';

import Service from '../../components/Service';
import servicos from '../../data/servicos.json';

import './Services.scss';

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
                {
                    useServices.length < 1 
                    ? null
                    : useServices.map((obj, index) => (
                        <Service 
                            iconCode={obj.iconCode} 
                            service={obj.servico} 
                            description={obj.descricao} 
                            proficiency={obj.proficiency}
                            key={index}
                        />
                ))}
            </div>
        </div>
    )
}