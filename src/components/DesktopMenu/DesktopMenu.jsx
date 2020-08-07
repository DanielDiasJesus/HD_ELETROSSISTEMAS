import React, { useEffect, useState }from 'react';
import { Link } from 'react-router-dom';

import './DesktopMenu.scss';
import { faInstagram, faFacebookSquare, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DesktopMenu() {
    const [useScrollTop, setScrollTop] = useState(0);

    function controlMenu(){
        return useScrollTop >  100 ? {
            height : "4.4em"
        }: null;
    }

    function controlLogo(){
        return useScrollTop >  100 ? {
            maxWidth : "7em"
        }: null;
    }

    function controlSubMenu(ACTION){
        switch (ACTION){
            case "SERVICOS":
                return useScrollTop >=  600 && useScrollTop <=  2690 ? {
                    display : "none"
                }: null;
            case "CONTATOS":
                return useScrollTop >=  600 && useScrollTop <=  2690 ? {
                    display : "none"
                }: null;
            default: break;
        }
    }

    function executeScroll( coord){
        window.scrollTo(0, coord);
    }
    
    useEffect(()=>{
        const onScroll = event => {
            setScrollTop(event.target.documentElement.scrollTop);
          };
          window.addEventListener("scroll", onScroll);
          console.log(useScrollTop);
          return () => window.removeEventListener("scroll", onScroll);
        }, [useScrollTop]);

    return (
        <div className="topbar__desktop" style={controlMenu()}>
            <div className="topbar__desktop__logo" style={controlLogo()}>
                <img src={require('../../assets/img/HDE_LOGO_DESKTOP_BORDERED.png')} alt="logo2"></img>
            </div>
            <div className="topbar__desktop__menu">
                <ul>    
                    <li onClick={event => executeScroll(2690)}>
                        SOBRE A HD
                    </li>
                    <li onClick={event => executeScroll(600)}>
                        SERVIÇOS
                        <ul className='topbar__desktop__menu__submenu' style={controlSubMenu("SERVICOS")}>
                            <li onClick={event => event.stopPropagation()}>
                                ELÉTRICA
                            </li>
                            <li  onClick={event => event.stopPropagation()}>
                                PINTURA
                            </li>
                            <li  onClick={event => event.stopPropagation()}>
                                HIDRÁULICA
                            </li>
                            <li  onClick={event => event.stopPropagation()}>
                                SOLDAGEM
                            </li>
                            <li  onClick={event => event.stopPropagation()}>
                                ALVENARIA
                            </li>
                            <li  onClick={event => event.stopPropagation()}>
                                MARCENARIA
                            </li>
                            <li  onClick={event => event.stopPropagation()}>
                                CONSTRUÇÃO CIVÍL
                            </li>
                        </ul>
                    </li>
                
                    <li id="contato">
                        CONTATO
                        <ul className='topbar__desktop__menu__submenu' style={controlSubMenu("CONTATO")}>
                            <li onClick={event => event.stopPropagation()}>
                                CHAT-BOT
                            </li>
                            <li  onClick={event => event.stopPropagation()}>
                                JUNTE-SE A NÓS
                            </li>
                        </ul>
                    </li>
                    <li id="clientes">
                        CLIENTES
                    </li>
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