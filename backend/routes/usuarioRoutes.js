const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { verifyToken, authorizeRoles } = require('../middlewares/authMiddleware');


router.post('/usuariosCreate', usuarioController.register);

module.exports = router;