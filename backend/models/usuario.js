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


function datosCliente(user, insertId, result) {
    let hoy = new Date();
    let años = dayjs(hoy).diff(user.cliente_fecha_nacimiento, "year");
    console.log(años);
    console.log(dayjs(user.cliente_fecha_nacimiento, "DD/MM/YYYY").toDate())
    let cliente = {
        cliente_id: insertId,
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

Usuario.findById = (id, result) => {
    const sql = `SELECT  usuario_id,
                    usuario_primer_nombre,
                    usuario_segundo_nombre,
                    usuario_primer_apellido,
                    usuario_segundo_apellido,
                    usuario_documento,
                    usuario_correo,
                    usuario_direccion,
                    usuario_credencial FROM USUARIO where usuario_id = ?`;
    db.query(sql, [id], (err, user) => {
        if (err) {
            console.log('Error al consultar : ', err);
            result(err, null);
        } else {
            console.log('Usuario consultado: ', user[0]);
            result(null, user[0]);
        }
    });
};

Usuario.findByDocument = (documento, result) => {
    const sql = `SELECT usuario_id,
                    usuario_primer_nombre,
                    usuario_segundo_nombre,
                    usuario_primer_apellido,
                    usuario_segundo_apellido,
                    usuario_documento,
                    usuario_correo,
                    usuario_direccion,
                    usuario_credencial FROM USUARIO where usuario_documento = ?`;
    db.query(sql, [documento], (err, doc) => {
        if (err) {
            console.log('Error al consultar : ', err);
            result(err, null);
        } else {
            console.log('Uusario Consultado : ', doc[0]);
            result(null, doc[0]);
        }
    });
};


Usuario.update = async (usuario, result) => {
    let fields = [];
    let values = [];

    if (usuario.usuario_credencial) {
        const hash = await bcrypt.hash(usuario.usuario_credencial, 10);
        fields.push('usuario_credencial = ?');
        values.push(hash);
    }

    if (usuario.usuario_correo) {
        fields.push('usuario_correo = ?');
        values.push(usuario.usuario_correo);
    }

    if (usuario.usuario_primer_nombre) {
        fields.push('usuario_primer_nombre = ?');
        values.push(usuario.usuario_primer_nombre);
    }

    if (usuario.usuario_segundo_nombre) {
        fields.push('usuario_segundo_nombre = ?');
        values.push(usuario.usuario_segundo_nombre);
    }

    if (usuario.usuario_primer_apellido) {
        fields.push('usuario_primer_apellido = ?');
        values.push(usuario.usuario_primer_apellido);
    }

    if (usuario.usuario_segundo_apellido) {
        fields.push('usuario_segundo_apellido = ?');
        values.push(usuario.usuario_segundo_apellido);
    }

    if (usuario.usuario_direccion) {
        fields.push('usuario_direccion = ?');
        values.push(usuario.usuario_direccion);
    }

    const sql = `UPDATE usuario SET ${fields.join(", ")} WHERE usuario_id = ?`;
    values.push(usuario.usuario_id);

    db.query(sql, values, (err, res) => {
        if (err) {
            console.log('Error al actualizar usuario: ', err);
            result(err, null);
        } else {
            console.log('Usuario actualizado: ', { usuario_id: usuario.usuario_id, ...usuario });
            result(null, { usuario_id: usuario.usuario_id, ...usuario });
        }
    });


}

Usuario.delete = (id, result)=>{
    const sql = `DELETE FROM usuario WHERE usuario_id = ?`;
    db.query(sql, [id], (err, res ) => {
        if (err){
            console.log('Error al eliminar usuario: ', err);
            result(err, null);
        }else{
            console.log('Usuario elimiinado:', id);
            result(null, res);
        }
    });
};

module.exports = Usuario;