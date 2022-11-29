const {Router} = require('express');
const router = Router();
const tokenValidator = require('../middlewares/tokenValidator');

const { userLogin, userRegister } = require('../controllers/user-controller/user-controller');
const { agregarRegimen } = require('../controllers/regimen-controller/regimen-controller');
const { getRegimenes } = require('../controllers/regimen-controller/regimen-controller');
const { eliminarRegimenById } = require('../controllers/regimen-controller/regimen-controller');
const { deleteInsumoById, createInsumo, editInsumo, getInsumos, getInsumoByRecipeId, getInsumoById } = require('../controllers/insumo-controller/insumo-controller');
const { getTiposRecetas, getTipoRecetaById } = require('../controllers/tiposrecetas-controller/tiposrecetas.controller');
const { getRecetas, getRecetaById } = require('../controllers/receta-controller/receta-controller');


// INSUMOS
router.get('/insumos', getInsumos);
router.get('/insumos/:id', getInsumoById);
router.get('/insumoss/:id', getInsumoByRecipeId);
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