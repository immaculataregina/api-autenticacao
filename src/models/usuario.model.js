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
				SELECT p.id_pessoa,
				p.apelido,
				p.foto,
				d.ativo AS dizimista
				FROM ${schema}.pessoas p
				LEFT JOIN ${schema}.dizimistas d
					ON d.id_pessoa = p.id_pessoa
						AND d.ativo = TRUE
				WHERE p.uid = '${uid}'
			)
			
			SELECT
			(SELECT id_pessoa FROM temp_pessoa) AS id_pessoa,
			p.hx_cor_primaria,
			p.hx_cor_secundaria,
			p.hx_cor_texto,
			(SELECT apelido FROM temp_pessoa) AS apelido,
			(SELECT ARRAY_AGG(titulo_menu) FROM itens_menu) AS titulos,
			(SELECT ARRAY_AGG(rota_menu) FROM itens_menu) AS rotas,
			(SELECT ARRAY_AGG(icone_menu) FROM itens_menu) AS icones,
			(SELECT foto FROM temp_pessoa) AS foto,
			(SELECT coalesce(dizimista, FALSE) FROM temp_pessoa) AS dizimista
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