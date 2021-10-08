const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
let carteiro = nodemailer.createTransport({
    service: 'Zoho',
    host: 'smtp.zoho.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'suporte@hdeletrossistemas.com',
        pass: 'eWTgdydNsyF5'
    }
});

carteiro.use('compile', hbs({
    viewEngine: {
        extname: '.handlebars',
        layoutsDir: './templates/',
        defaultLayout: '',
        partialsDir: './templates/',
    },
    viewPath: './templates/',
    extName: '.handlebars'
}));
console.log("[* Carteiro da HD] O carteiro já está pronto para a entrega!");
function Contato(fromNome, fromEmail, fromNumero, fromAssunto, fromMensagem) {
    console.log("[* Carteiro da HD] Alguém soliciou um envio de mensagem");
    carteiro.sendMail({
        from: `HD Eletrossistemas - SUPORTE <suporte@hdeletrossistemas.com>`,
        to: `contato@hdeletrossistemas.com`,
        subject: `${fromAssunto}`,
        template: 'contato',
        context: {
            cliente: fromNome,
            email: fromEmail,
            numero: fromNumero,
            mensagem: fromMensagem
        },
        attachments: [{
            filename: 'HDE_LOGO_STD_ATT_BLUE.png',
            path: __dirname + '/assets/img/HDE_LOGO_STD_ATT_BLUE.png',
            cid: 'uniq-logo'
        }]
    }).then(message => {
        // console.log(message);
        console.log("[* Carteiro da HD] Mensagem enviada com sucesso!")
    }).catch(err => {
        console.log("[! Carteiro da HD] Erro ao enviar mensagem", err);
    })
}
function NovoOrcamento(fromNome, fromEmail, fromNumero, fromEndereco, fromCEP, orcamento) {
    console.log("[* Carteiro da HD] Alguém fez um orcamento!");
    carteiro.sendMail({
        from: `HD Eletrossistemas - SUPORTE <suporte@hdeletrossistemas.com>`,
        to: `contato@hdeletrossistemas.com`,
        subject: `NOVO ORÇAMENTO FEITO NO SITE`,
        text: ``,
        template: 'novoorcamento',
        context: {
            orcamento: orcamento,
            cliente: fromNome,
            email: fromEmail,
            numero: fromNumero,
            endereco: fromEndereco,
            cep: fromCEP
        },
        attachments: [{
            filename: 'HDE_LOGO_STD_ATT_BLUE.png',
            path: __dirname + '/assets/img/HDE_LOGO_STD_ATT_BLUE.png',
            cid: 'uniq-logo'
        }]
    }).then(message => {
        // console.log(message);
        console.log("[* Carteiro da HD] Mensagem enviada com sucesso!")
    }).catch(err => {
        console.log("[! Carteiro da HD] Erro ao enviar mensagem", err);
    })
}
function Agradecimentos(fromNome, fromEmail, orcamento) {
    console.log("[* Carteiro da HD] Alguém fez um orcamento!");
    console.log("[* Carteiro da HD] Tentando enviar email...");

    carteiro.sendMail({
        from: `HD Eletrossistemas - SUPORTE <suporte@hdeletrossistemas.com>`,
        to: `${fromEmail}`,
        subject: `Obrigado por solicitar um orçamento conosco`,
        text: ``,
        template: 'agradecimento',
        context: {
            orcamento: orcamento,
            cliente: fromNome
        },
        attachments: [{
            filename: 'HDE_LOGO_STD_ATT_BLUE.png',
            path: __dirname + '/assets/img/HDE_LOGO_STD_ATT_BLUE.png',
            cid: 'uniq-logo'
        }]

    }).then(message => {
        console.log("[* Carteiro da HD] Mensagem enviada com sucesso!")
    }).catch(err => {
        console.log("[! Carteiro da HD] Erro ao enviar mensagem", err);
    })
}

module.exports = {
    Contato,
    Agradecimentos,
    NovoOrcamento,
}