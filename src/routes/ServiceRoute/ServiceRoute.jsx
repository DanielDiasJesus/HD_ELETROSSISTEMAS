import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './ServiceRoute.scss';
import Loading from '../../components/Loading';

import{ 
    validMail,
    validName,
    validNumber,   
    validCep
} from '../../utils/verificasoes';

export default function ServiceRoute(){
    const history = useHistory();
    
    const [subServicos, setSubServicos] = useState([]);
    const [servico, setServico] = useState([]);
    const [added, setAdded] = useState([]);
    
    const [succesBudget, setSuccesBudget] = useState(false);
    const [haveChange, setHaveChange] = useState(false);
    // const [callInInfo, setCallInInfo] = useState(false);

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [numero, setNumero] = useState("");
    const [endereco, setEndereco] = useState("");
    const [cep, setCep] = useState("");
    const [error, setError] = useState("");    
    const [status, setStatus] = useState("");
    
    const handleName = (nome) =>{
        // event.preventDefault();
        setNome(nome);
        if(!validName(nome)){
            setError("Insira um nome válido!");
            return;
        }   
        else
            setError("");
    }
    const handleEmail = (email) =>{
        setEmail(email)
        if(!validMail(email)){
            setError("Insira um endereço de e-mail válido!");
            return;
        }
        else
            setError("");
    }
    const handleNumero = (numero) =>{
        setNumero(numero);
        if(!validNumber(numero)){
            setError("Insira um numero de celular válido!");
            return;
        }
        else
            setError("");
    }
    const handleEndereco = (endereco) =>{
        setEndereco(endereco);
    }
    const handleCEP = (cep) =>{
        setCep(cep);
        if(!validCep(cep)){
            setError("Insira um CEP válido!");
            return;
        }
        else
            setError("");
    }
    
    // function handleItemInfo(event, index){
    //     event.preventDefault();
    //     const tempSub = subServicos[0];
    //     for(let x = 0; x < tempSub.length; x++){
    //         if(tempSub[x].id_site === index){
    //             tempSub[x].info = !tempSub[x].info;
    //             setCallInInfo(!callInInfo);
    //             break;    
    //         }
    //     }
    // }
    function handleItemClick(event, index){
        event.preventDefault();
        const tempSub = subServicos[0];
        for(let x = 0; x < tempSub.length; x++){
            if(tempSub[x].id_site === index){
                if(tempSub[x].added === false){
                    tempSub[x].added = true;
                    setAdded(added =>  added.concat(tempSub[x]));
                    event.target.id = 'remove';
                    break;
                }
                else{
                    tempSub[x].added = false;
                    setAdded(added.filter((obj) => obj.id_site !== tempSub[x].id_site));
                    event.target.id = 'add';
                    break;
                }
            }
        }
    }
    const getAtualDate = () =>{
        let dataAtual = new Date();
        let dia = dataAtual.getDate();
        let mes = dataAtual.getMonth() + 1;
        let ano = dataAtual.getFullYear();
        let hora = dataAtual.getHours();
        let minuto = dataAtual.getMinutes();

        return `${dia < 10 ? `0${dia}` : dia}${'/'}${mes < 10 ? `0${mes}` : `${mes}`}${'/'}${ano} - ${hora}:${minuto}h`;

    }
    const handleEnd = () =>{
        if(nome.length < 1){
            setError("Você acabou esquecendo de preencher o campo nome!")
            return
        }
        else if(email.length < 1){
            setError("Você acabou esquecendo de preencher o campo email!")
            return
        }
        else if(numero.length < 1){
            setError("Você acabou esquecendo de preencher o campo número!")
            return
        }
        else if(endereco.length < 1){
            setError("Você acabou esquecendo de preencher o campo endereço!")
            return
        }
        else if(cep.length < 1){
            setError("Você acabou esquecendo de preencher o campo CEP!")
            return
        }
        else
            setError("");

        const paramNome = nome.replace(" ", "%20");
        const paramNumero = numero.replace(" ", "");
        const paramEndereco = endereco.replace(" ", "%20");
        
        const orcamentoEssencial = added.map((element, index) =>{
            return {
                id : element.id,
                id_servico : element.id_servico
            }
        })
        const paramOrcamentoEssencial = JSON.stringify(orcamentoEssencial);
        
        fetch(`https://hdeletrossistemasapi-com.umbler.net/fazerOrcamento?nome=${paramNome}&email=${email}&numero=${paramNumero}&endereco=${paramEndereco}&cep=${cep}&orcamento=${paramOrcamentoEssencial}`)
        .then((response) => response.text())
        .then((data) => {
            if(data === "DONE"){
                setStatus("Orçamento aprovado! Enviando mensagens...");
                setTimeout(()=>{
                    fetch(`https://hdeletrossistemasapi-com.umbler.net/mensagemorcamento?nome=${paramNome}&email=${email}&numero=${paramNumero}&endereco=${paramEndereco}&cep=${cep}`)
                    .then(response => response.text())
                    .then((data) => {
                        setStatus(data)
                        setTimeout(()=>{
                            setSuccesBudget(true)
                        }, 1000)
                    });
                }, 1000);
            }
        });
    }

    useEffect(()=> window.scrollTo(0,0), [haveChange]);
    useEffect(()=>{
        const { pathname } = window.location;
        const param = pathname.split("/")[2];
        
        fetch(`https://hdeletrossistemasapi-com.umbler.net/subservicos?servico=${param.replace("-", " ")}`)
        .then(response => response.json())
        .then(data => setSubServicos(data))
        
    }, [haveChange]);
    
    useEffect(()=>{
        const { pathname } = window.location;
        const param = pathname.split("/")[2];

        fetch(`https://hdeletrossistemasapi-com.umbler.net/servico?servico=${param.replace("-", " ")}`)
        .then(response => response.json())
        .then(data => setServico(data));
        
        if(subServicos.length > 0){
            subServicos[0].map((subservico, index) => {
                subservico.id_site = index;
                subservico.added = false;
                subservico.info = false;
                return subservico;
            });
        }

    }, [haveChange, subServicos]);
    
    useEffect(()=>{
        return history.listen((location) => { 
            console.log(`You changed the page to: ${location.pathname}`);
            setHaveChange(!haveChange);
            setServico([]);
            setSubServicos([]);
            setAdded([]);
            
            setNome("");
            setEmail("");            
            setNumero("");
            setCep("");
            setEndereco("");
        }) 
      },[history, haveChange])
    
    return(
        <div className="service__budget">
            {
                servico.length > 0 &&
                subServicos.length > 0 ?
                // 1 === 0 ?
                <>
                    <div className="service__budget__header">
                        <div className="service__budget__header__bg">
                            <img src={servico[0].image_code} alt="bgImage"/>
                        </div>
                        <div className="service__budget__header__content">
                            {
                                !succesBudget ? 
                                <>
                                    <h3>Bem vindo a ferramenta de orçamento da HD!</h3>
                                    <h4>
                                        Para fazer um orçamento {
                                            servico[0].nome.toLowerCase() === 'orçamento personalizado' ? 'personalizado'
                                            :`de ${servico[0].nome.toLowerCase()}`}, 
                                        você só precisa escolher um ou mais subitens do serviço
                                        selecionado e ele será adicionado como um item do orçamento.
                                    </h4>
                                    <h4>
                                        Não se preocupe com os preços ou quantidade, nós analisaremos o seu pedido e vamos
                                        entrar em contato quanto antes possível!
                                    </h4>
                                </> : 
                                <>
                                    <h3>Orçamento realizado com sucesso!</h3>
                                    <h4>
                                        Obrigado por utilizar a nossa ferramenta para fazer um orçamento {
                                            servico[0].nome.toLowerCase() === 'orçamento personalizado' ? 'personalizado'
                                            :`de ${servico[0].nome.toLowerCase()}!`} 
                                    </h4>
                                    <h4>
                                        Nós enviamos uma mensagem para o seu endereço de email com a relação do seu pedido
                                        e assim que possível, nós retornaremos o contato com você.
                                        Abraços da HD!
                                    </h4>
                                    <h4>
                                        Lembrando que o periodo de atualização para fazer um novo orçamento é de um dia.
                                        Se fizer algum novo orçamento dentro deste período, ele será somado ao anterior
                                    </h4>
                                </>
                            }
                        </div>
                    </div>
                    {
                        !succesBudget ? 
                        <>
                            <div className="service__budget__client">
                            <h4>
                                    Precisamos de algumas informações sobre você para que possamos filtrar os
                                    seus requerimentos!
                            </h4>
                            <div className="service__budget__client__item__error">
                                <div className="service__budget__client__item__error">{error}</div>
                            </div>
                            <div className="service__budget__client__item">
                                <label>Seu nome completo</label>
                                <input type="text"
                                 placeholder="ex. Romilson de Oliveira"
                                 onChange={event => handleName(event.target.value)}></input>
                            </div>
                            <div className="service__budget__client__item">
                                <label>Seu e-mail</label>
                                <input type="text" 
                                placeholder="ex. contato@hdeletrossistemas.com"
                                onChange={event => handleEmail(event.target.value)}></input>
                            </div>
                            <div className="service__budget__client__item">
                                <label>Seu número</label>
                                <input type="text" 
                                placeholder="ex. 19 974173218" 
                                onChange={event => handleNumero(event.target.value)}></input>
                            </div>
                            <div className="service__budget__client__item">
                                <label>Seu endereço</label>
                                <input type="text" 
                                placeholder="ex. Rua Lourival de Almeida, 745, Campinas-SP" 
                                onChange={event => handleEndereco(event.target.value)}></input>
                            </div>
                            <div className="service__budget__client__item">
                                <label>Seu CEP</label>
                                <input type="text" 
                                placeholder="ex. 13054-774" 
                                onChange={event => handleCEP(event.target.value)}></input>
                            </div>
                            <div className="service__budget__client__item__error">
                                <div className="service__budget__client__item__error">{error}</div>
                            </div>
                            <h4>Fique tranquilo, suas informações estão seguras com a gente :)</h4>
                        </div>
                        <div className="service__budget__makeit">
                            <div className="service__budget__makeit__header">
                                <h4>
                                    Agora você só precisa escolher os itens que deseja adicionar
                                    ao orçamento.
                                </h4>
                            </div>
                            <div className="service__budget__makeit__subservices">
                                <div className="service__budget__makeit__subservices__header">
                                    <h2>SERVIÇOS DE {servico[0].nome.toUpperCase()}</h2>
                                </div>
                                <div className="service__budget__makeit__subservices__select">
                                    <div className="service__budget__makeit__subservices__select__header"/>    
                                    {
                                        subServicos[0].map((subservico, index) =>(
                                            <div className="service__budget__makeit__subservices__select__main" key={subservico.id}>
                                                <div className="service__budget__makeit__subservices__select__option">
                                                    <h3>{subservico.nome}</h3>
                                                    <div className="service__budget__makeit__subservices__select__buttons">
                                                        {/* <button className="option__info" onClick={event => handleItemInfo(event, index)}>
                                                            <i className="fas fa-info" id={subservico.info ? 'clicked' : 'dekcilc'}></i>
                                                        </button> */}
                                                        <button className="option__add" onClick={event => handleItemClick(event, index)}>
                                                            <i className="fas fa-plus" id={subservico.added ? 'spin': 'nips'}></i>
                                                        </button>
                                                    </div>
                                                </div>
                                                {
                                                    subservico.info ?
                                                        <div className="showinfo">
                                                            <h3>{subservico.descricao}</h3>
                                                        </div>
                                                    :
                                                    <div className="hideinfo"></div>
                                                }
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="service__budget__makeit__table">
                            {
                            added.length > 0 ?
                                <>
                                    <div className="service__budget__makeit__table__header">
                                        <h4>Ótimo! Agora você só precisa dar uma ultima checada na lista aqui em baixo, e assim que tiver certeza clique em confirmar</h4>
                                        {
                                            servico[0].nome.toLowerCase() !== 'orçamento personalizado' ?
                                            <h4>Caso não tenha encontrado o item que procurava, tente voltar na seção de serviços, 
                                                a opção de Orçamento Personalizado, lá você vai encontrar todas os nossos servicos</h4>
                                                : ""
                                        }
                                            <h4>Ah, e não esqueça de preencher suas informações sobre você lá em cima.</h4>
                                    </div>
                                    {
                                        
                                    }
                                    <div className="service__budget__makeit__table__main">
                                        <div className="service__budget__makeit__table__mainitem__id">
                                            <h3>CLIENTE: {nome.toUpperCase()}</h3>
                                        </div>
                                        <div className="service__budget__makeit__table__main__item">
                                            <h3>INDICE</h3>
                                            <h3>SERVIÇO</h3>
                                            <h3>DATA/HORA</h3>
                                        </div>
                                    {
                                        added.map((obj, index) =>(
                                            <div className="service__budget__makeit__table__main__item" key={index}>
                                                    <h3>{++index}</h3>
                                                    <h3>{obj.nome}</h3>
                                                    <h3>{getAtualDate()}</h3>
                                            </div>
                                        ))
                                    }
                                    </div>
                                    <div className="service__budget__makeit__final">
                                        <div className="service__budget__makeit__final__error">{error}</div>
                                            {
                                                status === "" ?
                                                    <button onClick={event => handleEnd()}>Finalizar</button>
                                                : <Loading/>
                                            }
                                    </div>
                                </>
                                : <div className="service__budget__makeit__table__header">
                                    {/* <h4>SELECIONE PELO MENOS UM ITEM</h4> */}
                                </div>
                            }
                            </div>
                        </div>
                        </> : null
                    }
                </> : <Loading/>
            }
        </div>
    )
}