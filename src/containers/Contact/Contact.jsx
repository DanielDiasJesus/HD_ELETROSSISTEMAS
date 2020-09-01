import React, { useState }from 'react';
import './Contact.scss';

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
    
    // const [useStatus, setStatus] = useState("");

    function handleName(event){
        event.preventDefault();
        setName(event.target.value);        
    }
    function handleMail(event){
        event.preventDefault();
        setMail(event.target.value);
    }
    function handleNumber(event){
        event.preventDefault();
        setNumber(event.target.value);
    }
    function handleSubject(event){
        event.preventDefault();
        setSubject(event.target.value);
    }
    function handleContent(event){
        event.preventDefault();
        setContent(event.target.value);
    }
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
            setErrorContent("Insira um assunto válido!")
            return;
        }
        else
            setErrorContent("");
        setName(useName.replace(" ", "%20"));
        setSubject(useSubject.replace(" ", "%20"));
        setContent(useContent.replace(" ", "%20"));
        
        fetch(`https://hdeletrossistemasapi-com.umbler.net/sendemail?email=${useMail}&nome=${useName}&subject=${useSubject}&message=${useContent}`)
        .then(response => response.text())
        .then((data) => setStatus(data));
    }
    function validNumber(number){
        number = number.replace(" ", "");
        for(let x = 0; x < useNumber.length; x++)
            if(isNaN(number.charAt(x)))
                return false;

        if(number.length !== 11 )
            return false;
        return true;
    }
    function validName(name){
        const regex = /^(?=.*[@!#$%^&*()/\\])[@!#$%^&*()/\\a-zA-Z0-9]$/;
        if(regex.test(name))
            return false;
        if(name.length < 4)
            return false;
        return true;
    }
    function validMail(email){
        const usuario = email.substring(0, email.indexOf("@"));
        const dominio = email.substring(email.indexOf("@")+ 1, email.length);

        if(email.length < 1)
            return false;

        if ((usuario.length >=1) &&
            (dominio.length >=3) &&
            (usuario.search("@") === -1) &&
            (dominio.search("@") === -1) &&
            (usuario.search(" ") === -1) &&
            (dominio.search(" ") === -1) &&
            (dominio.search(".") !==-1) &&
            (dominio.indexOf(".") >=1)&&
            (dominio.lastIndexOf(".") < dominio.length - 1))
                return true;
        
        return false;
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
                        <a href="sendEmailtocontato@hdeletrossistemas.com" target="blank" rel="noopener noreferrer">contato@hdeletrossistemas.com</a>
                        <a href="sendEmailtosuporte@hdeletrossistemas.com" target="blank" rel="noopener noreferrer">suporte@hdeletrossistemas.com</a>
                    </div>
                    <div className="contact__main__info__item">
                        <h4>Dê um alô</h4>
                        <a href="?" target="blank" rel="noopener noreferrer">(19) 3224-4415</a>
                        <a href="?" target="blank" rel="noopener noreferrer">(19) 97417-3218</a>
                    </div>
                    <div className="contact__main__info__item">
                        <a href="https://www.instagram.com/hdeletrosistemas/?hl=pt-br" target="blank" rel="noopener noreferrer">
                            Deseja conversar com nosso atendente eletrônico?
                        </a>
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
                            onChange={event => handleName(event)} 
                            value={useName}></input>
                            <div className="contact__main__form__item_info">
                                <label>Nome completo</label>
                                <div className="contact__main__form__item__error">{errorName}</div>
                            </div>
                        </div>
                        <div className="contact__main__form__item">
                            <input 
                            type="email" 
                            placeholder="Ex: contato@hdeletrossistemas.com" 
                            onChange={event => handleMail(event)} 
                            value={useMail}></input>
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
                                onChange={event => handleNumber(event)}
                                value={useNumber}></input>
                            <div className="contact__main__form__item_info">
                                <label>Numero</label>
                                <div className="contact__main__form__item__error">{errorNumber}</div>
                            </div>
                        </div>
                        <div className="contact__main__form__item">
                            <input 
                            type="text" 
                            placeholder="Ex: Quero entrar para o time!" 
                            onChange={event => handleSubject(event)}
                            value={useSubject}></input>
                            <div className="contact__main__form__item_info">
                                <label>Assunto da mensagem</label>
                                <div className="contact__main__form__item__error">{errorSubject}</div>
                            </div>
                        </div>
                        <div className="contact__main__form__item">
                            <textarea 
                            rows="4" 
                            columns="10" 
                            onChange={event => handleContent(event)}
                            value={useContent}></textarea>
                            <div className="contact__main__form__item_info">
                                <label>Texto da mensagem</label>
                                <div className="contact__main__form__item__error">{errorContent}</div> 
                            </div>
                        </div>
                        <div className="contact__main__form__item">
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