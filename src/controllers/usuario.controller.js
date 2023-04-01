'use strict'

require('dotenv').config();
const firebaseConfig = require('../utils/firebase');
// const Error = require('../utils/errors');

const UsuarioModel = require('../models/usuario.model');

const { sendPasswordResetEmail, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');

const { initializeApp } = require('firebase/app');
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

exports.cadastrarUsuario = async (req, res) => {

    const schema = req.headers.schema
    const email = req.body.email
    const senha = req.body.senha
    const idPessoa = req.body.idPessoa
    // const idsFuncionalidades = req.body.idsFuncionalidades
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;

            res.status(200).json({ result: true, user })
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error)
            res.status(500).json({
                errorCode,
                errorMessage
            })
        });
}

exports.autenticar = async (req, res) => {
    const schema = req.headers.schema
    
    const email = req.body.email
    const senha = req.body.senha

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, senha)
        .then(async (userCredential)  => {
            // Signed in 
            const user = userCredential.user;
            // Dados de retorno do usuário logado
            let configuracoes = await UsuarioModel.buscarDadosLogin(schema, user.uid);

            const itens_menu = configuracoes.titulos.map((titulo, index) => ({
                titulo,
                rota: configuracoes.rotas[index],
                icone: configuracoes.icones[index]
              }));

            configuracoes = {
                ...configuracoes,
                itens_menu
            }

            //Remove os itens desnecessários
            delete configuracoes.titulos;
            delete configuracoes.rotas;
            delete configuracoes.icones;

            res.status(200).json({ result: true, auth: user, configuracoes })
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error)
            res.status(500).json({
                errorCode,
                errorMessage
            })
        });
}

exports.reenviarSenha = async (req, res) => {
    const email = req.body.email
    const auth = getAuth();
    var actionCodeSettings = {
        url: 'https://thiagolamberti.com.br',
        // iOS: {
        //     bundleId: 'com.example.ios'
        // },
        // android: {
        //     packageName: 'com.example.android',
        //     installApp: true,
        //     minimumVersion: '12'
        // },
        // handleCodeInApp: true
    };

    sendPasswordResetEmail(
        auth, email, actionCodeSettings)
        .then(function () {
            // Password reset email sent.
            res.status(200).json({ result: true, 'Mensagem: ': 'Solicitação de alteração enviada por e-mail.' })
        })
        .catch(function (error) {
            // Error occurred. Inspect error.code.
            res.status(500).json({
                error: error
            })
        });
}