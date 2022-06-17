const router = require('express').Router();
const {
    getAllController,
    createTienNghiPhongController,
    updateTienNghiPhongController,
    findTienNghiPhongbyIDController,
    deleteTienNghiPhongbyIDController,
    findTienNghiPhongByNameController,
} = require('../controllers/tiennghiphong.controller');
const {
    validateGetAll,
    createTienNghiPhongMiddleware,
    updateTienNghiPhongMiddleware,
    findTienNghiPhongByIdMiddleware,
    deleteTienNghiPhongByIdMiddleware,
} = require('../middlewares/tiennghiphong.middleware');

router.route('/').get(validateGetAll, getAllController);

router.route('/').post(createTienNghiPhongMiddleware, createTienNghiPhongController);

router.route('/:id').patch(updateTienNghiPhongMiddleware, updateTienNghiPhongController);

router.route('/search').get(findTienNghiPhongByNameController);

router.route('/:id').get(findTienNghiPhongByIdMiddleware, findTienNghiPhongbyIDController);

router
    .route('/:id')
    .delete(deleteTienNghiPhongByIdMiddleware, deleteTienNghiPhongbyIDController);
module.exports = router;
