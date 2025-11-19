const db = require('../config/config');
const bcrypt = require('bcryptjs');
const SubCategoria = {};

SubCategoria.create = async (subCategoria, result) => {
    const sql = `INSERT INTO SUBCATEGORIA (
    subcategporia_id,
    subcategoria_nombre,
    categoria_id
    ) VALUES (?,?,?)`;

    db.query(sql,[
        subCategoria.subcategoria_id,
        subCategoria.subcategoria_nombre,
        subCategoria.categoria_id
    ], (err, res) => {
        if (err) {
            console.log('Error al crear Sub Categoria: ', err);
            result(err, null);
        } else{
            console.log('SubCategoria creada correctamente:', {subcategoria_id: res.insertId, ...subCategoria});
            result(null, {subcategoria_id: res.insertId, ...subCategoria});
        }
    });
};