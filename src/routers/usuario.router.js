'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuario.controller');

// Cadastrar novo usuário
router.post('/', controller.cadastrarUsuario)

// Autenticar
router.post('/autenticar', controller.autenticar)

// Reenviar senha por e-mail (esqueci minha senha)
router.post('/reenviar-senha', controller.reenviarSenha)

module.exports = router;