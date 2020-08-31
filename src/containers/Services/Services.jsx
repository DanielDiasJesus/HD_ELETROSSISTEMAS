import React, { useState, useEffect } from 'react';

import Service from '../../components/Service';

import './Services.scss';

export default function Services() {
    const [useServices, setUseServices] = useState([]);
    
    useEffect(()=>{
        fetch("http://hdeletrossistemasapi-com.umbler.net/servicos")
        .then(response =>{
            if(!response.ok){
                throw Error("Error while fetch services");
            }
            return response.json();
        })
        .then(data =>  setUseServices(data))
        .catch(err => {throw Error(err.message)});
    }, []);
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
                {console.log(useServices)}
                {
                    useServices.length < 1 
                    ? null
                    : useServices.map((obj, index) => (
                        <Service 
                            icon_code={obj.icon_code} 
                            service={obj.nome} 
                            description={obj.descricao} 
                            rate={obj.rate}
                            key={index}
                        />
                ))}
            </div>
        </div>
    )
}