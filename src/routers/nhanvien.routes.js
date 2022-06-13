const router = require('express').Router();
const {
    getAllController,
    createNhanVienController,
    updateNhanVienController,
    findNhanVienbyIDController,
    deleteNhanVienbyIDController,
    findNhanvienByNameController,
} = require('../controllers/nhanvien.controller');
const {
    validateGetAll,
    createNhanVienMiddleware,
    updateNhanvienMiddleware,
    findNhanvienByIdMiddleware,
    deleteNhanvienByIdMiddleware,
} = require('../middlewares/nhanvien.middleware');

router.route('/').get(validateGetAll, getAllController);

router.route('/').post(createNhanVienMiddleware, createNhanVienController);

router.route('/:id').patch(updateNhanvienMiddleware, updateNhanVienController);

router.route('/search').get(findNhanvienByNameController);

router
    .route('/:id')
    .get(findNhanvienByIdMiddleware, findNhanVienbyIDController);

router
    .route('/:id')
    .delete(deleteNhanvienByIdMiddleware, deleteNhanVienbyIDController);
module.exports = router;
