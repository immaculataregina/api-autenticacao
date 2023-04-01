'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/paroquia.controller');

// Retornar dados da paróquia
router.get('/dados-paroquia', controller.buscarDadosParoquia)

//Atualizar foto da paróquia
router.post('/atualizar-foto', controller.atualizarFoto)

module.exports = router;