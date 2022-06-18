const { ErrorCodes } = require('../helpers/constants');
const { responseWithError } = require('../helpers/response-messages');

function validateGetAll(req, res, next) {
    return next();
}

function createNhanVienMiddleware(req, res, next) {
    const {
        name, address, email, dob, phone, gender,
    } = req.body;
    if (!name || !address || !email || !dob || !phone || !gender) {
        return res
            .status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .send(
                responseWithError(
                    ErrorCodes.ERROR_CODE_INVALID_PARAMETER,
                    'Invalid arguments',
                ),
            );
    }
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email) === false) {
        return res
            .status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .send(
                responseWithError(
                    ErrorCodes.ERROR_CODE_INVALID_PARAMETER,
                    'Invalid email',
                ),
            );
    }
    return next();
}

function updateNhanvienMiddleware(req, res, next) {
    const { id } = req.params;
    const {
        name, address, email, dob, phone, gender,
    } = req.body;
    if (!id || !name || !address || !email || !dob || !phone || !gender) {
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

function findNhanvienByIdMiddleware(req, res, next) {
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

function deleteNhanvienByIdMiddleware(req, res, next) {
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

function findNhanvienByNameMiddleware(req, res, next) {
    const { name } = req.query;
    if (!name) {
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
    createNhanVienMiddleware,
    updateNhanvienMiddleware,
    findNhanvienByIdMiddleware,
    deleteNhanvienByIdMiddleware,
    findNhanvienByNameMiddleware,
};
