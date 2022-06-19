const router = require('express').Router();

const { getHoaDonByIdController } = require('../controllers/hoadon.controller');
const { getHoaDonMiddleware } = require('../middlewares/hoadon.middleware');

router.route('/:id').get(getHoaDonMiddleware, getHoaDonByIdController);

module.exports = router;
