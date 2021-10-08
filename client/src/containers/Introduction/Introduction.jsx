import React from 'react';
import { Link } from 'react-router-dom';

import './Introduction.scss';

export default function Introduction() {
    const executeScroll = (coord) => window.scrollTo(0, 2110);
    
    return (
        <div className="introduction" id="#introduction">
            <div className="introduction__budget">
                <div className="introduction__budget__title">
                    <h3>soluções de mercado de alto impacto</h3>
                    <h3>construções estratégicamente projetadas</h3>
                    <h4>fazer um orçamento nunca foi tão fácil...</h4>
                </div>
                <div className="introuction__budget__call">
                    <Link to="/orcamento" className="link">
                        <button className="fazer__orcamento">FAZER ORÇAMENTO</button>        
                    </Link>
                        <button className="saiba__mais" onClick={event => executeScroll()}>SAIBA MAIS</button>
                </div>
            </div>
            <div className="introduction__pretty">
                <img src={require("../../assets/img/INTRODUCTION_PRETTY.png")} alt=""/>
            </div>
        </div>
    )
}