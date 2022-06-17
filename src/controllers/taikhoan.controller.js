const { ErrorCodes } = require('../helpers/constants');
const {
    responseWithError,
    responseSuccess,
} = require('../helpers/response-messages');
const { TaiKhoan } = require('../models');
const {
    comparePassword,
    createAccessToken,
    decodeToken,
    createRefreshToken,
    hashPassword,
} = require('../services/taikhoan.service');

async function loginController(req, res) {
    const { username, password } = req.body;
    const existed = await TaiKhoan.findOne({
        where: {
            username,
        },
    });
    if (!existed) {
        return res
            .status(ErrorCodes.ERROR_CODE_UNAUTHORIZED)
            .send(
                responseWithError(
                    ErrorCodes.ERROR_CODE_UNAUTHORIZED,
                    'Invalid username',
                ),
            );
    }
    if (!comparePassword(password, existed.password)) {
        return res
            .status(ErrorCodes.ERROR_CODE_UNAUTHORIZED)
            .send(
                responseWithError(
                    ErrorCodes.ERROR_CODE_UNAUTHORIZED,
                    'Invalid password',
                ),
            );
    }
    return res.status(ErrorCodes.ERROR_CODE_SUCCESS).send({
        accessToken: createAccessToken({
            username,
            userId: existed.id,
        }),
        expiresIn: new Date(Date.now() + 3600 * 1000).getTime(),
        refreshToken: createRefreshToken({
            username,
            userId: existed.id,
        }),
        refreshExpiresIn: new Date(Date.now() + 3600 * 1000 * 24 * 7).getTime(),
    });
}

async function refreshTokenController(req, res) {
    const { refreshToken } = req.body;
    try {
        const decoded = decodeToken(refreshToken, process.env.JWT_RF_SECRET);
        console.log(decoded);
        const existed = await TaiKhoan.findOne({
            where: {
                username: decoded.username,
                id: decoded.userId,
            },
        });
        if (!existed) {
            return res
                .status(ErrorCodes.ERROR_CODE_UNAUTHORIZED)
                .send(
                    responseWithError(
                        ErrorCodes.ERROR_CODE_UNAUTHORIZED,
                        'Invalid payload',
                    ),
                );
        }
        return res.status(ErrorCodes.ERROR_CODE_SUCCESS).send({
            accessToken: createAccessToken({
                username: decoded.username,
                userId: decoded.userId,
            }),
            expiresIn: new Date(Date.now() + 3600 * 1000).getTime(),
        });
    } catch (error) {
        return res
            .status(ErrorCodes.ERROR_CODE_UNAUTHORIZED)
            .send(
                responseWithError(
                    ErrorCodes.ERROR_CODE_UNAUTHORIZED,
                    'Invalid refresh token',
                ),
            );
    }
}

async function changePasswordController(req, res) {
    const { username, currentPassword, newPassword } = req.body;
    const existed = await TaiKhoan.findOne({
        where: {
            username,
        },
    });
    if (!existed) {
        return res
            .status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .send(
                responseWithError(
                    ErrorCodes.ERROR_CODE_INVALID_PARAMETER,
                    'User not found',
                ),
            );
    }
    if (!comparePassword(currentPassword, existed.password)) {
        return res
            .status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .send(
                responseWithError(
                    ErrorCodes.ERROR_CODE_INVALID_PARAMETER,
                    'Invalid password',
                ),
            );
    }
    existed.password = hashPassword(newPassword);
    await existed.save();
    return res
        .status(ErrorCodes.ERROR_CODE_SUCCESS)
        .send(responseSuccess({}, 'Password changed'));
}

async function getAllController(req, res) {
    const taikhoan = await TaiKhoan.findAll();
    return res.json(taikhoan);
}


module.exports = {
    loginController,
    refreshTokenController,
    changePasswordController,
    getAllController,
};
