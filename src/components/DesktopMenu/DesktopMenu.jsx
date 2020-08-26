import React, { useEffect, useState }from 'react';
import { Link } from 'react-router-dom';

import './DesktopMenu.scss';
import servicos from '../../data/servicos.json';

export default function DesktopMenu(props) {
    const [useScrollTop, setScrollTop] = useState(0);
    const [useServices] = useState(servicos.services);

    function controlMenu(){
        return useScrollTop >  80 ? {
            height : "3.5em"
        }: null;
    }

    function controlLogo(){
        return useScrollTop >  80 ? {
            maxWidth : "3.8em"
        }: null;
    }
    
    function controlSubMenu(ACTION){
        switch (ACTION){
            case "SERVICOS":
                return useScrollTop >=  600 && useScrollTop <=  2550 ? {
                    display : "none"
                }: null;
            case "CONTATO":
                return useScrollTop >= 4259 ? {
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
            <div className="topbar__desktop__menu">
                <ul>    
                    <li>
                        <Link 
                            to="/" 
                            onClick={event => executeScroll(2640)}
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
                                {useServices.map((obj, index) =>(
                                    <li onClick = {event => event.stopPropagation()} key={index}>
                                        {obj.servico}
                                    </li>
                                ))}
                            </ul>
                        </li>
                        <li id="logo">
                            <div className="topbar__desktop__logo" style={controlLogo()}>
                                <Link to="/" onClick={event => executeScroll(0)}>
                                    <img src={require('../../assets/img/HDE_LOGO_BLUE.svg')} alt="logo2"></img>
                                </Link>
                            </div>
                        </li>                 
                        <li id="contato">
                            <Link
                                to="/"
                                onClick={event => executeScroll(4259)}
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
                        <li>
                            <Link
                                to="/"
                                onClick={event => executeScroll(0)}
                                className="link"
                            >
                                CASES
                            </Link>
                        </li>
                </ul>
            </div>
            {/* <div className="topbar__social">
                <a href="https://www.instagram.com/hdeletrosistemas/?hl=pt-br" target="blank" rel="noopener noreferrer">
                    <div className="topbar__social__item">
                        <FontAwesomeIcon icon={faInstagram} className="i" />
                    </div>
                </a>
                <a href="facebook" target="blank" rel="noopener noreferrer">
                    <div className="topbar__social__item">
                        <FontAwesomeIcon icon={faFacebookSquare} className="i" />
                    </div>
                </a>
                <a href="linkedin" target="blank" rel="noopener noreferrer">
                    <div className="topbar__social__item" >
                        <FontAwesomeIcon icon={faLinkedinIn} className="i" />
                    </div>
                </a>
            </div> */}
        </div>
    );
}