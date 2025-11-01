const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { verifyToken, authorizeRoles } = require('../middlewares/authMiddleware');


router.post('/usuarioCreate', usuarioController.register);

router.get('/id/:id', usuarioController.getUsuarioById);
router.get('/documento/:documento', usuarioController.getUsuarioByDocument);
router.put('/update/:id',usuarioController.getUsuarioUpdate);
router.delete('/deleteU/:id',usuarioController.getUsuarioDelete);

module.exports = router;