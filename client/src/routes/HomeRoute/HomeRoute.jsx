import React, {useState, useEffect} from 'react';
import Introduction from '../../containers/Introduction';
import Services from '../../containers/Services';
import About from '../../containers/About';
import Contato from '../../containers/Contact';
// import Clientes from '../../components/Clientea';
import Loading from '../../components/Loading';
export default function HomeRoute(){
    const [data, setdata] = useState([]);
    
    useEffect(()=>{
        fetch("/api/")
        .then(response =>{
            if(!response.ok){
                throw Error("Error while fetch services");
            }
            return response.json();
        })
        .then(data =>  {setdata(data)})
        .catch(err => {throw Error(err.message)});
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