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
    getPhongDangThueController,
    traPhongController,
    getAllPhongDaTraController,
} = require('../controllers/phong.controller');
const {
    validateGetAll,
    createPhongMiddleware,
    updatePhongMiddleware,
    findPhongByIdMiddleware,
    deletePhongByIdMiddleware,
    thuePhongMiddleware,
    traPhongMiddleware,
} = require('../middlewares/phong.middleware');

router.route('/').get(validateGetAll, getAllController);

router.route('/').post(createPhongMiddleware, createPhongController);

router.route('/:id').patch(updatePhongMiddleware, updatePhongController);

router.route('/trong').get(getPhongTrongController);

router.route('/dangthue').get(getPhongDangThueController);

router.route('/search').get(findPhongByNameController);

router.route('/phongdatra').get(getAllPhongDaTraController);

router.route('/:id').get(findPhongByIdMiddleware, findPhongbyIDController);

router.route('/thuephong').post(thuePhongMiddleware, thuePhongController);

router.route('/traphong').post(traPhongMiddleware, traPhongController);

router
    .route('/:id')
    .delete(deletePhongByIdMiddleware, deletePhongbyIDController);
module.exports = router;
