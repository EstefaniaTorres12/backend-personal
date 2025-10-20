const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = {
    register(req, res) {
        const usuario = req.body;

        Usuario.create(usuario, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Error al crear usuario ',
                    error: err
                });
            }else {
                return res.status(201).json({
                    success: true,
                    message: 'Usuario creado correctamente',
                    data: data
                });
            }
        });
    }
}