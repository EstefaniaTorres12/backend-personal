const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const { findById } = require('../models/user');

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
            } else {
                return res.status(201).json({
                    success: true,
                    message: 'Usuario creado correctamente',
                    data: data
                });
            }
        });
    },

    getUsuarioById(req, res) {
        const id = req.params.id;
        Usuario.findById(id, (err, user) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Error al consultar el usuario',
                    error: err
                });
            }
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado'
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Usuario encontrado',
                data: user
            });
        });
    },

    getUsuarioByDocument(req, res) {
        const documento = req.params.documento;
        Usuario.findByDocument(documento, (err, doc) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Error al consultar el usuario',
                    error: err
                });
            }
            if (!doc) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado'
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Usuario encontrado',
                data: doc
            });
        });
    },

    getUsuarioUpdate(req, res) {
        const user = req.body;
        Usuario.update(user, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Error al actualizar el usuario',
                    error: err
                });
            }
            return res.status(200).json({
                success: true,
                message: 'Usuario actualizado',
                data: data
            });
        });
    },

    getUsuarioDelete(req, res) {
        const id = req.params.id;
        Usuario.delete(id, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message:'Error al eliminar Usuario',
                    error: err
                });
            } return res.status(200).json({
                success: true,
                message: 'Usuario eliminado',
                data: data
            }); 
        });
    }
};