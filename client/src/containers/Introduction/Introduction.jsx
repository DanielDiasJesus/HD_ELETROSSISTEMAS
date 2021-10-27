import React from 'react';
import { Link } from 'react-router-dom';

import './Introduction.scss';

export default function Introduction() {
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
                    <Link to="#sobre" className="link">
                        <button className="saiba__mais" >SAIBA MAIS</button>
                    </Link>
                </div>
            </div>
            <div className="introduction__pretty">
                <img src={require("../../assets/img/INTRODUCTION_PRETTY.png")} alt=""/>
            </div>
        </div>
    )
}