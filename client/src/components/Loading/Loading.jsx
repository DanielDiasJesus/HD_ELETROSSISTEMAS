import React from 'react';
import './Loading.scss';
export default function Loading(){
    return(
        <div className="loading">
            <div className="loaging__toll">
                <div className="loaging__toll__absolute">
                    <img src={require('../../assets/img/Tooloading_one.png')} alt="Loading..."/>
                    <img src={require('../../assets/img/Tooloading_two.png')} alt="Loading..."/>
                </div>
            </div>
            
            <h4>Carregando...</h4>
        </div>
    )
}