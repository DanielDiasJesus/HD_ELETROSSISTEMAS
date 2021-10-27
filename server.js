const express = require('express');
const cors = require('cors');

const env = require('dotenv');
env.config();

const jwt = require('jsonwebtoken');

const path = require("path");

const pool = require('./poolfactory');
const carteiroHD = require('./carteirodahd');


const getClientIp = (req) =>{
    const rawIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const arrIp = rawIp.split(":");

    //console.log("FUN CLIENT IP ->", arrIp[arrIp.length - 1]);

    return arrIp[arrIp.length - 1]
}

const localIp = '127.0.0.1';
const port = process.env.PORT || 3000;

// const router = express.Router();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) =>{
    if(req.method !== "POST"){
        req.dataLogin = { login : "pending" }
        next();
        
        return;
    }
    
    const nome = req.body.user;
    const email = req.body.email;
    const pass = req.body.pass;

    // const nome = "TESTE DIAS JESUS";
    // const email = "TESTEDIASNET820@GMAIL.COM";
    // const pass = "Dd@jc13.24TJ.API.L";
    
    // const nome = "DANIEL DIAS JESUS";
    // const email = "DANIELDIASNET820@GMAIL.COM";
    // const pass = "Dd@jc13.24DJ.API.L";

    console.log("\n[*][API] SOLICITAÇÃO DE FETCH, TENTANDO LOGAR... \n");
    console.log("[*][API] USUÁRIO -> ", nome);
    console.log("[*][API] E-MAIL -> ", email);
    console.log("[*][API] SENHA -> ", pass);

    if(!nome && !email && !pass){
        req.dataLogin = { login : "failed" }
        res.status(401).send({
            "mensagem" : "[*][API] ENTRADA SEM LOGIN NÃO AUTORIZADA"
        })
    }
    else{
        pool.getConnection((err, connection) =>{
            if (err) {
                console.log('[!][POOL] ERRO AO POOLAR CLIENTES: \n');
                next(err);
            }
            connection.query(`SELECT * FROM USUARIOS WHERE NOME = "${nome}" AND EMAIL = "${email}" AND PASSWORD = "${pass}"`, (err, result) => {
                connection.release();
                if (err)
                    console.log('[!][POOL] ERRO AO CONSULTAR CLIENTES: \n', err);
                else {
                    if(result.length === 0){
                        req.dataLogin = { login : "failed" }
                        res.status(401).send({
                            "mensagem" : "[*][API] USUÁRIO NÃO ENCONTRADO NA BASE DE DADOS"
                        })
                    }
                    else{
                        const result_admin = result[0].IS_ADMIN[0];
                        if(result_admin === 1){
                            console.log("\n[*][API] ADMINISTRADOR ENCONTRADO NA API\n")
                            
                            const id = result[0].ID;
                            const token = jwt.sign({id}, process.env.JSONTOKEN, {
                                expiresIn : 2
                            });
                            console.log("[*][API] TOKEN GERADO COM SUCESSO!")
                            
                            req.dataLogin = { login : "success" }
                            
                            res.status(200).send({
                                "login"   : true,
                                "token"   : token
                            })
                            
                        }
                        else{
                            console.log("\n[!][API] USUARIO SEM PERMISSOES DE ADMINISTRADOR\n")
                            res.status(401).send({
                                "mensagem" : "[*][API] USUARIO SEM PERMISSOES DE ADMINISTRADOR"
                            })
                        }
                    }
                }
            });
        })
    }
});

app.use((req, res, next) =>{
    console.log("AUTH ->", req.dataLogin);
    
    const token = req.headers['x-access-token'];

    if(!token){
        console.log("[!][API] TOKEN DE AUTENTICACAO NÃO FORNECIDO");
        res.status(401).send({
            "auth" : false,
            "message": "[!][API] VOCÊ NÃO POSSUI UM TOKEN DE AUTENTICACAO"
        });
    }   
    else{
        jwt.verify(token, process.env.JSONTOKEN, (err, decoded) =>{
            if (err){
                console.log("[!][API] TOKEN DE AUTENTICAÇÃO INVALIDO");
                res.status(401).send({
                    "auth" : false,
                    "message": "[!][API] TOKEN DE AUTENTICAÇÃO INVALIDO"
                })
            }
            else{
                console.log("[*][API] TOKEN DE AUTENTICAÇÃO VALIDADO COM SUCESSO");
                next();
            }

        })
    }
});

app.get('/api/', (req, res) =>{
    console.log("[*][API] ROTAS FUNCIONANDO \n");
    
    const clientIp = getClientIp ( req );

    console.log("[*][API] NOVA CONEXAO -> ", clientIp);
    
    res.send({
        "local_ip" : localIp,
        "client_ip": clientIp,
        "message": "API FUNCIONANDO!"
    });
});

app.get('/api/sendemail', (req, res) => {
    const fromEmail = req.query.email;
    const fromNome = req.query.nome;
    const fromAssunto = req.query.subject;
    const fromMensagem = req.query.message;
    const fromNumero = req.query.number;

    carteiroHD.Contato(fromNome, fromEmail, fromNumero, fromAssunto, fromMensagem);
    res.send("Mensagem enviada com sucesso! \n");
});

app.get('/api/clientes', (req, res, next) => {
    console.log(`\n[*][API] Chamando todos os clientes \n`);

    pool.getConnection((err, connection) => {
        if (err) {
            console.log('[!][POOL] ERRO AO POOLAR CLIENTES: \n');
            next(err);
        }
        connection.query("SELECT * FROM CLIENTES", (err, result) => {
            connection.release();

            if (err)
                console.log('[!][POOL] ERRO AO CONSULTAR CLIENTES: \n', err);
            else {
                res.send(result);
            }
        });
    });
});

app.get('/api/servicos', (req, res, next) => {
    console.log(`\n[*][API] Chamando todos os servicos \n`);
    
    pool.getConnection((err, connection) => {
        if (err) {
            console.log('[!][POOL] ERRO AO POOLAR SERVICOS: \n');
            next(err);
        }
        connection.query("SELECT * FROM SERVICOS", (err, result) => {
            connection.release();
            if (err){
                console.log('[!][POOL] ERRO AO CONSULTAR SERVICOS: \n', err);
            }
            else {
                res.send(result);
            }
        });
    });
});

app.get('/api/servico', (req, res, next) => {
    console.log(`\n[*][API] Chamando o servico ${req.query.servico}`);

    pool.getConnection((err, connection) => {
        if (err) {
            console.log('[!][POOL] ERRO AO POOLAR SERVICO: ');
            next(err);
        }
        
        connection.query(`SELECT * FROM SERVICOS WHERE NOME LIKE "${req.query.servico}"`, (err, result) => {
            connection.release();
            const trueResults = JSON.stringify(result);
            const objectResults = JSON.parse(trueResults);
            
            //console.log(objectResults);
            //console.log("[**][POOL] TIPO DO OBJETO RESULTADO "+ typeof result);
            
            if (err){
                console.log('[!][POOL] ERRO AO CONSULTAR SERVICOS: ', err);
            }
            else if(!objectResults.length){
                console.log(`[!!][POOL] SERVIÇO ${req.query.servico} NAO EXISTE NO BD`);
                res.status(404).json({message : "NOT FOUND"})
            }
            else {
                console.log("\n[*][POOL] Serviço retornado com sucesso! \n");
                
                res.send(result);
            }
        });
    });
});

app.get('/api/subservicos', (req, res, next) => {
    console.log(`\n[*][API] Chamando todos os subservicos`);

    pool.getConnection((err, connection) => {
        if (err) {
            console.log('[!][POOL] ERRO AO POOLAR SUBSERVICOS: ');
            next(err);
        }
        connection.query("SELECT * FROM SUBSERVICOS ORDER BY ID_SERVICO", (err, result) => {
            connection.release();
            if (err)
                console.log('[!][POOL] ERRO AO CONSULTAR SUBSERVICOS: ', err);
            else {
                res.send(result);
            }
        });
    });

});

app.get('/api/subservico-servico', (req, res, next) => {
    console.log(`\n[*][API] CHAMANDO OS SUBSERVICOS DE ${req.query.servico.toUpperCase()}`);
    
    pool.getConnection((err, connection) => {
        if (err) {
            console.log('[!] ERRO AO POOLAR SUBSERVICOS: ');
            next(err);
        }

        connection.query(`CALL sp_subservicos_from_servico('${req.query.servico}')`, (err, result) => {
            /*
                sp_subservicos_from_servico
                |______	CREATE DEFINER=`hdeletro`@`187.84.225.36` PROCEDURE `sp_subservicos_from_servico`(IN servico varchar(40))
                |______ BEGIN
                    |______ IF servico LIKE "orcamento personalizado" THEN
                        |______ SELECT * FROM SUBSERVICOS ORDER BY id_servico;
                            ELSE
                            |______ SELECT * FROM SUBSERVICOS WHERE id_servico IN(
                                    |______	SELECT id FROM SERVICOS WHERE nome LIKE servico);
                            END IF;
                |______ END
            */
            
            connection.release();
            
            const trueResults = JSON.stringify(result);
            const objectResults = JSON.parse(trueResults);
            
            if (err){
                console.log('[!][POOL] ERRO AO CONSULTAR SUBSERVICOS: ', err);
            }
            else if(!objectResults[0].length){
                console.log(`[!!][POOL] SUBSERVICOS DE ${req.query.servico} NAO EXISTEM NO BD`);
                res.status(404).json({message : "NOT FOUND"})
            }
            else{
                console.log("\n[*][POOL] Subserviço retornado com sucesso! \n");
                
                res.send(result);
            }
        });
    });
});

app.get('/api/fazerOrcamento', (req, res, next) => {
    const clienteNome = req.query.nome;
    const clienteEmail = req.query.email;
    const clienteNumero = req.query.numero;
    const clienteEndereco = req.query.endereco;
    const clienteCEP = req.query.cep;
    const orcamento = req.query.orcamento;
    
    console.log(`\n[*][API] Chamando o cliente ${clienteNome}`);

    pool.getConnection((err, connection) => {
        if (err) {
            console.log('[!] ERRO AO POOLAR CLIENTE: ');
            next(err);
        }
        connection.query(`CALL sp_show_and_insert_client('${clienteNome}', '${clienteEmail}', '${clienteNumero}', '${clienteEndereco}', '${clienteCEP}')`, (err, result) => {
            /*
                sp_show_and_insert_client
                |__ CREATE DEFINER=`hdeletro`@`187.84.225.36` PROCEDURE `sp_check_and_insert_client`(IN nome_par varchar(30),IN email_par varchar(40),IN numero_par varchar(20),IN endereco_par varchar(200), IN cep_par varchar(15))
                |______ BEGIN
                        |______ INSERT INTO CLIENTES(nome, email, numero, endereco, cep) 
                    |______ SELECT * from (SELECT nome_par, email_par, numero_par, endereco_par, cep_par) AS tmp
                    |______ WHERE NOT EXISTS(
                            |______ SELECT * FROM CLIENTES WHERE 
                            |______ nome = nome_par AND
                            |______ email = email_par AND 
                            |______ numero = numero_par AND
                            |______ endereco = endereco_par AND
                            |______ cep = cep_par
                                ) LIMIT 1;
                    |______ SELECT id FROM CLIENTES WHERE nome = nome_par AND email = email_par AND numero = numero_par AND endereco = endereco_par AND cep = cep_par;
                |______ END
            */
            if (err)
                console.log('[!][POOL] ERRO AO CONSULTAR SUBSERVICOS: ', err);
            else {
                console.log('\n[*][POOL] Cliente encontrado/inserido no banco');

                const orcamentoList = JSON.parse(orcamento);
                const jsonReturn = result[0];
                const idCliente = jsonReturn[0].id;
                console.log('\n[*][POOL] Tentando inserir orcamento...');
                console.log(orcamentoList)

                orcamentoList.forEach(element => {
                    connection.query(`INSERT INTO ORCAMENTOS VALUES(null, CURRENT_TIMESTAMP(), ${element.ID_SERVICO}, ${element.ID}, ${idCliente})`, (err, result) => {
                        
                        if (err) {
                            console.log('[!][POOL] ERRO AO CONSULTAR SUBSERVICOS: ', err);
                        }
                        else {
                            console.log(`\n[*][POOL] Orcamento ${element.id} do cliente ${clienteNome} feito com sucesso`);
                        }
                    });
                });
                connection.release();
            }
        });
    });
    res.send("DONE");
});

app.get('/api/mensagemorcamento', (req, res, next) => {
    const fromNome = req.query.nome;
    const fromEmail = req.query.email;
    const fromNumero = req.query.numero;
    const fromEndereco = req.query.endereco;
    const fromCEP = req.query.cep;

    console.log(`\n[*][API] Chamando todos os orcamentos que o cliente ${fromNome} fez na data de hoje`);

    let orcamento = [];

    pool.getConnection((err, connection) => {
        if (err) {
            console.log('[!][POOL] ERRO AO POOLAR ORCAMENTOS: ');
            next(err);
        }
        connection.query(`CALL sp_budget_from_client('${fromNome}')`, (err, result) => {
            /*
                sp_budget_from_client
                |__ CREATE DEFINER=`hdeletro`@`187.84.225.36` PROCEDURE `sp_budget_from_client`(IN nome_par varchar(40))
                |______ BEGIN
                    |_______SELECT 
                            |__ ORCAMENTOS.data_orcamento AS data_orcamento, 
                            |__ CLIENTES.nome AS cliente, 
                            |__ SERVICOS.nome AS servico, 
                            |__ SUBSERVICOS.nome AS item
                    |______ FROM ORCAMENTOS
                                |___ LEFT JOIN CLIENTES ON ORCAMENTOS.id_cliente = CLIENTES.id
                            |___ LEFT JOIN SERVICOS ON ORCAMENTOS.id_servico = SERVICOS.id
                            |___ LEFT JOIN SUBSERVICOS ON ORCAMENTOS.id_subservico = SUBSERVICOS.id
                    |______ WHERE CLIENTES.nome LIKE nome_par;
                |______ END
            */
            connection.release();
        
        if (err)
                console.log('[!][POOL] ERRO AO CONSULTAR ORCAMENTOS: ', err);
            else
                orcamento = JSON.parse(JSON.stringify(result[0]));

        console.log('\n[*][POOL] DEPOIS ORCAMENTO', orcamento);
        });
    });
    setTimeout(() => {
        carteiroHD.Agradecimentos(fromNome, fromEmail, orcamento);
        carteiroHD.NovoOrcamento(fromNome, fromEmail, fromNumero, fromEndereco, fromCEP, orcamento);
    }, 500)

    res.send("MENSAGEM ENVIADA!");
});

app.use(express.static(path.join(__dirname, './client/build')));

app.get("*", (req, res) =>{
    res.sendFile(path.join(__dirname, './client/build', 'index.html'));
});

app.listen(port, (err) =>{
    if(err)
        console.log('[!][API] ERRO', err);
    else
        console.log('[*][API] SERVIDOR ATIVO NA PORTA ', port);
});