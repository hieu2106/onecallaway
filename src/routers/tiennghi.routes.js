const router = require('express').Router();
const {
    getAllController,
    createTienNghiController,
    updateTienNghiController,
    findTienNghibyIDController,
    deleteTienNghibyIDController,
    findTienNghiByNameController,
} = require('../controllers/tiennghi.controller');
const {
    validateGetAll,
    createTienNghiMiddleware,
    updateTienNghiMiddleware,
    findTienNghiByIdMiddleware,
    deleteTienNghiByIdMiddleware,
} = require('../middlewares/tiennghi.middleware');

router.route('/').get(validateGetAll, getAllController);

router.route('/').post(createTienNghiMiddleware, createTienNghiController);

router.route('/:id').patch(updateTienNghiMiddleware, updateTienNghiController);

router.route('/search').get(findTienNghiByNameController);

router.route('/:id').get(findTienNghiByIdMiddleware, findTienNghibyIDController);

router
    .route('/:id')
    .delete(deleteTienNghiByIdMiddleware, deleteTienNghibyIDController);
module.exports = router;
