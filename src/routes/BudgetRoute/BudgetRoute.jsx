import React,  { useState, useEffect } from 'react';
import Service from '../../components/Service';
import { Link } from 'react-router-dom';

import './BudgetRoute.scss';
export default function BudgetRoute(){
    const [useServices, setUseServices] = useState([]);
    const haveChange = false;
    useEffect(()=>{
        fetch("https://hdeletrossistemasapi-com.umbler.net/servicos")
        .then(response => response.json())
        .then(data =>  setUseServices(data))
    }, []);
    useEffect(()=> window.scrollTo(0, 0), [haveChange]);
    return(
        <div className="orcamento">
            <div className="orcamento__header">
                <h3>Fazer um orçamento, nunca foi tão fácil!</h3>
                {/* <h4>Selecione um dos servicos que deseja orçar abaixo:</h4>
                <h4>Caso deseje fazer um orçamento mais completo, selecione a opção Orcamento Personalizado</h4> */}
            </div>
            <div className="orcamento__servicos">
                {
                    useServices.map((obj, index) => (
                        <Link 
                        className="link" 
                        to= {`/orcamento/${
                                obj.nome.normalize("NFD")
                                .replace(/[\u0300-\u036f]/g, "")
                                .replace(" ", "-")
                                .toLowerCase()}`}
                        key={obj.id}
                        >
                            <Service
                                icon_code={obj.icon_code} 
                                service={obj.nome}
                                withlink={false}
                            />
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}