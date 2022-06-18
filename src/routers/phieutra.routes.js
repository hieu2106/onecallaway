const router = require('express').Router();
const {
    getAllController,
    createPhieuTraController,
    updatePhieuTraController,
} = require('../controllers/phieutra.controller');
const {
    validateGetAll,
    createPhieuTraMiddleware,
    updatePhieuTraMiddleware,
} = require('../middlewares/phieutra.middleware');

router.route('/').get(validateGetAll, getAllController);

router.route('/').post(createPhieuTraMiddleware, createPhieuTraController);

router.route('/:id').patch(updatePhieuTraMiddleware, updatePhieuTraController);

module.exports = router;
