const { ErrorCodes } = require('../helpers/constants');
const { responseWithError } = require('../helpers/response-messages');

function validateGetAll(req, res, next) {
    return next();
}

function createTienNghiMiddleware(req, res, next) {
    const {
        matn, tentn, tinhtrang, slco,
    } = req.body;
    if (!matn || !tentn || !tinhtrang || !slco) {
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

function updateTienNghiMiddleware(req, res, next) {
    const { id } = req.params;
    const {
        matn, tentn, tinhtrang, slco,
    } = req.body;
    if (!id || !matn || !tentn || !tinhtrang || !slco) {
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

function findTienNghiByIdMiddleware(req, res, next) {
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

function deleteTienNghiByIdMiddleware(req, res, next) {
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

function findTienNghiByNameMiddleware(req, res, next) {
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
    createTienNghiMiddleware,
    updateTienNghiMiddleware,
    findTienNghiByIdMiddleware,
    deleteTienNghiByIdMiddleware,
    findTienNghiByNameMiddleware,
};
