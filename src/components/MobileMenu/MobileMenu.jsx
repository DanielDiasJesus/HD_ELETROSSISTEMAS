import React, { useState } from 'react';
import './MobileMenu.scss';

import { faBars } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MobileMenu(props) {
    let [toggleMenu, setToggleMenu] = useState(false);
    let [toggleSubMenu, setToggleSubMenu] = useState(false);

    function handleToggleMenu() {
        setToggleMenu(!toggleMenu);
    }

    function handleClickSubmenu() {
        setToggleSubMenu(!toggleSubMenu);
    }

    return (
        <div className="topbar__mobile">
            <div className="topbar__mobile__logo">
                <img src={require('../../assets/img/HDE LOGO_MOBILE.png')} alt="logo2"></img>
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
                        <p onClick={handleClickSubmenu}>SERVIÇOS</p>
                        <div className={`topbar__mobile__menu__submenu--${toggleSubMenu ? "show" : "hide"}`}>
                            <ul className="topbar__mobile__menu__submenu">
                                <li><p>ELÉTRICA</p></li>
                                <li><p>PINTURA</p></li>
                                <li><p>SOLDAGEM</p></li>
                                <li><p>CONSTRUÇÃO</p></li>
                                <li><p>DESTRUÇÃO</p></li>
                                <li><p>TESTING</p></li>
                            </ul>
                        </div>
                    </li>
                    <li id="contato">
                        <p>CONTATO</p>
                    </li>
                    <li id="clientes">
                        <p>CLIENTES</p>
                    </li>
                </ul>
            </div>
        </div>
    );
}