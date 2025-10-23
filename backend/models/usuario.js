const db = require('../config/config');
const bcrypt = require('bcryptjs');
const Usuario = {};
const RolUsuario = require('./rolUsuario');
const Cliente = require('./cliente');
const dayjs = require('dayjs');


Usuario.create = async (user, result) => {
    const hash = await bcrypt.hash(user.usuario_credencial, 10);

    const sql = `INSERT INTO USUARIO(
                    usuario_primer_nombre,
                    usuario_segundo_nombre,
                    usuario_primer_apellido,
                    usuario_segundo_apellido,
                    usuario_documento,
                    usuario_correo,
                    usuario_direccion,
                    usuario_credencial
                    ) VALUES (?,?,?,?,?,?,?,?)`;

    db.query(sql, [
        user.usuario_primer_nombre,
        user.usuario_segundo_nombre,
        user.usuario_primer_apellido,
        user.usuario_segundo_apellido,
        user.usuario_documento,
        user.usuario_correo,
        user.usuario_direccion,
        hash
    ], (err, res) => {
        if (err) {
            console.log('Error al crear al Usuario: ', err);
            result(err, null);
        } else {
            console.log('Usuario creado: ', { usuario_id: res.insertId, ...user });
            asignarRolUsuario(user, res.insertId, result);
          
        }
    });
};


function asignarRolUsuario(user, insertId, result) {
    let rolUsuario = {
        rol_id: user.rol_id,
        usuario_id: insertId,
        estado_cred: true
    };

    RolUsuario.create(rolUsuario, (error, datos) => {
        if (error) {
            result(error, null);
        } else {
              datosCliente(user, insertId, result);
            
        }
    });
};


function datosCliente(user, insertId, result ){
    let hoy = new Date();
    let años = dayjs(hoy).diff(user.cliente_fecha_nacimiento,"year");
    console.log(años);
    console.log(dayjs(user.cliente_fecha_nacimiento, "DD/MM/YYYY").toDate())
    let cliente = {
        cliente_id : insertId,
        cliente_fecha_nacimiento: user.cliente_fecha_nacimiento,
        cliente_edad: años
    };

    Cliente.create(cliente, (error, datos) => {
        if (error) {
            result(error, null);
        } else {
            result(null, { usuario_id: insertId, ...user });
        }
    });
};

module.exports = Usuario;