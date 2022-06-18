const { Op } = require('sequelize');
const { ErrorCodes } = require('../helpers/constants');
const { responseWithError } = require('../helpers/response-messages');
const { PhieuTra } = require('../models');

async function getAllController(req, res) {
    const phieutra = await PhieuTra.findAll();
    return res.json(phieutra);
}

async function createPhieuTraController(req, res) {
    const phieutra = await PhieuTra.create(req.body);
    return res.json(phieutra);
}

async function updatePhieuTraController(req, res) {
    const { id } = req.params;
    const {
        ngaytra
    } = req.body;
    const phieutra = await PhieuTra.findOne({
        where: { id },
    });
    if (!phieutra) {
        return res
            .status(ErrorCodes.ERROR_CODE_UNAUTHORIZED)
            .send(
                responseWithError(
                    ErrorCodes.ERROR_CODE_UNAUTHORIZED,
                    'Invalid payload',
                ),
            );
    }
    phieutra.ngaytra = ngaytra;

    phieutra.save();
    return res.json(phieutra);
}

async function findPhieuTraebyIDController(req, res) {
    const { id } = req.params;
    const phieutra = await PhieuTra.findOne({
        where: { id },
    });
    if (!phieutra) {
        return res
            .status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .send(
                responseWithError(
                    ErrorCodes.ERROR_CODE_INVALID_PARAMETER,
                    'Khong ton tai id',
                ),
            );
    }

    return res.json(phieutra);
}

module.exports = {
    getAllController,
    createPhieuTraController,
    updatePhieuTraController,
};
