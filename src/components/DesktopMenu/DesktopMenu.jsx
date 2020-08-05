import React from 'react'

import './DesktopMenu.css'
import { faInstagram, faFacebookSquare, faLinkedinIn } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DesktopMenu() {
    return (
        <div className="topbar__desktop">
            <div className="topbar__desktop__logo">
                <img src={require('../../assets/img/HDE LOGO_DESKTOP.png')} alt="logo2"></img>
            </div>
            <div className="topbar__desktop__menu">
                <ul>
                    <a href="#SOBRE">
                        <li>
                            SOBRE A HD
                        </li>
                    </a>
                    <a href="#SERVICOS">
                        <li>
                            SERVIÇOS
                            <ul className='topbar__desktop__menu__submenu'>
                                <li>ELÉTRICA</li>
                                <li>PINTURA</li>
                                <li>HIDRÁULICA</li>
                                <li>SOLDAGEM</li>
                                <li>ALVENARIA</li>
                                <li>MARCENARIA</li>
                                <li>CONSTRUÇÃO CIVÍL</li>
                            </ul>
                        </li>
                    </a>
                    <a href="#CONTATO">    
                        <li id="contato">
                            CONTATO
                        </li>
                    </a>
                    <a href="#CLIENTES">
                        <li id="clientes">
                            CLIENTES
                        </li>
                    </a>
                </ul>
            </div>
            <div className="topbar__social">
                <a href="https://www.instagram.com/hdeletrosistemas/?hl=pt-br" target="blank" rel="noopener noreferrer">
                    <div className="topbar__social__item">
                        <FontAwesomeIcon icon={faInstagram} className="i" id="instagram" />
                    </div>
                </a>
                <a href="facebook" target="blank" rel="noopener noreferrer">
                    <div className="topbar__social__item">
                        <FontAwesomeIcon icon={faFacebookSquare} className="i" id="facebook" />
                    </div>
                </a>
                <a href="linkedin" target="blank" rel="noopener noreferrer">
                    <div className="topbar__social__item" >
                        <FontAwesomeIcon icon={faLinkedinIn} className="i" id="linkedin" />
                    </div>
                </a>
            </div>
        </div>
    );
}