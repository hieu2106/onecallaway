const { ErrorCodes } = require('../helpers/constants');
const { responseWithError } = require('../helpers/response-messages');

function getHoaDonMiddleware(req, res, next) {
    const { id } = req.params;

    if (!id) {
        return res
            .status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .send(
                responseWithError(
                    ErrorCodes.ERROR_CODE_INVALID_PARAMETER,
                    'Invalid ID',
                ),
            );
    }
    return next();
}

module.exports = {
    getHoaDonMiddleware,
};
