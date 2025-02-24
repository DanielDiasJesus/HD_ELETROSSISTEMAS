import React from 'react';
import './Maintenance.scss';

export default function Maintenance(){
    return(
        <div className="maintenance">
            <div className="maintenance__header">
                <h1>HDE</h1>
            </div>
                <h3>... em manutenção ...</h3>
            <div className="maintenance__message">
                <p>Nós da HD estamos trabalhando atualmente no nosso site.
                   Estamos fazendo de tudo para proporcionar a melhor experiência aos nossos colaboradores.
                   Fique despreocupado pois, em breve voltaremos :)
                </p>
            </div>
        </div>
    )
}
