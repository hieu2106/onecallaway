const { ErrorCodes } = require('../helpers/constants');
const { responseWithError } = require('../helpers/response-messages');
const { TaiKhoan, NhanVien } = require('../models');
const { decodeToken } = require('../services/taikhoan.service');

function validateGetAll(req, res, next) {
    return next();
}

function loginMiddleware(req, res, next) {
    const { username, password } = req.body;
    if (!username || !password) {
        return res
            .status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .send(
                responseWithError(
                    ErrorCodes.ERROR_CODE_INVALID_PARAMETER,
                    'Missing parameters',
                ),
            );
    }
    return next();
}

function refreshTokenMiddleware(req, res, next) {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res
            .status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .send(
                responseWithError(
                    ErrorCodes.ERROR_CODE_INVALID_PARAMETER,
                    'Missing parameters',
                ),
            );
    }
    return next();
}

async function authMiddleware(req, res, next) {
    const accessToken = req.headers.authorization;
    if (!accessToken) {
        return res
            .status(ErrorCodes.ERROR_CODE_UNAUTHORIZED)
            .send(
                responseWithError(
                    ErrorCodes.ERROR_CODE_UNAUTHORIZED,
                    'Missing access token',
                ),
            );
    }
    try {
        const decoded = decodeToken(accessToken, process.env.JWT_AT_SECRET);
        const { username, userId } = decoded;
        const taikhoan = await TaiKhoan.findOne({
            where: {
                username,
                id: userId,
            },
            include: NhanVien,
        });
        if (!taikhoan) {
            return res
                .status(ErrorCodes.ERROR_CODE_UNAUTHORIZED)
                .send(
                    responseWithError(
                        ErrorCodes.ERROR_CODE_UNAUTHORIZED,
                        'Invalid access token',
                    ),
                );
        }
        req.user = taikhoan;
    } catch (error) {
        return res
            .status(ErrorCodes.ERROR_CODE_UNAUTHORIZED)
            .send(
                responseWithError(
                    ErrorCodes.ERROR_CODE_UNAUTHORIZED,
                    'Invalid access token',
                ),
            );
    }
    return next();
}

function changePasswordMiddleware(req, res, next) {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
        return res
            .status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .send(
                responseWithError(
                    ErrorCodes.ERROR_CODE_INVALID_PARAMETER,
                    'Missing parameters',
                ),
            );
    }
    if (/^[a-z0-9]{6,}$/.test(newPassword) === false) {
        return res
            .status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .send(
                responseWithError(
                    ErrorCodes.ERROR_CODE_INVALID_PARAMETER,
                    'Invalid password',
                ),
            );
    }
    return next();
}

module.exports = {
    validateGetAll,
    loginMiddleware,
    refreshTokenMiddleware,
    authMiddleware,
    changePasswordMiddleware,
};
