import React, { useEffect, useState }from 'react';
import { Link } from 'react-router-dom';

import './DesktopMenu.scss';
import { faInstagram, faFacebookSquare, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DesktopMenu(props) {
    const [useScrollTop, setScrollTop] = useState(0);

    function controlMenu(props){
        return useScrollTop >  100 ? {
            height : "4em"
        }: null;
    }

    function controlLogo(){
        return useScrollTop >  100 ? {
            maxWidth : "6em"
        }: null;
    }

    function controlSubMenu(ACTION){
        switch (ACTION){
            case "SERVICOS":
                return useScrollTop >=  600 && useScrollTop <=  2685 ? {
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
        setTimeout(() =>{
            window.scrollTo(0, coord);
            console.log("SCROLLED");
        }, 10)
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
                <Link to="/">
                    <img src={require('../../assets/img/HDE_LOGO_DESKTOP_BORDERED.png')} alt="logo2"></img>
                </Link>
            </div>
            <div className="topbar__desktop__menu">
                <ul>    
                    <li>
                        <Link 
                            to="/" 
                            onClick={event => executeScroll(2680)}
                            className="link"
                        >
                            SOBRE A HD
                        </Link>
                    </li>
                        <li>
                            <Link
                                to="/"
                                onClick={event => executeScroll(600)}
                                className="link"
                            >
                                SERVIÇOS
                            </Link>
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
                            <Link
                                to="/"
                                onClick={event => executeScroll(0)}
                                className="link"
                            >
                                CONTATO
                            </Link>
                            <ul className='topbar__desktop__menu__submenu' style={controlSubMenu("CONTATO")}>
                                <li onClick={event => event.stopPropagation()}>
                                    CHAT-BOT
                                </li>
                                <li onClick={event => event.stopPropagation()}>
                                    JUNTE-SE A NÓS
                                </li>
                            </ul>
                        </li>                    
                        <li id="clientes">
                            <Link
                                to="/"
                                onClick={event => executeScroll(0)}
                                className="link"
                            >
                                CLIENTES
                            </Link>
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