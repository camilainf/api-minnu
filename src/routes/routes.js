const {Router} = require('express');
const router = Router();
const tokenValidator = require('../middlewares/tokenValidator');

const { getInsumos, getInsumoById, getRecetas, getRecetaById} = require('../controllers/index.controller');
const { userLogin, userRegister } = require('../controllers/user-controller/user-controller');
const { agregarRegimen } = require('../controllers/regimen-controller/regimen-controller');
const { getRegimenes } = require('../controllers/regimen-controller/regimen-controller');
const { eliminarRegimenById } = require('../controllers/regimen-controller/regimen-controller');
const { deleteInsumoById, createInsumo, editInsumo } = require('../controllers/insumo-controller/insumo-controller');
const { getTiposRecetas, getTipoRecetaById } = require('../controllers/tiposrecetas-controller/tiposrecetas.controller');


// INSUMOS
router.get('/insumos', getInsumos);
router.get('/insumos/:id', getInsumoById);
router.post('/insumos', tokenValidator ,createInsumo);
router.delete('/insumos/', tokenValidator, deleteInsumoById);
router.put('/insumos/', tokenValidator, editInsumo);

// RECETAS
router.get('/recetas', getRecetas);
router.get('/recetas/:id', getRecetaById);

// REGIMENES
router.post('/regimenes/', tokenValidator, agregarRegimen);
router.get('/regimenes', getRegimenes);
router.delete('/regimenes/:id', eliminarRegimenById);

// TIPOS DE RECETAS
router.get('/tiposrecetas', getTiposRecetas);
router.get('/tiposrecetas/:id', getTipoRecetaById);

// USERS
router.post('/login/', userLogin);
router.post('/users/', userRegister);

// NOT FOUND
router.use((req,res,next)=>{
    res.status(404).send({error:'Not found'})
})


module.exports = router;