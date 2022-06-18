const { ErrorCodes } = require('../helpers/constants');
const { responseWithError } = require('../helpers/response-messages');

function validateGetAll(req, res, next) {
    return next();
}

function createKhachHangMiddleware(req, res, next) {
    const {
        makh, tenkh, diachi, dob, sdt, quoctich, gender,
    } = req.body;
    if (!makh || !tenkh || !diachi || !dob || !sdt || !quoctich || !gender) {
        return res
            .status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .send(
                responseWithError(
                    ErrorCodes.ERROR_CODE_INVALID_PARAMETER,
                    'Invalid arguments',
                ),
            );
    }
    return next();
}

function updateKhachHangMiddleware(req, res, next) {
    const { id } = req.params;
    const {
        makh, tenkh, diachi, dob, sdt, quoctich, gender,
    } = req.body;
    if (
        !id
        || !makh
        || !tenkh
        || !diachi
        || !dob
        || !sdt
        || !quoctich
        || !gender
    ) {
        return res
            .status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .send(
                responseWithError(
                    ErrorCodes.ERROR_CODE_INVALID_PARAMETER,
                    'Invalid arguments',
                ),
            );
    }

    return next();
}

function findKhachHangByIdMiddleware(req, res, next) {
    const { id } = req.params;
    if (!id) {
        return res
            .status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .send(
                responseWithError(
                    ErrorCodes.ERROR_CODE_INVALID_PARAMETER,
                    'truyen cmm id vao day',
                ),
            );
    }
    return next();
}

function deleteKhachHangByIdMiddleware(req, res, next) {
    const { id } = req.params;
    if (!id) {
        return res
            .status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .send(
                responseWithError(
                    ErrorCodes.ERROR_CODE_INVALID_PARAMETER,
                    'truyen cmm id vao day',
                ),
            );
    }
    return next();
}

function findKhachHangByNameMiddleware(req, res, next) {
    const { tenkh } = req.query;
    if (!tenkh) {
        return res
            .status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .send(
                responseWithError(
                    ErrorCodes.ERROR_CODE_INVALID_PARAMETER,
                    'Hong thay ten',
                ),
            );
    }
    return next();
}
module.exports = {
    validateGetAll,
    createKhachHangMiddleware,
    updateKhachHangMiddleware,
    findKhachHangByIdMiddleware,
    deleteKhachHangByIdMiddleware,
    findKhachHangByNameMiddleware,
};
