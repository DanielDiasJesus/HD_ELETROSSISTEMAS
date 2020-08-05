import React, { useState } from 'react';
import './Introduction.css';

import BG from '../../assets/img/INTRO_BACKGROUND2.png';

export default function Introduction() {
    let [useMovement, setMovement] = useState([]);

    let introductionStyle = {
        backgroundImage: `url(${BG})`,
        backgroundPosition: `${useMovement[0] * (-10 / 1100)}px ${useMovement[1] * (-10 / 1100)}px`
    }

    let introductionContent = {
        marginLeft: `${useMovement[0] * (-10 / 2000)}px`,
        marginTop: `${useMovement[1] * (-10 / 2000)}px`
    }

    function handleMouseMove(e) {
        setMovement([e.nativeEvent.clientX, e.nativeEvent.clientY]);
    }

    return (
        <div className="introduction" onMouseMove={handleMouseMove} style={introductionStyle}>
            <div className="introduction__budget">
                <div className="introduction__budget__title" style={introductionContent}>
                    <h3>SOLUÇÕES DE MERCADO DE ALTO IMPACTO</h3>
                    <h3>CONSTRUÇÕES ESTRATÉGICAMENTE PROJETADAS</h3>
                </div>
                <div className="introuction__budget__call">
                    <button >FAÇA JÁ SEU ORÇAMENTO</button>
                </div>
            </div>
        </div>
    )
}