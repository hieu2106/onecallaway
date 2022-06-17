const router = require('express').Router();
const {
    getAllController,
    createHDDichVuController,
    updateHDDichVuController,
    findHDDichVubyIDController,
    deleteHDDichVubyIDController,
    findHDDichVuByNameController,
} = require('../controllers/hddichvu.controller');
const {
    validateGetAll,
    createHDDichVuMiddleware,
    updateHDDichVuMiddleware,
    findHDDichVuByIdMiddleware,
    deleteHDDichVuByIdMiddleware,
} = require('../middlewares/hddichvu.middleware');

router.route('/').get(validateGetAll, getAllController);

router.route('/').post(createHDDichVuMiddleware, createHDDichVuController);

router.route('/:id').patch(updateHDDichVuMiddleware, updateHDDichVuController);

router.route('/search').get(findHDDichVuByNameController);

router
    .route('/:id')
    .get(findHDDichVuByIdMiddleware, findHDDichVubyIDController);

router
    .route('/:id')
    .delete(deleteHDDichVuByIdMiddleware, deleteHDDichVubyIDController);
module.exports = router;
