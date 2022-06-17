const { ErrorCodes } = require('../helpers/constants');
const { responseWithError } = require('../helpers/response-messages');

function validateGetAll(req, res, next) {
    return next();
}

function createDichVuSDMiddleware(req, res, next) {
    const { mahddv, tendv, dongia, luongsd } = req.body;
    if (!mahddv || !tendv || !dongia || !luongsd) {
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

function updateDichVuSDMiddleware(req, res, next) {
    const { id } = req.params;
    const { mahddv, tendv, dongia, luongsd } = req.body;
    if (!id || !mahddv || !tendv || !dongia || !luongsd) {
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

function findDichVuSDByIdMiddleware(req, res, next) {
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

function deleteDichVuSDByIdMiddleware(req, res, next) {
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

function findDichVuSDByNameMiddleware(req, res, next) {
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
    createDichVuSDMiddleware,
    updateDichVuSDMiddleware,
    findDichVuSDByIdMiddleware,
    deleteDichVuSDByIdMiddleware,
    findDichVuSDByNameMiddleware,
};
