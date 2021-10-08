import React from 'react';

import './NotFoundRoute.scss';

export default function NotFoundRoute(props){
    return (
        <div className="not__found">
            <div className="not__found__header">
                <h1>404</h1>
                <h3>Página não encontrada</h3>
            </div>
            <div className="not__found__message">
                <p>A página que você estava procurando não foi encontrada! 
                    Pode ter sido removida, renomeada ou não exite</p>
            </div>
        </div>
    )
}