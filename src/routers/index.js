const { Router } = require('express');
const { authMiddleware } = require('../middlewares/taikhoan.middleware');
const nhanvienRouter = require('./nhanvien.routes');
const taikhoanRouter = require('./taikhoan.routes');
const dichvuRouter = require('./dichvu.routes');
const khachhangRouter = require('./khachhang.routes');
const phongRouter = require('./phong.routes');
const dichvusdRouter = require('./dichvusudung.routes');
const hddichvuRouter = require('./hddichvu.routes');
const tiennghiRouter = require('./tiennghi.routes');
const tiennghiphongRouter = require('./tiennghiphong.routes');

const router = Router();

router.use('/status', (req, res) => {
    res.send({
        message: 'Hello World',
    });
});
router.use('/taikhoan', taikhoanRouter);
router.use('/nhanvien', authMiddleware, nhanvienRouter);
router.use('/dichvu', dichvuRouter);
router.use('/khachhang', khachhangRouter);
router.use('/phong', phongRouter);
router.use('/dichvusd', dichvusdRouter);
router.use('/hddichvu', hddichvuRouter);
router.use('/tiennghi', tiennghiRouter);
router.use('/tiennghiphong', tiennghiphongRouter);
module.exports = router;
