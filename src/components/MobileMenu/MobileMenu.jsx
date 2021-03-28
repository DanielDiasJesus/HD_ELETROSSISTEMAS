import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import './MobileMenu.scss';

export default function MobileMenu(props) {
    let [toggleMenu, setToggleMenu] = useState(false);
    let [menuServices, setMenuServices] = useState(false);
    let [menuContact, setMenuContacts] = useState(false);
    let [useScrollTop, setScrollTop] = useState(0);

    const handleToggleMenu = () => setToggleMenu(!toggleMenu);
    const handleMenuServices = () => setMenuServices(!menuServices);
    const handleMenuContacts = () =>setMenuContacts(!menuContact);

    useEffect(()=>{
        const onScroll = event => {
            setScrollTop(event.target.documentElement.scrollTop);
          };
          window.addEventListener("scroll", onScroll);
          return () => window.removeEventListener("scroll", onScroll);
        }, [useScrollTop]);

    function executeScroll(ref){
        setTimeout(() =>{
            window.scrollTo(0, ref);
        }, 10)
        if(toggleMenu)
            setToggleMenu(!toggleMenu);
    }
    
    return (
        <div className="topbar__mobile">
            <div className="topbar__mobile__logo">
                <a href="/#"><img src={require('../../assets/img/HDE_LOGO_BLUE.svg')} alt="logo2"></img></a>
            </div>
            <div className={`topbar__mobile__icon--${toggleMenu ? "spin" : "nips"}`}>
                <i className="fas fa-bars" onClick={handleToggleMenu}></i>
            </div>
            <div className={`topbar__mobile__blocktouch--${toggleMenu ? "lock" : "unlock"}`} onClick={handleToggleMenu} />
            <div className={`topbar__mobile__togglemenu--${toggleMenu ? "show" : "hide"}`}>
                <ul className="topbar__mobile__menu">
                    <a href="/#sobre" onClick={handleToggleMenu} >
                        <li><p>SOBRE A HD</p></li>
                    </a>                    
                    <li>
                        <p onClick={handleMenuServices}>
                            SERVIÇOS
                            <i className="fas fa-plus" id={`i--${menuServices ? "show" : "hide"}`}></i>
                        </p>                        
                        <div className={`topbar__mobile__menu__submenu--${menuServices ? "show" : "hide"}`}>
                            <ul className="topbar__mobile__menu__submenu">
                                <a href="/orcamento/elétrica" onClick={handleToggleMenu}>
                                    <li><p>ELÉTRICA</p></li>
                                </a>
                                <a href="/orcamento/pintura" onClick={handleToggleMenu}>
                                    <li><p>PINTURA</p></li>
                                </a>
                                <a href="/orcamento/hidráulica" onClick={handleToggleMenu}>
                                    <li><p>HIDRÁULICA</p></li>
                                </a>
                                <a href="/orcamento/acabamentos" onClick={handleToggleMenu}>
                                    <li><p>ACABAMENTOS</p></li>
                                </a>
                                <a href="/orcamento/construção-civil" onClick={handleToggleMenu}>
                                    <li><p>CONSTRUÇÃO CIVÍL</p></li>
                                </a>
                                <a href="/orcamento/orcamento-personalizado" onClick={handleToggleMenu}>
                                    <li><p>ORÇAMENTO PERSONALIZADO</p></li>
                                </a>
                            </ul>
                        </div>
                    </li>
                    <a href="/#contato" className="mobile__link" onClick={handleToggleMenu}>
                        <li>
                            <p>
                                CONTATO
                                {/* <i className="fas fa-plus" id={`i--${menuContact ? "show" : "hide"}`}></i> */}
                            </p>
                            {/* <div className={`topbar__mobile__menu__submenu--${menuContact ? "show" : "hide"}`}>
                                <ul className="topbar__mobile__menu__submenu">
                                    <li onClick={event => event.stopPropagation()}><p>CHAT-BOT (EM BREVE)</p></li>
                                    <li onClick={event => event.stopPropagation()}><p>JUNTE-SE A NÓS</p></li>
                                </ul>
                            </div> */}
                        </li>
                    </a>
                    <a href="/cases">
                        <li><p>CASES</p></li>
                    </a>  
                </ul>
            </div>
        </div>
    );
}