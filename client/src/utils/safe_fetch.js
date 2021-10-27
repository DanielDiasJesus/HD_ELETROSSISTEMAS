const Login = () => {
    return fetch(`/api/login`, {
        method:"POST",
        headers:{ 'Content-Type': 'application/json' },
        body : JSON.stringify({
            user:process.env.REACT_APP_USER,
            email:process.env.REACT_APP_EMAIL,
            pass:process.env.REACT_APP_PASS
        })
    })
    .then(response =>{
        if(!response.ok){
            throw Error("Error while fetch services");
        }
        
        return response.json();
    })
    .then(data =>  { 
        localStorage.setItem("apiToken", data["token"]);
        return data 
    })
    .catch(err => {throw Error(err.message)});
}

const HomeFetch = () =>{
return Login().then( data => {
    if(data["login"]){
        return fetch(`/api/`, {
            method:"GET",
            credentials:"same-origin",
            headers:{
                'x-access-token' : localStorage.getItem("apiToken")
            }
        })
        .then(response =>{
            if(!response.ok){
                throw Error("Error while fetch services");
            }
            return response.json();
        })
        .then(data =>  {return data})
        .catch(err => {throw Error(err.message)});
    }
})
}
const ServicesFetch = () =>{
return Login().then( data => {
    if(data["login"]){
        return fetch(`/api/servicos/`, {
            method:"GET",
            credentials:"same-origin",
            headers:{
                'x-access-token' : localStorage.getItem("apiToken")
            }
        })
        .then(response =>{
            if(!response.ok){
                throw Error("Error while fetch services");
            }
            return response.json();
        })
        .then(data =>  {return data})
        .catch(err => {throw Error(err.message)});
    }
})
}
const ServicoFetch = (param) =>{
    return Login().then( data => {
        if(data["login"]){
            return fetch(`/api/servico?servico=${param.replace("-", " ")}`, {
                method:"GET",
                credentials:"same-origin",
                headers:{
                    'x-access-token' : localStorage.getItem("apiToken")
                }
            })
            .then(response => {
                if(!response.ok){
                    throw Error("Error while fetch services");
                }
                return response.json();
            })
            .then(data => { return data })
            .catch(err => console.log(err));
        }
    })
}

const SubServicosFetch = (param) =>{
    return Login().then( data =>{
        if(data["login"]){
            return fetch(`/api/subservico-servico?servico=${param.replace("-", " ")}`, {
                method:"GET",
                credentials:"same-origin",
                headers:{
                    'x-access-token' : localStorage.getItem("apiToken")
                }
            })
            .then(response => {
                if(!response.ok){
                    throw Error("Error while fetch services");
                }
                return response.json();
            })
            .then(data => { return data[0] })
            .catch(err => console.log(err));
        }
    })
}
const FazerOrcamento = (nome, email, numero, endereco, cep, orcamento) =>{
    return Login().then(data => {
        if(data["login"]){
            return fetch(`/api/fazerOrcamento?nome=${nome}&email=${email}&numero=${numero}&endereco=${endereco}&cep=${cep}&orcamento=${orcamento}`, {
                method:"GET",
                credentials:"same-origin",
                headers:{
                    'x-access-token' : localStorage.getItem("apiToken")
                }
            })
            .then((response) => response.text())
            .then( data => {return data} )
        }
    })
}
const EnviarMensagem = (nome, email, numero, endereco, cep) =>{
    return Login().then(data => {
        if(data["login"]){
            return fetch(`/api/mensagemorcamento?nome=${nome}&email=${email}&numero=${numero}&endereco=${endereco}&cep=${cep}`, {
                method:"GET",
                credentials:"same-origin",
                headers:{
                    'x-access-token' : localStorage.getItem("apiToken")
                }
            })
            .then((response) => response.text())
            .then( data => {return data} )
        }
    })
}
const ContatoFetch = (email, nome, numero, assunto, mensagem) => {
    return Login().then(data => {
        if(data["login"]){
            return fetch(`/api/sendemail?email=${email}&nome=${nome}&number=${numero}&subject=${assunto}&message=${mensagem}`, {
                method:"GET",
                credentials:"same-origin",
                headers:{
                    'x-access-token' : localStorage.getItem("apiToken")
                }
            })
            .then((response) => response.text())
            .then( data => {return data} )
        }
    })
}
module.exports = {
    HomeFetch,
    ServicesFetch,
    SubServicosFetch,
    ServicoFetch,
    FazerOrcamento,
    EnviarMensagem,
    ContatoFetch
}