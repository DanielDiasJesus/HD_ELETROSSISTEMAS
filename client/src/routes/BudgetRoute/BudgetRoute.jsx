import React,  { useState, useEffect } from 'react';
import Service from '../../components/Service';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading';
import './BudgetRoute.scss';

import servicos from '../../utils/res_images';
import {handleNome} from '../../utils/verificasoes';

import { ServicesFetch } from '../../utils/safe_fetch';

export default function BudgetRoute(){
    const [services, setServices] = useState([]);
    const haveChange = false;
    useEffect(()=>{
        ServicesFetch().then( response => {
            setServices(response);
        })
    }, [haveChange]);
    
    return(
        <div className="orcamento">
            {
                services.length > 0 ?
                <>
                    <div className="orcamento__header">
                    <h3>Fazer um orçamento, nunca foi tão fácil!</h3>
                    {/* <h4>Selecione um dos servicos que deseja orçar abaixo:</h4>
                    <h4>Caso deseje fazer um orçamento mais completo, selecione a opção Orcamento Personalizado</h4> */}
                    </div>
                    <div className="orcamento__servicos">
                        {
                            services.map((obj, index) => {
                                const nome = handleNome(obj.NOME);
                                
                                return (<Link 
                                    className="link" 
                                    to= {`/orcamento/${
                                            obj.NOME.normalize("NFD")
                                            .replace(/[\u0300-\u036f]/g, "")
                                            .replace(" ", "-")
                                            .toLowerCase()}`}
                                    key={obj.ID}
                                    >
                                        <Service
                                            icon_code={servicos[nome].icon} 
                                            service={obj.NOME}
                                            withlink={false}
                                        />
                                    </Link>
                                    )
                            
                                
                            })
                        }
                            <Link className="link" to="/orcamento/orcamento-personalizado">
                                <Service
                                    key={services.length + 1}
                                    icon_code={servicos["orcamento_personalizado"].icon}
                                    service={"ORÇAMENTO PERSONALIZADO"}
                                    withlink={false}
                                    />
                            </Link>
                    </div>   
                </> : 
                <Loading/>
            }
        </div>
    )
}