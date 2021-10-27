import React, { useEffect, useState }from 'react';
import './Contact.scss';
import { mask, unMask } from 'remask';

import { ContatoFetch } from '../../utils/safe_fetch';

import{ 
        validMail,
        validName,
        validNumber,
        validSubject,
        validContent
    } from '../../utils/verificasoes';
export default function Contact(){
    const [nome, setName] = useState("");
    const [email, setMail] = useState("");
    const [numero, setNumber] = useState("");
    const [assunto, setSubject] = useState("");
    const [conteudo, setContent] = useState("");
    const [error, setError] = useState("");
    const [status, setStatus] = useState("");

    const handleName = event => setName(event.target.value); 
    useEffect(()=>{
        if(!validName(nome))
            setError("Insira um nome válido!");
        else
            setError("");
    }, [nome])

    const handleMail = event => setMail(event.target.value);
    useEffect(()=>{
        if(!validMail(email))
            setError("Insira um endereço de e-mail válido!");
        else
            setError("");
    }, [email])

    const handleNumber = event => {
        const originalNumero = unMask(event.target.value);
        const maskedNumero = mask(originalNumero, ["(99) 9999-9999", "(99) 9 9999-9999"])
        setNumber(maskedNumero);
    }
    useEffect(()=>{
        if(!validNumber(numero))
            setError("Insira um numero de celular válido!");
        else 
            setError("");
    }, [numero])
    
    const handleSubject = event => setSubject(event.target.value);
    useEffect(() =>{
        if(!validSubject(assunto))
            setError("O assunto deve ter no minimo 3 caracteres!");
        else 
            setError("");
    }, [assunto])

    const handleContent = event => setContent(event.target.value);
    useEffect(() =>{
        if(!validContent(conteudo))
            setError("Sua mensagem deve ter no minimo 10 caracteres!");
        else 
            setError("");
    }, [conteudo])

    const handleEnd = () => {

        if(nome.length < 1){
            setError("Preencha o campo Nome");
            return;
        }
    
        else if(email.length < 1){
            setError("Preencha o campo E-mail");
            return
        }
    
        else if(numero.length < 1){
            setError("Preencha o campo Numero");
            return;
        }
    
        else if(assunto.length < 1){
            setError("Preencha o campo Assunto");
            return;   
        }
    
        else if(conteudo.length < 1){
            setError("Preencha o campo Conteudo");
            return;
        }
        else if(error !== "")
            return;
        
        else
            setError("");
        
        const nomeOriginal = nome.replace(" ", "%20");
        const assuntoOriginal = assunto.replace(" ", "%20");
        const mensagemOriginal = conteudo.replace(" ", "%20");
        const numeroOriginal = numero.replace(" ", "%20");

        ContatoFetch( 
            email,
            nomeOriginal,
            numeroOriginal,
            assuntoOriginal,
            mensagemOriginal
         ).then(data => {
            setStatus(data)
        })
    }
    return(
        <div className="contact" id="#contato">
            <div className="contact__main">
                <div className="contact__main__info">
                    <div className = "contact__info__header"><h3>ENTRE EM CONTATO</h3></div>
                    <div className="contact__main__info__item">
                        <h4>Envie-nos uma mensagem!</h4>
                        <a href="mailto:contato@hdeletrossistemas.com?subject=Contato" target="_blank" rel="noopener noreferrer" title="você precisa de um manipulador de email padrão nas versões desktop">contato@hdeletrossistemas.com</a>
                        {/* <a href="mailto:rh@hdeletrossistemas.com?subject=RH" target="_blank" rel="noopener noreferrer" title="você precisa de um manipulador de email padrão nas versões desktop">rh@hdeletrossistemas.com</a> */}
                    </div>
                    <div className="contact__main__info__item">
                        <h4>Dê um alô</h4>
                        <a href="tel: 19 3224-4415" target="blank" rel="noopener noreferrer">(19) 3224-4415</a>
                        <a href="tel: 19 97417-3218" target="blank" rel="noopener noreferrer">(19) 97417-3218</a>
                    </div>
                    <div className="contact__main__info__item">
                        {/* <a href="https://www.instagram.com/hdeletrosistemas/?hl=pt-br" target="blank" rel="noopener noreferrer">
                            Deseja conversar com nosso atendente eletrônico?
                        </a> */}
                    </div>
                    <div className="contact__main__info__item">
                        <h4>Acompanhe nosso trabalho nas redes sociais:</h4>
                        <div className="contact__main__info__item__social">
                            <a href="https://www.instagram.com/hdeletrossistemas/" target="blank" rel="noopener noreferrer">
                                <div className="contact__main__info__item__social__item">
                                    <i className="fab fa-instagram"></i>
                                </div>
                            </a>
                            <a href="https://www.facebook.com/hdeletrossistemas" target="blank" rel="noopener noreferrer">
                                <div className="contact__main__info__item__social__item">
                                    <i className="fab fa-facebook-square"></i>
                                </div>
                            </a>
                            {/* <a href="linkedin" target="blank" rel="noopener noreferrer">
                                <div className="contact__main__info__item__social__item" >
                                    <i className="fab fa-linkedin-in"></i>
                                </div>
                            </a> */}
                        </div>
                    </div>
                </div>
                <div className="contact__main__form">
                    <div className = "contact__form__header"><h3>ENCAMINHE UMA MENSAGEM</h3></div>
                    <form>
                        <div className="contact__main__form__item">
                            <input 
                            type="text" 
                            autoComplete="new-password"
                            value={nome}
                            placeholder="Seu nome completo (ex. Romilson de Oliveira)"
                            onChange={handleName}/>
                        </div>
                        <div className="contact__main__form__item">
                            <input 
                            type="email"
                            autoComplete="new-password"
                            value={email}
                            placeholder="Seu email (ex. contato@hdeletrossistemas.com)" 
                            onChange={handleMail}/>
                        </div>
                        <div className="contact__main__form__item">
                            <input 
                                type="tel" 
                                autoComplete="new-password"
                                value={numero}
                                placeholder="Seu número (ex. (19) 9 74173218)" 
                                onChange={handleNumber}/>
                        </div>
                        <div className="contact__main__form__item">
                            <input 
                            type="text" 
                            placeholder="Assunto"
                            autoComplete="new-password"
                            value={assunto}
                            onChange={handleSubject}/>
                        </div>
                        <div className="contact__main__form__item">
                            <textarea 
                            rows="4" 
                            columns="10" 
                            placeholder="Menssagem"
                            onChange={handleContent}/>
                        </div>
                        <div className="contact__main__form__item">
                            <div className="contact__main__form__item__status">{status}</div>
                            <button onClick={handleEnd}>Enviar</button>
                            <div className="contact__main__form__item__error">{error}</div> 
                        </div>
                    </form>
                </div>
            </div>
            
        </div>
    )
}