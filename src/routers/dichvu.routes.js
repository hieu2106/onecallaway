const router = require('express').Router();
const {
    getAllController,
    createDichVuController,
    updateDichVuController,
    findDichVubyIDController,
    deleteDichVubyIDController,
    findDichVuByNameController,
} = require('../controllers/dichvu.controller');
const {
    validateGetAll,
    createDichVuMiddleware,
    updateDichVuMiddleware,
    findDichVuByIdMiddleware,
    deleteDichVuByIdMiddleware,
} = require('../middlewares/dichvu.middleware');

router.route('/').get(validateGetAll, getAllController);

router.route('/').post(createDichVuMiddleware, createDichVuController);

router.route('/:id').patch(updateDichVuMiddleware, updateDichVuController);

router.route('/search').get(findDichVuByNameController);

router.route('/:id').get(findDichVuByIdMiddleware, findDichVubyIDController);

router
    .route('/:id')
    .delete(deleteDichVuByIdMiddleware, deleteDichVubyIDController);
module.exports = router;
