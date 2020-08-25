import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Introduction.scss';

export default function Introduction() {
    const [useScrollTop, setScrollTop] = useState(0);
    const executeScroll = (coord) => window.scrollTo(0, coord);
    
    useEffect(()=>{
        const onScroll = event => {
            setScrollTop(event.target.documentElement.scrollTop);
          };
          window.addEventListener("scroll", onScroll);
          console.log(useScrollTop);
          return () => window.removeEventListener("scroll", onScroll);
        }, [useScrollTop]);


    return (
        <div className="introduction">
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
                        <button className="saiba__mais" onClick={event => executeScroll(2450)}>SAIBA MAIS</button>
                </div>
            </div>
            <div className="introduction__pretty">
                <img src={require("../../assets/img/INTRODUCTION_PRETTY_COLORFULL.png")} alt=""/>
            </div>
        </div>
    )
}