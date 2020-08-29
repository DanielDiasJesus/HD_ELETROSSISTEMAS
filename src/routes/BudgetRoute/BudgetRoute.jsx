import React,  { useState } from 'react';
import servicos from '../../data/servicos.json';
import Service from '../../components/Service';
import { Link } from 'react-router-dom';

import './BudgetRoute.scss';
export default function BudgetRoute(){
    const [useServices] = useState(servicos.services);
    const handleOnLoad = () => window.scrollTo(0, 0);

    return(
        <div className="orcamento" onLoad={handleOnLoad}>
            <div className="orcamento__header">
                <h3>Fazer um orçamento, nunca foi tão fácil!</h3>
                {/* <h4>Selecione um dos servicos que deseja orçar abaixo:</h4>
                <h4>Caso deseje fazer um orçamento mais completo, selecione a opção Orcamento Personalizado</h4> */}
            </div>
            <div className="orcamento__servicos">
                {
                    useServices.map((obj, index) => (
                        <Link className="link" to={`/orcamento/${obj.servico.replace(" ", "-").toLowerCase()}`}>
                            <Service 
                                iconCode={obj.iconCode} 
                                service={obj.servico}
                                key={index}
                            />
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}