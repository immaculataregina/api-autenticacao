'use strict';

const db = require('../utils/db');
// const store = require('store');

exports.buscarDadosParoquia = async (schema) => {
	try {

		const query =
			`
			SELECT * FROM paroquias WHERE schema = '${schema}'
			`;

		let output = await db.buscar(query);
		return output[0];
	} catch (e) {
		throw new Error(e);
	}
}

exports.atualizarFoto = async (schema, fotoBase64) => {
	try {

		const query =
			`
			UPDATE paroquias
			SET foto_logo = '${fotoBase64}'
			WHERE schema = '${schema}'
			`;
		
		await db.executar(query);
		
	} catch (e) {
		throw new Error(e);
	}
}