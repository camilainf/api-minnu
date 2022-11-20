const {Router} = require('express');
const router = Router();

const { getInsumos, getInsumoById, getRecetas, getRecetaById} = require('../controllers/index.controller');
const { userLogin } = require('../controllers/user-controller/user-controller');
const { agregarRegimen } = require('../controllers/regimen-controller/regimen-controller');
const { getRegimenes } = require('../controllers/regimen-controller/regimen-controller');
const { eliminarRegimenById } = require('../controllers/regimen-controller/regimen-controller');
const { deleteInsumoById, createInsumo } = require('../controllers/insumo-controller/insumo-controller');

router.get('/insumos', getInsumos);

router.get('/insumos/:id', getInsumoById);

router.post('/insumos', createInsumo);

router.delete('/insumos/:id', deleteInsumoById);

router.get('/recetas', getRecetas);

router.get('/recetas/:id', getRecetaById);

router.post('/login/', userLogin);

router.post('/regimenes/', agregarRegimen);

router.get('/regimenes', getRegimenes);

router.delete('/regimenes/:id', eliminarRegimenById);

module.exports = router;