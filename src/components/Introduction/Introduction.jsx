import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Introduction.scss';

import BG from '../../assets/img/INTRODUCTION_BG_INVERSE.png';

export default function Introduction() {
    let [useMovement, setMovement] = useState([]);
    const [useScrollTop, setScrollTop] = useState(0);
    // let introductionStyle = {
    //     backgroundImage: `url(${BG})`,
    //     backgroundPosition: `${useMovement[0] * (-10 / 1100)}px ${useMovement[1] * (-10 / 1100)}px`
    // }

    let introductionContent = {
        // marginLeft: `${useMovement[0] * (-10 / 1000)}px`,
        // marginTop: `${useMovement[1] * (-10 / 1000)}px`
    }

    function handleMouseMove(e) {
        setMovement([e.nativeEvent.clientX, e.nativeEvent.clientY]);
    }
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
        <div className="introduction" onMouseMove={handleMouseMove} style = {{backgroundImage: `url(${BG})`}}>
            <div className="introduction__budget">
                <div className="introduction__budget__title" style={introductionContent}>
                    <h3>SOLUÇÕES DE MERCADO DE ALTO IMPACTO</h3>
                    <h3>CONSTRUÇÕES ESTRATÉGICAMENTE PROJETADAS</h3>
                    <h4>Fazer um orçamento nunca foi tão fácil</h4>
                </div>
                <div className="introuction__budget__call">
                    <Link to="/orcamento" className="link">
                        <button className="fazer__orcamento">FAZER ORÇAMENTO</button>        
                    </Link>
                        <button className="saiba__mais" onClick={event => executeScroll(2500)}>SAIBA MAIS</button>
                </div>
            </div>
            <div className="introduction__pretty">
                <img src={require("../../assets/img/INTRODUCTION_PRETTY_COLORFULL.png")} alt=""/>
            </div>
        </div>
    )
}