const router = require('express').Router();
const {
    getAllController,
    createPhongThueController,
    updatePhongThueController,
} = require('../controllers/phongthue.controller');
const {
    validateGetAll,
    createPhongThueMiddleware,
    updatePhongThueMiddleware,
} = require('../middlewares/phongthue.middleware');

router.route('/').get(validateGetAll, getAllController);

router.route('/').post(createPhongThueMiddleware, createPhongThueController);

router.route('/:id').patch(updatePhongThueMiddleware, updatePhongThueController);

module.exports = router;
