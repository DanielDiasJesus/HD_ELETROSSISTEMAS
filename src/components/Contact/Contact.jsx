import React from 'react';
import './Contact.scss';

import { faInstagram, faFacebookSquare, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Contact(){
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
                        <h4>Nos dê um alô</h4>
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
                                    <FontAwesomeIcon icon={faInstagram} className="i" id="instagram" />
                                </div>
                            </a>
                            <a href="facebook" target="blank" rel="noopener noreferrer">
                                <div className="contact__main__info__item__social__item">
                                    <FontAwesomeIcon icon={faFacebookSquare} className="i" id="facebook" />
                                </div>
                            </a>
                            <a href="linkedin" target="blank" rel="noopener noreferrer">
                                <div className="contact__main__info__item__social__item" >
                                    <FontAwesomeIcon icon={faLinkedinIn} className="i" id="linkedin" />
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="contact__main__form">
                    <h4>Encaminhe-nos uma mensagem por este formulário</h4>
                    <form>
                        <div className="contact__main__form__item">
                            <input type="text" placeholder="Ex: Maria da Silva"></input>
                            <label>Nome completo</label>
                        </div>
                        <div className="contact__main__form__item">
                            <input type="email" placeholder="Ex: contato@hdeletrossistemas.com"></input>
                            <label>Email</label>
                        </div>
                        <div className="contact__main__form__item">
                            <input type="tel" id="phone" placeholder="Ex: (19) 3224-6116"></input>
                            <label>Numero</label>
                        </div>
                        <div className="contact__main__form__item">
                            <input type="text" placeholder="Ex: Quero entrar para o time!"></input>
                            <label>Assunto da mensagem</label>
                        </div>
                        <div className="contact__main__form__item">
                            <textarea rows="4" columns="10"></textarea>
                            <label>Texto da mensagem</label>                            
                        </div>
                        <div className="contact__main__form__item">
                            <button>Enviar</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="contact__bottombar">
                © Copyright 2020 All Rights Reserved
                <a href="https://www.linkedin.com/in/danieldiasjesus" target="blank" rel="noopener noreferrer">Made by Daniel Jesus</a>
            </div>
        </div>
    )
}