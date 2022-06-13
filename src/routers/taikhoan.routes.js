const router = require('express').Router();
const {
    loginController,
    refreshTokenController,
    changePasswordController,
} = require('../controllers/taikhoan.controller');
const {
    loginMiddleware,
    refreshTokenMiddleware,
    changePasswordMiddleware,
} = require('../middlewares/taikhoan.middleware');

router.route('/login').post(loginMiddleware, loginController);

router
    .route('/refresh-token')
    .post(refreshTokenMiddleware, refreshTokenController);

router
    .route('/password')
    .patch(changePasswordMiddleware, changePasswordController);

module.exports = router;
