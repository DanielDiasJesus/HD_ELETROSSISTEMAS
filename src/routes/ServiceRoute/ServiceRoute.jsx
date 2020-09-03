import React, { useEffect, useState } from 'react';
import './ServiceRoute.scss';

import{ 
    validMail,
    validName,
    validNumber   
} from '../../utils/verificasoes';

export default function ServiceRoute(){
    const [subServicos, setSubServicos] = useState([]);
    const [servico, setServico] = useState([]);
    const haveChange = false;

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [numero, setNumero] = useState("");
    const [endereco, setEndereco] = useState("");
    const [cep, setCep] = useState("");

    function handleName(event){
        event.preventDefault();
        setNome(event.target.value);
    }
    function handleEmail(event){
        event.preventDefault();
        setEmail(event.target.value)
    }
    function handleNumero(event){
        event.preventDefault();
        setNumero(event.target.value);
    }
    function handleEndereco(event){
        event.preventDefault();
        setEndereco(event.target.value);
    }

    useEffect(()=> window.scrollTo(0,0), [haveChange]);
    useEffect(()=>{
        const { pathname } = window.location;
        const param = pathname.split("/")[2];
        
        fetch(`https://hdeletrossistemasapi-com.umbler.net/subservicos?servico=${param.replace("-", " ")}`)
        .then(response => response.json())
        .then(data => setSubServicos(data));

        console.log("CARREGANDO SUBSERVICOS")
        
    }, [haveChange]);
    useEffect(()=>{
        const { pathname } = window.location;
        const param = pathname.split("/")[2];
        
        fetch(`https://hdeletrossistemasapi-com.umbler.net/servico?servico=${param.replace("-", " ")}`)
        .then(response => response.json())
        .then(data => setServico(data));

        console.log("CARREGANDO SERVICOS")
    }, [haveChange]);

    return(
        <div className="service__budget">
            {
                servico.length > 0 ?
                <>
                    <div className="service__budget__header">
                        <div className="service__budget__header__bg">
                            <img src={servico[0].image_code} alt="bgImage"/>
                        </div>
                        <div className="service__budget__header__content">
                            <h3>Bem vindo a ferramenta de orçamento da HD!</h3>
                            <h4>
                                Para fazer um orçamento, você só precisa escolher algum dos subitens do serviços
                                selecionados e ele será adicionado como um item do orçamento.
                            </h4>
                            <h4>
                                Não se preocupe com os preços ou quantidade, nós analisaremos o seu pedido e vamos
                                entrar em contato assim que possível!
                            </h4>
                            <h4>
                                Precisamos somente de algumas informações sobre você para que possamos filtrar os
                                seus requerimentos!
                            </h4>
                        </div>
                    </div>
                    <div className="service__budget__client">
                        <div className="service__budget__client__item">
                            <label>Seu nome</label>
                            <input type="text" onChange={event => handleName(event)}></input>
                        </div>
                        <div className="service__budget__client__item">
                            <label>Seu melhor email</label>
                            <input type="text" onChange={event => handleEmail(event)}></input>
                        </div>
                        <div className="service__budget__client__item">
                            <label>Seu melhor numero</label>
                            <input type="text" onChange={event => handleNumero(event)}></input>
                        </div>
                        <div className="service__budget__client__item">
                            <label>Seu endereço</label>
                            <input type="text" onChange={event => handleEndereco(event)}></input>
                        </div>
                        <div className="service__budget__client__item">
                            <label>Seu CEP</label>
                            <input type="text" onChange={event => setCep(event.target.value)}></input>
                        </div>
                        <h4>Fique tranquilo, suas informações estão seguras com a gente :)</h4>
                    </div>
                </> : 
                null
            }
        </div>
    )
}