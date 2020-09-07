function validMail(email) {
    const usuario = email.substring(0, email.indexOf("@"));
    const dominio = email.substring(email.indexOf("@") + 1, email.length);

    if (email.length < 1)
        return false;

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
    const regex = /[A-z][ ][A-z]/;
    if (regex.test(name))
        return true;
    if (name.length < 3)
        return false;
    return true;
}
function validNumber(number) {
    number = number.replace(" ", "");
    for (let x = 0; x < number.length; x++)
        if (isNaN(number.charAt(x)))
            return false;

    if (number.length !== 11)
        return false;
    return true;
}
function validCep(cep) {
    const regex = /^[0-9]{5}-[0-9]{3}$/;
    // console.log(cep.length);
    if (cep.length !== 9) {
        console.log("SAIU PELO TAMANHO");
        return false;
    }
    if (!regex.test(cep)) {
        console.log("SAIU PELO REGEX");
        console.log(cep)
        return false;
    }
    return true;
}

module.exports = {
    validMail,
    validName,
    validNumber,
    validCep
}