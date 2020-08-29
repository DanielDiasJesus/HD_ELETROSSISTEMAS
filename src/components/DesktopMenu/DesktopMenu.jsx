import React, { useEffect, useState }from 'react';
import { Link } from 'react-router-dom';

import './DesktopMenu.scss';

export default function DesktopMenu(props) {
    const [useScrollTop, setScrollTop] = useState(0);

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
    function executeScroll(ref){
        setTimeout(() =>{
            window.scrollTo(0, ref);
        }, 10)
    }
    
    useEffect(()=>{
        const onScroll = event => {
            setScrollTop(event.target.documentElement.scrollTop);
          };
          window.addEventListener("scroll", onScroll);
          return () => window.removeEventListener("scroll", onScroll);
        }, [useScrollTop]);

    return (
        <div className="topbar__desktop" style={controlMenu(612)}>
            <div className="topbar__desktop__menu">
                <ul>    
                    <li>
                        <Link 
                            to="/" 
                            onClick={event => executeScroll(2110)}
                            className="link"
                        >
                            SOBRE A HD
                        </Link>
                    </li>
                        <li>
                            <Link
                                to="/"
                                onClick={event => executeScroll(610)}
                                className="link"
                            >
                                SERVIÇOS
                            </Link>
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
                                onClick={event => executeScroll(3370)}
                                className="link"
                            >
                                CONTATO
                            </Link>
                            <ul className='topbar__desktop__menu__submenu'>
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
        </div>
    );
}