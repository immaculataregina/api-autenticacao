'use strict'

require('dotenv').config();
// const Error = require('../utils/errors');

const ParoquiaModel = require('../models/paroquia.model');

// const analytics = getAnalytics(app);

exports.buscarDadosParoquia = async (req, res) => {
    const schema = req.headers.schema

    try {

        const dadosParoquia = await ParoquiaModel.buscarDadosParoquia(
            schema
        )

        return res.status(200).json({
            dadosParoquia
        })

    } catch (error) {

        return res.status(500).json({ message: error })

    }
    
}

exports.atualizarFoto = async (req, res) => {

    const schema = req.headers.schema;

    let fotoBase64 = req.body.fotoBase64;

    try {

        await ParoquiaModel.atualizarFoto(
            schema,
            fotoBase64
        )

    } catch (error) {

        return res.status(500).json({ message: error })

    }
    
    return res.status(200).json({ message: `Foto atualizada com sucesso!` })
}