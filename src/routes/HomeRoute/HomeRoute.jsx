import React from 'react';
import Introduction from '../../components/Introduction';
import Services from '../../components/Services';
import Sobre from '../../components/Sobre';
// import Contato from '../../components/Contato';
// import Clientes from '../../components/Clientea';

export default function HomeRoute(){
    return(
        <>
            <Introduction />
            <Services />
            <Sobre />
        </>
    );
}