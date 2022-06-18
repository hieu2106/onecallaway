const { ErrorCodes } = require('../helpers/constants');
const { responseWithError } = require('../helpers/response-messages');

function validateGetAll(req, res, next) {
    return next();
}

function createHDDichVuMiddleware(req, res, next) {
    const {
        mahddv, makh, manv, tongtien,
    } = req.body;
    if (!mahddv || !makh || !manv || !tongtien) {
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

function updateHDDichVuMiddleware(req, res, next) {
    const { id } = req.params;
    const {
        mahddv, makh, manv, tongtien,
    } = req.body;
    if (!id || !mahddv || !makh || !manv || !tongtien) {
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

function findHDDichVuByIdMiddleware(req, res, next) {
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

function deleteHDDichVuByIdMiddleware(req, res, next) {
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

function findHDDichVuByNameMiddleware(req, res, next) {
    const { tendv } = req.query;
    if (!tendv) {
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
    createHDDichVuMiddleware,
    updateHDDichVuMiddleware,
    findHDDichVuByIdMiddleware,
    deleteHDDichVuByIdMiddleware,
    findHDDichVuByNameMiddleware,
};
