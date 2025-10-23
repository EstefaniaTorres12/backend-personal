const dayjs = require('dayjs');
const db = require('../config/config');
const bcrypt = require('bcryptjs');
const Cliente = {};

Cliente.create = async (cliente, result) => {
    const sql = `INSERT INTO CLIENTE( 
                 cliente_id,
                 cliente_fecha_nacimiento,
                 cliente_edad
                 )VALUES(?,?,?)`;
    db.query(sql, [
        cliente.cliente_id,
        dayjs(cliente.cliente_fecha_nacimiento, "DD/MM/YYYY").toDate(),
        cliente.cliente_edad
    ], (err, res) => {
        if (err){
            console.log('Error al insertar datos del cliente', err);
            result(err, null);
        }else {
            console.log('Datos del cliente insertados correctamente: ', {cliente});
            result(null, {cliente});
        }
    });
};

module.exports = Cliente;