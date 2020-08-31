import React,  { useState, useEffect } from 'react';
import Service from '../../components/Service';
import { Link } from 'react-router-dom';

import './BudgetRoute.scss';
export default function BudgetRoute(){
    const [useServices, setUseServices] = useState([]);
    const handleOnLoad = () => window.scrollTo(0, 0);

    useEffect(()=>{
        fetch("https://hdeletrossistemasapi-com.umbler.net/servicos")
        .then(response =>{
            if(!response.ok){
                throw Error("Error while fetch services");
            }
            return response.json();
        })
        .then(data =>  setUseServices(data))
        .catch(err => {throw Error(err.message)});
    }, []);

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
                        <Link className="link" to={`/orcamento/${obj.nome.replace(" ", "-").toLowerCase()}`}>
                            <Service 
                                icon_code={obj.icon_code} 
                                service={obj.nome}
                                key={obj.id}
                            />
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}