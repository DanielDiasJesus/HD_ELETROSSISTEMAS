import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { mask, unMask } from 'remask';
import './ServiceRoute.scss';
import Loading from '../../components/Loading';

import NotFoundRoute from '../NotFoundRoute';

import servicos from '../../utils/res_images';

import{ 
    validMail,
    validName,
    validNumber,   
    validCep,
    validAddress,
    handleNome
} from '../../utils/verificasoes';

export default function ServiceRoute(){
    // const history = useHistory();
    
    const [subServicos, setSubServicos] = useState([]);
    const [servico, setServico] = useState([]);
    const [added, setAdded] = useState([]);
    
    const [personalizado, setPersonalizado] = useState(false);
    const [succesBudget, setSuccesBudget] = useState(false);
    const [haveChange] = useState(false);
    const [notFound, setNotFound] = useState(false);

    // const [callInInfo, setCallInInfo] = useState(false);

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [numero, setNumero] = useState("");
    const [endereco, setEndereco] = useState("");
    const [cep, setCep] = useState("");
    const [error, setError] = useState("");    
    const [status, setStatus] = useState("");

    //fetch servico
    useEffect(()=>{
        const { pathname } = window.location;
        const param = pathname.split("/")[2];
        
        if(param !== 'orcamento-personalizado'){

            fetch(`/api/servico?servico=${param.replace("-", " ")}`)
            .then((res) => {
                if(res.status === 404){
                    setNotFound(true);
                    console.log("ERRO " + res.status);
                    console.log("SERVICO " + param + " NÃO ENCONTRADO NA API");
                    throw Error(res.statusMessage);
                }
                setNotFound(false);
                
                return res.json();
            })
            .then((data) => setServico(data[0]))
            .catch(err => console.log(err));
        }
        else 
            setPersonalizado(true);
        
    }, [haveChange]);
    
    //fetch subservicos
    useEffect(()=>{
        const { pathname } = window.location;
        const param = pathname.split("/")[2];
        
            fetch(`/api/subservico-servico?servico=${param.replace("-", " ")}`)
            .then((res) => {
                if(res.status === 404){
                    setNotFound(true);
                    console.log("ERRO " + res.status);
                    console.log("SUBSERVICOS DE " + param + " NÃO ENCONTRADO NA API");
                    throw Error(res.json());
                }
                setNotFound(false);
                return res.json();
            })
            .then((data) => setSubServicos(data[0]))
            .catch(err => console.log("ERRO: " + err));

    }, [haveChange]);
    
    const handleName = event => setNome(event.target.value);
    useEffect(()=>{
        if(!validName(nome)){
            setError("Insira um nome válido!");
            return;
        }   
        else
            setError("");
    }, [nome])    
    
    const handleEmail = event => setEmail(event.target.value);
    useEffect(()=>{
        if(!validMail(email)){
            setError("Insira um endereço de e-mail válido!");
            return;
        }
        else
            setError("");
    }, [email])

    const handleNumero = event =>{
        const originalNumero = unMask(event.target.value);
        const maskedNumero = mask(originalNumero, ["(99) 9999-9999", "(99) 9 9999-9999"])
        
        setNumero(maskedNumero);
        
    }
    useEffect(()=>{
        if(!validNumber(numero)){
            setError("Insira um numero de celular válido!");
            return;
        }
        else
            setError("");
    }, [numero])
    const handleEndereco = event => setEndereco(event.target.value);
    useEffect(() =>{
        if(!validAddress(endereco)){
            setError("Insira um endereço válido!");
            return;
        }
        else
            setError("");
    }, [endereco])
    const handleCEP = event =>{
        const originalCEP = unMask(event.target.value);
        const maskedCEP = mask(originalCEP, ["99999-999"])
        
        setCep(maskedCEP);
    }
    useEffect(()=>{
        if(!validCep(cep)){
            setError("Insira um CEP válido!");
            return;
        }
        else
            setError("");
    }, [cep])
    
    const serviceLength = (service) =>{
        var key, count = 0;
        for(key in service) 
            if(service.hasOwnProperty(key)) 
                count++;
        return count;
    } 

    // function handleItemInfo(event, index){
    //     event.preventDefault();
    //     const tempSub = subServicos;
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
        
        const tempSub = subServicos;
        
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
    const handleEnd = event =>{
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
        else if(error !== "")
            return
        else
            setError("");

        const paramNome = nome.replace(" ", "%20");
        const paramNumero = numero.replace(" ", "");
        const paramEndereco = endereco.replace(" ", "%20");

        const orcamentoEssencial = added.map((element, index) =>{
            return {
                ID : element.ID,
                ID_SERVICO : element.ID_SERVICO
            }
        })
        const paramOrcamentoEssencial = JSON.stringify(orcamentoEssencial);
        
        fetch(`/api/fazerOrcamento?nome=${paramNome}&email=${email}&numero=${paramNumero}&endereco=${paramEndereco}&cep=${cep}&orcamento=${paramOrcamentoEssencial}`)
        .then((response) => response.text())
        .then((data) => {
            if(data === "DONE"){
                setStatus("Orçamento aprovado! Enviando mensagens...");
                setTimeout(()=>{
                    fetch(`/api/mensagemorcamento?nome=${paramNome}&email=${email}&numero=${paramNumero}&endereco=${paramEndereco}&cep=${cep}`)
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
        // console.log("SUBSERVICOS ", subServicos);
        // console.log("SUBSERVICOS ", subServicos.length);

        if(subServicos.length > 0){
            subServicos.map((subservico, index) => {
                subservico.id_site = index;
                subservico.added = false;
                subservico.info = false;
                return subservico;
            });
        }
    }, [subServicos])

    // useEffect(()=>{
    //     console.log("SERVICO ", servico);
    //     // console.log("SERVICO ", serviceLength(servico));
        
    // }, [servico])

    // useEffect(()=>{
    //     console.log("ADDED ", added);
    //     // console.log("SUBSERVICOS ", subServicos.length);
    // }, [added])

    // useEffect(()=>{
    //     return history.listen((location) => { 
    //         console.log(`You changed the page to: ${location.pathname}`);
    //         setHaveChange(!haveChange);
    //         setServico([]);
    //         setSubServicos([]);
    //         setAdded([]);
            
    //         setNome("");
    //         setEmail("");            
    //         setNumero("");
    //         setCep("");
    //         setEndereco("");
    //     }) 
    //   },[history, haveChange])
    
    return(
        <div className="service__budget">
            {
                !notFound ? 
                <>
                    {
                        subServicos.length > 0 ?
                        <>
                            <div className="service__budget__header">
                                <div className="service__budget__header__bg">
                                    {
					personalizado ?
                                            <img src={servicos["orcamento_personalizado"].banner} alt="bgImage"/>
                                        :serviceLength(servico) > 0 ?
                                            <img src={servicos[handleNome(servico.NOME)].banner} alt="bgImage"/>
                                        :<Loading />
                                    }
                                </div>
                                <div className="service__budget__header__content">
                                    {
                                        !succesBudget ? 
                                        <>
                                            <h3>Bem vindo a ferramenta de orçamento da HD!</h3>
                                            <h4>
                                                Para fazer um orçamento 
                                                {
                                                    personalizado ? ' personalizado'
                                                    : serviceLength(servico) > 0 ? `de ${servico.NOME.toLowerCase()}` : "..."
                                                }, 
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
                                                Obrigado por utilizar a nossa ferramenta para fazer um orçamento 
                                                {
                                                    personalizado ? 'personalizado'
                                                    : serviceLength(servico) > 0 ? `de ${servico.NOME.toLowerCase()}!` : "..."
                                                } 
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
                                        autoComplete="new-password"
                                        placeholder="ex. Romilson de Oliveira"
                                        value={nome}
                                        onChange={handleName}></input>
                                    </div>
                                    <div className="service__budget__client__item">
                                        <label>Seu e-mail</label>
                                        <input type="text" 
                                        autoComplete="new-password"
                                        placeholder="ex. contato@hdeletrossistemas.com"
                                        value={email}
                                        onChange={handleEmail}></input>
                                    </div>
                                    <div className="service__budget__client__item">
                                        <label>Seu número</label>
                                        <input type="tel" 
                                        autoComplete="new-password"
                                        placeholder="ex. (19) 9 97417-3218" 
                                        value={numero}
                                        onChange={handleNumero}></input>
                                    </div>
                                    <div className="service__budget__client__item">
                                        <label>Seu endereço</label>
                                        <input type="text" 
                                        autoComplete="new-password"
                                        placeholder="ex. Rua Lourival de Almeida, 745, Campinas-SP" 
                                        value={endereco}
                                        onChange={handleEndereco}></input>
                                    </div>
                                    <div className="service__budget__client__item">
                                        <label>Seu CEP</label>
                                        <input type="text"
                                        autoComplete="new-password" 
                                        placeholder="ex. 13053-614" 
                                        value={cep}
                                        onChange={handleCEP}></input>
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
                                            {
                                                !personalizado ? 
                                                    serviceLength(servico) > 0 ?
                                                        <h2>SERVIÇOS DE {servico.NOME.toUpperCase()}</h2>
                                                    : <h2>...</h2>
                                                : <h2>ORCAMENTO PERSONALIZADO</h2>
                                            }
                                        </div>
                                        <div className="service__budget__makeit__subservices__select">
                                            <div className="service__budget__makeit__subservices__select__header"/>    
                                            {
                                                subServicos.map((subservico, index) =>(
                                                    <div className="service__budget__makeit__subservices__select__main" key={subservico.ID}>
                                                        <div className="service__budget__makeit__subservices__select__option">
                                                            <h3>{subservico.NOME}</h3>
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
                                                                    <h3>{subservico.DESCRICAO}</h3>
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
                                                <h4>Ótimo! Agora você só precisa dar uma ultima checada na lista aqui em baixo, e assim que tiver certeza clique em confirmar.</h4>
                                                {
                                                    serviceLength(servico) > 0 &&
                                                        servico.NOME.toLowerCase() !== 'orçamento personalizado' ?
                                                            <h4>Caso não tenha encontrado o item que procurava, tente voltar na seção de serviços 
                                                                na opção de Orçamento Personalizado, lá você vai encontrar todas os nossos servicos</h4>
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
                                                            <h3>{obj.NOME}</h3>
                                                            <h3>{getAtualDate()}</h3>
                                                    </div>
                                                ))
                                            }
                                            </div>
                                            <div className="service__budget__makeit__final">
                                                <div className="service__budget__makeit__final__error">{error}</div>
                                                    {
                                                        status === "" ?
                                                            <button onClick={handleEnd}>Finalizar</button>
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
                        </> : <Loading />
                    }
                </> : <div  className="not__found__service">
                        <NotFoundRoute />
                      </div>
            }
                    
        </div>
    )
}
