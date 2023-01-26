'use strict';

const db = require('../utils/db');
// const store = require('store');


exports.cadastrar = async (objInsert) => {
	try {

		const query =
			`-- Aqui vai o script de inserção`;

		// let output = await db.find(query);

		return output[0];
	} catch (e) {
		throw new Error(e);
	}
}

exports.autenticar = async (objAuth) => {
	try {

		const query =
			`-- Aqui vai o script de inserção`;

		// let output = await db.find(query);

		return output[0];
	} catch (e) {
		throw new Error(e);
	}
}

exports.buscarDadosLogin = async (schema, uid) => {
	try {

		const query =
			`
			WITH temp_pessoa AS (
				SELECT id_pessoa,
				apelido,
				url_foto
				FROM ${schema}.pessoas
				WHERE uid = '${uid}'
			)
			
			SELECT
			(SELECT id_pessoa FROM temp_pessoa) AS id_pessoa,
			p.hx_cor_primaria,
			p.hx_cor_secundaria,
			p.hx_cor_texto,
			p.url_logo_paroquia,
			(SELECT apelido FROM temp_pessoa) AS apelido,
			(SELECT ARRAY_AGG(titulo_menu) FROM itens_menu) AS itens_menu,
			(SELECT url_foto FROM temp_pessoa) AS url_foto
			FROM paroquias p
			WHERE p.schema = '${schema}'
			`;

		const output = await db.buscar(query);
		return output[0];
	} catch (e) {
		throw new Error(e);
	}
}

exports.atualizarUid = async (uid, idPessoa) => {
	try {

		const query =
			`
			UPDATE ${schema}.pessoas 
			SET uid = '${uid}'
			WHERE id_pessoa = ${idPessoa}
			`;

		let output = await db.executar(query);
		return output[0];
	} catch (e) {
		throw new Error(e);
	}
}