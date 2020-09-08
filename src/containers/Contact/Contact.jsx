import React, { useState }from 'react';
import './Contact.scss';
import{ 
        validMail,
        validName,
        validNumber   
    } from '../../utils/verificasoes';
export default function Contact(){
    const [useName, setName] = useState("");
    const [errorName, setErrorName] = useState("");
    const [useMail, setMail] = useState("");
    const [errorMail, setErrorMail] = useState("");
    const [useNumber, setNumber] = useState("");
    const [errorNumber, setErrorNumber] = useState("");
    const [useSubject, setSubject] = useState("");
    const [errorSubject, setErrorSubject] = useState("");
    const [useContent, setContent] = useState("");
    const [errorContent, setErrorContent] = useState("");
    
    const [useStatus, setStatus] = useState("");

    const handleName = (nome) =>setName(nome); 
    const handleMail = (email) => setMail(email);
    const handleNumber = (numero) => setNumber(numero);        
    const handleSubject = (subject) => setSubject(subject);
    const handleContent = (content) => setContent(content);
    
    function handleClick(event){
        event.preventDefault();

        if(!validName(useName)){
            setErrorName("Insira um nome válido!");
            return;
        }   
        else
            setErrorName("");

        if(!validMail(useMail)){
            setErrorMail("Insira um endereço de e-mail válido!");
            return;
        }

        else
            setErrorMail("");
        
        if(!validNumber(useNumber)){
            setErrorNumber("Insira um numero de celular válido!");
            return;
        }
        else
            setErrorNumber("");
        
        if(useSubject.length < 5){
            setErrorSubject("Insira um assunto válido!")
            return;
        }
        else
            setErrorSubject("");
        
        if(useContent.length < 5){
            setErrorContent("Insira uma mensagem válido!")
            return;
        }
        else
            setErrorContent("");
        
        const nome = useName.replace(" ", "%20");
        const assunto = useSubject.replace(" ", "%20");
        const mensagem = useContent.replace(" ", "%20");
        
        fetch(`https://hdeletrossistemasapi-com.umbler.net/sendemail?email=${useMail}&nome=${nome}&subject=${assunto}&message=${mensagem}`)
        .then(response => response.text())
        .then((data) => setStatus(data));
    }
    return(
        <div className="contact">
            <div className = "contact__header">
                <div className = "contact__info__title__line"></div>
                <h3>ENTRE EM CONTATO</h3>
                <div className = "contact__info__title__line"></div>
            </div>
            <div className="contact__main">
                <div className="contact__main__info">
                    <h3>Como podemos te ajudar?</h3>
                    <div className="contact__main__info__item">
                        <h4>Envie-nos uma mensagem!</h4>
                        <a href="mailto:contato@hdeletrossistemas.com?subject=Contato" target="_blank" rel="noopener noreferrer" title="você precisa de um manipulador de email padrão nas versões desktop">contato@hdeletrossistemas.com</a>
                        <a href="mailto:rh@hdeletrossistemas.com?subject=RH" target="_blank" rel="noopener noreferrer" title="você precisa de um manipulador de email padrão nas versões desktop">rh@hdeletrossistemas.com</a>
                    </div>
                    <div className="contact__main__info__item">
                        <h4>Dê um alô</h4>
                        <a href="?" target="blank" rel="noopener noreferrer">(19) 3224-4415</a>
                        <a href="?" target="blank" rel="noopener noreferrer">(19) 97417-3218</a>
                    </div>
                    <div className="contact__main__info__item">
                        {/* <a href="https://www.instagram.com/hdeletrosistemas/?hl=pt-br" target="blank" rel="noopener noreferrer">
                            Deseja conversar com nosso atendente eletrônico?
                        </a> */}
                    </div>
                    <div className="contact__main__info__item">
                        <h4>Acompanhe nosso trabalho nas redes sociais:</h4>
                        <div className="contact__main__info__item__social">
                            <a href="https://www.instagram.com/hdeletrosistemas/?hl=pt-br" target="blank" rel="noopener noreferrer">
                                <div className="contact__main__info__item__social__item">
                                    <i className="fab fa-instagram"></i>
                                </div>
                            </a>
                            <a href="facebook" target="blank" rel="noopener noreferrer">
                                <div className="contact__main__info__item__social__item">
                                    <i className="fab fa-facebook-square"></i>
                                </div>
                            </a>
                            <a href="linkedin" target="blank" rel="noopener noreferrer">
                                <div className="contact__main__info__item__social__item" >
                                    <i className="fab fa-linkedin-in"></i>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="contact__main__form">
                    <h4>Encaminhe-nos uma mensagem por este formulário</h4>
                    <form>
                        <div className="contact__main__form__item">
                            <input 
                            type="text" 
                            placeholder="Ex: Maria da Silva"
                            onChange={event => handleName(event.target.value)}/>
                            <div className="contact__main__form__item_info">
                                <label>Nome completo</label>
                                <div className="contact__main__form__item__error">{errorName}</div>
                            </div>
                        </div>
                        <div className="contact__main__form__item">
                            <input 
                            type="email" 
                            placeholder="Ex: contato@hdeletrossistemas.com" 
                            onChange={event => handleMail(event.target.value)}/>
                            <div className="contact__main__form__item_info">
                                <label>Email</label>
                                <div className="contact__main__form__item__error">{errorMail}</div>
                            </div>
                        </div>
                        <div className="contact__main__form__item">
                            <input 
                                type="tel" 
                                id="phone" 
                                placeholder="Ex: 19 974173218" 
                                onChange={event => handleNumber(event.target.value)}/>
                            <div className="contact__main__form__item_info">
                                <label>Numero</label>
                                <div className="contact__main__form__item__error">{errorNumber}</div>
                            </div>
                        </div>
                        <div className="contact__main__form__item">
                            <input 
                            type="text" 
                            placeholder="Ex: Quero entrar para o time!" 
                            onChange={event => handleSubject(event.target.value)}/>
                            <div className="contact__main__form__item_info">
                                <label>Assunto da mensagem</label>
                                <div className="contact__main__form__item__error">{errorSubject}</div>
                            </div>
                        </div>
                        <div className="contact__main__form__item">
                            <textarea 
                            rows="4" 
                            columns="10" 
                            onChange={event => handleContent(event.target.value)}/>
                            <div className="contact__main__form__item_info">
                                <label>Texto da mensagem</label>
                                <div className="contact__main__form__item__error">{errorContent}</div> 
                            </div>
                        </div>
                        <div className="contact__main__form__item">
                            <div className="contact__main__form__item__error">{useStatus}</div> 
                            <button onClick={event => handleClick(event)}>Enviar</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="contact__bottombar">
                <p>© Copyright 2020 All Rights Reserved</p>
                <a href="https://www.linkedin.com/in/danieldiasjesus" target="blank" rel="noopener noreferrer">Made by Daniel Jesus</a>
            </div>
        </div>
    )
}