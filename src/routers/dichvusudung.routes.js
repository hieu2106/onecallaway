const router = require('express').Router();
const {
    getAllController,
    createDichVuSDController,
    updateDichVuSDController,
    findDichVuSDbyIDController,
    deleteDichVuSDbyIDController,
    findDichVuSDByNameController,
} = require('../controllers/dichvusudung.controller');
const {
    validateGetAll,
    createDichVuSDMiddleware,
    updateDichVuSDMiddleware,
    findDichVuSDByIdMiddleware,
    deleteDichVuSDByIdMiddleware,
} = require('../middlewares/dichvusudung.middleware');

router.route('/').get(validateGetAll, getAllController);

router.route('/').post(createDichVuSDMiddleware, createDichVuSDController);

router.route('/:id').patch(updateDichVuSDMiddleware, updateDichVuSDController);

router.route('/search').get(findDichVuSDByNameController);

router
    .route('/:id')
    .get(findDichVuSDByIdMiddleware, findDichVuSDbyIDController);

router
    .route('/:id')
    .delete(deleteDichVuSDByIdMiddleware, deleteDichVuSDbyIDController);
module.exports = router;
