const { ErrorCodes } = require('../helpers/constants');
const { responseWithError } = require('../helpers/response-messages');

function validateGetAll(req, res, next) {
    return next();
}

function createDichVuMiddleware(req, res, next) {
    const { madv, tendv, dongia, mota } = req.body;
    if (!madv || !tendv || !dongia || !mota) {
        return res
            .status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .send(
                responseWithError(
                    ErrorCodes.ERROR_CODE_INVALID_PARAMETER,
                    'Invalid arguments',
                ),
            );
    }
    // if (/dhajsdhsa/.test(email) === false) {
    //     return res
    //         .status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
    //         .send(
    //             responseWithError(
    //                 ErrorCodes.ERROR_CODE_INVALID_PARAMETER,
    //                 'Invalid email',
    //             ),
    //         );
    // }
    return next();
}

function updateDichVuMiddleware(req, res, next) {
    const { id } = req.params;
    const { madv, tendv, dongia, mota } = req.body;
    if (!id || !madv || !tendv || !dongia || !mota) {
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

function findDichVuByIdMiddleware(req, res, next) {
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

function deleteDichVuByIdMiddleware(req, res, next) {
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

function findDichVuByNameMiddleware(req, res, next) {
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
    createDichVuMiddleware,
    updateDichVuMiddleware,
    findDichVuByIdMiddleware,
    deleteDichVuByIdMiddleware,
    findDichVuByNameMiddleware,
};
