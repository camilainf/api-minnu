const {Router} = require('express');
const router = Router();
const tokenValidator = require('../middlewares/tokenValidator');


const { userLogin, userRegister, getUsers } = require('../controllers/user-controller/user-controller');
const { agregarRegimen, getRegimenByMenuId } = require('../controllers/regimen-controller/regimen-controller');
const { getRegimenes } = require('../controllers/regimen-controller/regimen-controller');
const { eliminarRegimenById } = require('../controllers/regimen-controller/regimen-controller');
const { deleteInsumoById, createInsumo, editInsumo, getInsumos, getInsumoByRecipeId, getInsumoById } = require('../controllers/insumo-controller/insumo-controller');
const { getTiposRecetas, getTipoRecetaById } = require('../controllers/tiposrecetas-controller/tiposrecetas.controller');
const { getRecetas, getRecetaById, crearNuevaReceta, eliminarReceta, editarReceta } = require('../controllers/receta-controller/receta-controller');
const { getTiposMenus, getTipoMenuById, getTipoMenuByMenuID } = require('../controllers/tiposmenus-controller/tiposmenus.controller');
const { getMenus, getMenuById } = require('../controllers/menu-controller/menu-controller');


// USERS
router.get('/users/', getUsers);
router.post('/login/', userLogin);
router.post('/users/', userRegister);

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
router.post('/recetas', tokenValidator, crearNuevaReceta);
router.delete('/recetas/', tokenValidator, eliminarReceta);
router.put('/recetas', tokenValidator, editarReceta);

// REGIMENES
router.get('/regimenes', getRegimenes);
router.get('/regimenes/menu/:id', getRegimenByMenuId);
router.post('/regimenes/', tokenValidator, agregarRegimen);
router.delete('/regimenes/:id',tokenValidator,  eliminarRegimenById);

// TIPOS DE RECETAS
router.get('/tiposrecetas', getTiposRecetas);
router.get('/tiposrecetas/:id', getTipoRecetaById);

// TIPOS MENUS
router.get('/tiposmenus', getTiposMenus);
router.get('/tiposmenus/:id', getTipoMenuById);
router.get('/tiposmenus/menu/:id', getTipoMenuByMenuID); 

// MENUS
router.get('/menus', getMenus);
router.get('/menus/:id', getMenuById);




// NOT FOUND
router.use((req,res,next)=>{
    res.status(404).send({error:'Not found'})
})


module.exports = router;