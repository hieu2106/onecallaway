const router = require('express').Router();
const {
    getAllController,
    createPhieuThueController,
    updatePhieuThueController,
} = require('../controllers/phieuthue.controller');
const {
    validateGetAll,
    createPhieuThueMiddleware,
    updatePhieuThueMiddleware,
} = require('../middlewares/phieuthue.middleware');

router.route('/').get(validateGetAll, getAllController);

router.route('/').post(createPhieuThueMiddleware, createPhieuThueController);

router.route('/:id').patch(updatePhieuThueMiddleware, updatePhieuThueController);

module.exports = router;
