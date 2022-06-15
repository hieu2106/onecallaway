const router = require('express').Router();
const {
    getAllController,
    createKhachHangController,
    updateKhachHangController,
    findKhachHangbyIDController,
    deleteKhachHangbyIDController,
    findKhachHangByNameController,
} = require('../controllers/khachhang.controller');
const {
    validateGetAll,
    createKhachHangMiddleware,
    updateKhachHangMiddleware,
    findKhachHangByIdMiddleware,
    deleteKhachHangByIdMiddleware,
} = require('../middlewares/khachhang.middleware');

router.route('/').get(validateGetAll, getAllController);

router.route('/').post(createKhachHangMiddleware, createKhachHangController);

router
    .route('/:id')
    .patch(updateKhachHangMiddleware, updateKhachHangController);

router.route('/search').get(findKhachHangByNameController);

router
    .route('/:id')
    .get(findKhachHangByIdMiddleware, findKhachHangbyIDController);

router
    .route('/:id')
    .delete(deleteKhachHangByIdMiddleware, deleteKhachHangbyIDController);
module.exports = router;
