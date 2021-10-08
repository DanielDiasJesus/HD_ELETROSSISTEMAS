import React, { useEffect, useState }from 'react';
import { HashLink as Link } from 'react-router-hash-link';

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
            transform : "scale(.7)"
        }: null;
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
                {/* <ul>    
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
                                    CHAT-BOT (EM BREVE)
                                </li>
                                <li onClick={event => event.stopPropagation()}>
                                    JUNTE-SE A NÓS
                                </li>
                            </ul> 
                        </li>                    
                        <li>
                            <Link
                                to="/"
                                className="link"
                            >
                                CASES (EM BREVE)
                            </Link>
                        </li>
                </ul> */}
                <div className="topbar__desktop__menu__item">
                    <Link to="/#sobre">SOBRE A HD</Link>
                </div>
                <div className="topbar__desktop__menu__item">
                    <Link to="/#servicos">SERVIÇOS</Link>
                </div>
                <div className="topbar__desktop__menu__item"  style={controlLogo()}>
                    {/* <a href="#">SOBRE A HD</a> */}
                    <Link to="/#introduction"><img src={require('../../assets/img/HDE_LOGO_BLUE.svg')} alt="logo2"></img></Link>
                </div>
                <div className="topbar__desktop__menu__item">
                    <Link to="/#contato">CONTATO</Link>
                </div>
                <div className="topbar__desktop__menu__item">
                    <Link to="/cases" >CASES</Link>
                </div>
            </div>
        </div>
    );
}