const { Router } = require('express');
const { authMiddleware } = require('../middlewares/taikhoan.middleware');
const nhanvienRouter = require('./nhanvien.routes');
const taikhoanRouter = require('./taikhoan.routes');

const router = Router();

router.use('/status', (req, res) => {
    res.send({
        message: 'Hello World',
    });
});
router.use('/taikhoan', taikhoanRouter);
router.use('/nhanvien', authMiddleware, nhanvienRouter);

module.exports = router;
