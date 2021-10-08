function handleNome(nome){
    let nomeTemp = nome.toLowerCase();
    return nomeTemp.replace('ç', 'c')
    .replace('ã', 'a')
    .replace('é', 'e')
    .replace('ê', 'e')
    .replace('é', 'e')
    .replace('á', 'a')
    .replace('í', 'i')
    .replace('ó', 'o')
    .replace(' ', '_');
}

function validMail(email) {
    const usuario = email.substring(0, email.indexOf("@"));
    const dominio = email.substring(email.indexOf("@") + 1, email.length);

    if (email.length === 0)
        return true;

    if ((usuario.length >= 1) &&
        (dominio.length >= 3) &&
        (usuario.search("@") === -1) &&
        (dominio.search("@") === -1) &&
        (usuario.search(" ") === -1) &&
        (dominio.search(" ") === -1) &&
        (dominio.search(".") !== -1) &&
        (dominio.indexOf(".") >= 1) &&
        (dominio.lastIndexOf(".") < dominio.length - 1))
        return true;

    return false;
}
function validName(name) {
    const regex = /^[a-zA-Z\s]*$/;
    if (!regex.test(name))
        return false;
    
    if (name.length < 3 && name.length !== 0)
        return false;
    
    return true;
}
function validNumber(number) {
    if (number.length < 14 && number.length !== 0)
        return false;
    
    return true;
}
function validCep(cep) {
    if (cep.length < 9 && cep.length !== 0)
        return false;
    
    return true;
}
function validAddress(endereco) {
    if(endereco.length < 5 && endereco.length !== 0)
        return false;
    
    return true;
}
function validSubject(assunto){
    if(assunto.length < 3 && assunto.length !== 0)
        return false;
    return true;
}
function validContent(content){
    if(content.length < 10 && content.length !== 0)
        return false;
    return true;
}
module.exports = {
    validMail,
    validName,
    validNumber,
    validCep,
    validAddress,
    validSubject,
    validContent,
    handleNome
}