const express = require('express');
const router = express.Router();
const subcategoriaController = require('../controllers/subcategoriaController');
const { verifyToken, authorizeRoles } = require('../middlewares/authMiddleware');

router.post('/createSubC',subcategoriaController.crearSubcategoria);
router.put('/updateSubC/:id', subcategoriaController.getSubcategoriaUpdate);
router.delete('/deleteSubC/:id', subcategoriaController.getSubcategoriaDelete);


//rutas puplicasssss
router.get('/subCAll', subcategoriaController.getAllSubcategorias);
router.get('/subCId/:id',subcategoriaController.getSubcategoriaById);

module.exports = router;