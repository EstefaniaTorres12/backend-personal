const db = require('../config/config');
const bcrypt = require('bcryptjs');
const Usuario = {};
const RolUsuario = require('./rolUsuario');


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
                    )VALUES (?,?,?,?,?,?,?,?)`;
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
            let rolUsuario = {};
            rolUsuario.rol_id = user.rol_id,
            rolUsuario.usuario_id = res.insertId,
            rolUsuario.estado_cred = true,

            RolUsuario.create(rolUsuario, (error, datos) => {
                if (error){
                    result(error, null);
                }else{
                    result(null, { usuario_id: res.insertId, ...user });
                }
            });
            
        }
    });

};

module.exports = Usuario;