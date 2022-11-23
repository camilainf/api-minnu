const {Router} = require('express');
const router = Router();

const { getInsumos, getInsumoById, getRecetas, getRecetaById} = require('../controllers/index.controller');
const { userLogin, userRegister } = require('../controllers/user-controller/user-controller');
const { agregarRegimen } = require('../controllers/regimen-controller/regimen-controller');
const { getRegimenes } = require('../controllers/regimen-controller/regimen-controller');
const { eliminarRegimenById } = require('../controllers/regimen-controller/regimen-controller');
const { deleteInsumoById, createInsumo } = require('../controllers/insumo-controller/insumo-controller');
const { getTiposRecetas, getTipoRecetaById } = require('../controllers/tiposrecetas-controller/tiposrecetas.controller');

// INSUMOS

router.get('/insumos', getInsumos);

router.get('/insumos/:id', getInsumoById);

router.post('/insumos', createInsumo);

router.delete('/insumos/:id', deleteInsumoById);

// RECETAS

router.get('/recetas', getRecetas);

router.get('/recetas/:id', getRecetaById);

// REGIMENES

router.post('/regimenes/', agregarRegimen);

router.get('/regimenes', getRegimenes);

router.delete('/regimenes/:id', eliminarRegimenById);

// TIPOS DE RECETAS
router.get('/tiposrecetas', getTiposRecetas);

router.get('/tiposrecetas/:id', getTipoRecetaById);

// USERS
router.post('/login/', userLogin);
router.post('/users/', userRegister);


module.exports = router;