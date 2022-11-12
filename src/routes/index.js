const {Router} = require('express');
const router = Router();

const { getInsumos, getInsumoById, getRecetas, getRecetaById} = require('../controllers/index.controller');


router.get('/insumos', getInsumos);

router.get('/insumos/:id', getInsumoById);

router.get('/recetas', getRecetas);

router.get('/recetas/:id', getRecetaById);





module.exports = router;