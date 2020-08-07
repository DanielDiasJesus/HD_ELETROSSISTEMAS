import React, { useState } from 'react';
import './MobileMenu.scss';

import { faBars, faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MobileMenu(props) {
    let [toggleMenu, setToggleMenu] = useState(false);
    let [menuServices, setMenuServices] = useState(false);
    let [menuContact, setMenuContacts] = useState(false);

    function handleToggleMenu() {
        setToggleMenu(!toggleMenu);
    }

    function handleMenuServices() {
        setMenuServices(!menuServices);
    }
    function handleMenuContacts() {
        setMenuContacts(!menuContact);
    }

    return (
        <div className="topbar__mobile">
            <div className="topbar__mobile__logo">
                <img src={require('../../assets/img/HDE_LOGO_DESKTOP.png')} alt="logo2"></img>
            </div>
            <div className={`topbar__mobile__icon--${toggleMenu ? "spin" : "nips"}`}>
                <FontAwesomeIcon icon={faBars} className="i" onClick={handleToggleMenu} />
            </div>
            <div className={`topbar__mobile__blocktouch--${toggleMenu ? "lock" : "unlock"}`} onClick={handleToggleMenu} />
            <div className={`topbar__mobile__togglemenu--${toggleMenu ? "show" : "hide"}`}>
                <ul className="topbar__mobile__menu">
                    <li>
                        <p>SOBRE A HD</p>
                    </li>
                    <li>
                        <p onClick={handleMenuServices}>
                            SERVIÇOS
                            <FontAwesomeIcon icon={faPlus} className={`i--${menuServices ? "show" : "hide"}`} />
                        </p>                        
                        <div className={`topbar__mobile__menu__submenu--${menuServices ? "show" : "hide"}`}>
                            <ul className="topbar__mobile__menu__submenu">
                                <li><p>ELÉTRICA</p></li>
                                <li><p>PINTURA</p></li>
                                <li><p>HIDRÁULICA</p></li>
                                <li><p>SOLDAGEM</p></li>
                                <li><p>ALVENARIA</p></li>
                                <li><p>MARCENARIA</p></li>
                                <li><p>CONSTRUÇÃO CIVÍL</p></li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <p onClick={handleMenuContacts}>
                            CONTATO
                            <FontAwesomeIcon icon={faPlus} className={`i--${menuContact ? "show" : "hide"}`} />
                        </p>
                        <div className={`topbar__mobile__menu__submenu--${menuContact ? "show" : "hide"}`}>
                            <ul className="topbar__mobile__menu__submenu">
                                <li><p>CHAT-BOT</p></li>
                                <li><p>JUNTE-SE A NÓS</p></li>
                            </ul>
                        </div>
                    </li>
                    <li id="clientes">
                        <p>CLIENTES</p>
                    </li>
                </ul>
            </div>
        </div>
    );
}