const router = require('express').Router();
const {
    getAllController,
    createPhongController,
    updatePhongController,
    findPhongbyIDController,
    deletePhongbyIDController,
    findPhongByNameController,
} = require('../controllers/phong.controller');
const {
    validateGetAll,
    createPhongMiddleware,
    updatePhongMiddleware,
    findPhongByIdMiddleware,
    deletePhongByIdMiddleware,
} = require('../middlewares/phong.middleware');

router.route('/').get(validateGetAll, getAllController);

router.route('/').post(createPhongMiddleware, createPhongController);

router.route('/:id').patch(updatePhongMiddleware, updatePhongController);

router.route('/search').get(findPhongByNameController);

router.route('/:id').get(findPhongByIdMiddleware, findPhongbyIDController);

router
    .route('/:id')
    .delete(deletePhongByIdMiddleware, deletePhongbyIDController);
module.exports = router;
