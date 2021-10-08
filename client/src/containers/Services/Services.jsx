import React, { useState, useEffect } from 'react';

import Service from '../../components/Service';
import Loading from '../../components/Loading';

import './Services.scss';

import servicos from '../../utils/res_images';
import {handleNome} from '../../utils/verificasoes';

export default function Services() {
    const [useServices, setUseServices] = useState([]);
    
    useEffect(()=>{
        fetch("/api/servicos")
        .then(response =>{
            if(!response.ok){
                throw Error("Error while fetch services");
            }
            // console.log(response);
            return response.json();
        })
        .then(data => setUseServices(data))
        .catch(err => {throw Error(err.message)});
    }, []);

    return (
        <div className="services" id="#servicos">
            {/* <img src={imageTest} className="services__img__test" /> */}
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
            {
                useServices.length > 0 ?
                <div className="services__carroussel">
                {
                    useServices.map((obj, index) => {
                        const nome = handleNome(obj.NOME);
                        
                        // console.log(nome);
                        return (<Service
                            key={obj.ID}
                            icon_code={servicos[nome].icon} 
                            service={obj.NOME} 
                            description={obj.DESCRICAO} 
                            withlink={true}
                            rate={obj.RATE}
                        />)
                    })
                }
                    <Service
                        key={useServices.length + 1}
                        icon_code={servicos["orcamento_personalizado"].icon}
                        service={"ORÇAMENTO PERSONALIZADO"}
                        description={"Não encontrou o serviço que procurava? Deseja fazer um orçamento mais completo? Aqui você pode escolher os qualquer serviços e os trabalhos que oferecemos e que deseja colocar no orçamento."}
                        withlink={true}
                        rate={null} />
                </div> : 
                <Loading/>
            }
        </div>
    )
}