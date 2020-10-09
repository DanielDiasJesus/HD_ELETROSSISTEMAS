import React, { useState }from 'react';
import './Contact.scss';
import{ 
        validMail,
        validName,
        validNumber   
    } from '../../utils/verificasoes';
export default function Contact(){
    const [useName, setName] = useState("");
    const [useMail, setMail] = useState("");
    const [useNumber, setNumber] = useState("");
    const [useSubject, setSubject] = useState("");
    const [useContent, setContent] = useState("");
    const [error, setError] = useState("");
    const [useStatus, setStatus] = useState("");

    const handleName = (nome) =>setName(nome); 
    const handleMail = (email) => setMail(email);
    const handleNumber = (numero) => setNumber(numero);        
    const handleSubject = (subject) => setSubject(subject);
    const handleContent = (content) => setContent(content);
    
    function handleClick(event){
        event.preventDefault();

        if(!validName(useName))
            setError("Insira um nome válido!");
    
        else if(!validMail(useMail))
            setError("Insira um endereço de e-mail válido!");
    
        else if(!validNumber(useNumber))
            setError("Insira um numero de celular válido!");
    
        else if(useSubject.length < 5)
            setError("Insira um assunto válido!");
    
        else if(useContent.length < 5)
            setError("Insira uma mensagem válido!");
    
        else{
            setError("");
        
            const nome = useName.replace(" ", "%20");
            const assunto = useSubject.replace(" ", "%20");
            const mensagem = useContent.replace(" ", "%20");
            const numero = useNumber.replace(" ", "%20");

            fetch(`https://hdeletrossistemasapi-com.umbler.net/sendemail?email=${useMail}&nome=${nome}&number=${numero}&subject=${assunto}&message=${mensagem}`)
            .then(response => response.text())
            .then((data) => setStatus(data));
        }
    }
    return(
        <div className="contact">
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
                            placeholder="Seu nome completo (ex. Romilson de Oliveira)"
                            onChange={event => handleName(event.target.value)}/>
                        </div>
                        <div className="contact__main__form__item">
                            <input 
                            type="email" 
                            placeholder="Seu email (ex. contato@hdeletrossistemas.com)" 
                            onChange={event => handleMail(event.target.value)}/>
                        </div>
                        <div className="contact__main__form__item">
                            <input 
                                type="tel" 
                                id="phone" 
                                placeholder="Seu número (ex. 19 974173218)" 
                                onChange={event => handleNumber(event.target.value)}/>
                        </div>
                        <div className="contact__main__form__item">
                            <input 
                            type="text" 
                            placeholder="Assunto" 
                            onChange={event => handleSubject(event.target.value)}/>
                        </div>
                        <div className="contact__main__form__item">
                            <textarea 
                            rows="4" 
                            columns="10" 
                            placeholder="Menssagem"
                            onChange={event => handleContent(event.target.value)}/>
                        </div>
                        <div className="contact__main__form__item">
                            <div className="contact__main__form__item__status">{useStatus}</div>
                            <button onClick={event => handleClick(event)}>Enviar</button>
                            <div className="contact__main__form__item__error">{error}</div> 
                        </div>
                    </form>
                </div>
            </div>
            
        </div>
    )
}