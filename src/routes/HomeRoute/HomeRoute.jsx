import React from 'react';
import Introduction from '../../containers/Introduction';
import Services from '../../containers/Services';
import About from '../../containers/About';
import Contato from '../../containers/Contact';
// import Clientes from '../../components/Clientea';
export default function HomeRoute(){
    return(
        <>
            <Introduction />
            <Services />
            <About />
            <Contato />
        </>
    );
}