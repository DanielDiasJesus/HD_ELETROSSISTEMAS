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
    const regex = /^(?=.*[@!#$%^&*()/\\])[@!#$%^&*()/\\a-zA-Z0-9]$/;
    if (regex.test(name))
        return false;
    if (name.length < 4)
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

module.exports = {
    validMail,
    validName,
    validNumber
}