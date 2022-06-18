const router = require('express').Router();
const {
    getAllController,
    createPhongController,
    updatePhongController,
    findPhongbyIDController,
    deletePhongbyIDController,
    findPhongByNameController,
    getPhongTrongController,
    thuePhongController,
} = require('../controllers/phong.controller');
const {
    validateGetAll,
    createPhongMiddleware,
    updatePhongMiddleware,
    findPhongByIdMiddleware,
    deletePhongByIdMiddleware,
    thuePhongMiddleware,
} = require('../middlewares/phong.middleware');

router.route('/').get(validateGetAll, getAllController);

router.route('/').post(createPhongMiddleware, createPhongController);

router.route('/:id').patch(updatePhongMiddleware, updatePhongController);

router.route('/trong').get(getPhongTrongController);

router.route('/search').get(findPhongByNameController);

router.route('/:id').get(findPhongByIdMiddleware, findPhongbyIDController);

router.route('/thuephong').post(thuePhongMiddleware, thuePhongController);

router
    .route('/:id')
    .delete(deletePhongByIdMiddleware, deletePhongbyIDController);
module.exports = router;
