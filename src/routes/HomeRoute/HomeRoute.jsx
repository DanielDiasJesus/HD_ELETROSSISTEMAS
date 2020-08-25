import React from 'react';
import Introduction from '../../components/Introduction';
import Services from '../../components/Services';
import About from '../../components/About';
import Contato from '../../components/Contact';
// import Clientes from '../../components/Clientea';

export default function HomeRoute(){
    return(
        <>
            <Introduction />
            <Services />
            <About />
            {/* <Contato /> */}
        </>
    );
}