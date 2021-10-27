import React, {useState, useEffect} from 'react';
import Introduction from '../../containers/Introduction';
import Services from '../../containers/Services';
import About from '../../containers/About';
import Contato from '../../containers/Contact';
import Loading from '../../components/Loading';

import { HomeFetch} from '../../utils/safe_fetch';

export default function HomeRoute(){
    const [data, setData] = useState([]);
    
    useEffect(()=>{
        HomeFetch().then(result =>{
            setData(result);
        })
        .catch(error => {throw Error("[*][WEBSITE] ERRO AO ESTABELECER PRIMEIRA CONEXÃO!")})
    }, []);
    
    return(
        <>
            {
                data ? 
                <>
                    <Introduction />
                    <Services />
                    <About />
                    <Contato />
                </> :
                <Loading />
            }
        </>
    );
}