const { Op } = require('sequelize');
const { ErrorCodes } = require('../helpers/constants');
const { responseWithError } = require('../helpers/response-messages');
const { PhieuThue } = require('../models');

async function getAllController(req, res) {
    const phieuthue = await PhieuThue.findAll();
    return res.json(phieuthue);
}

async function createPhieuThueController(req, res) {
    const phieuthue = await PhieuThue.create(req.body);
    return res.json(phieuthue);
}

async function updatePhieuThueController(req, res) {
    const { id } = req.params;
    const {
        manv, makh, ngayden, ngaydenhan,
    } = req.body;
    const phieuthue = await PhieuThue.findOne({
        where: { id },
    });
    if (!phieuthue) {
        return res
            .status(ErrorCodes.ERROR_CODE_UNAUTHORIZED)
            .send(
                responseWithError(
                    ErrorCodes.ERROR_CODE_UNAUTHORIZED,
                    'Invalid payload',
                ),
            );
    }
    phieuthue.manv = manv;
    phieuthue.makh = makh;
    phieuthue.ngayden = ngayden;
    phieuthue.ngaydenhan = ngaydenhan;

    phieuthue.save();
    return res.json(phieuthue);
}

async function findPhieuThueebyIDController(req, res) {
    const { id } = req.params;
    const phieuthue = await PhieuThue.findOne({
        where: { id },
    });
    if (!phieuthue) {
        return res
            .status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .send(
                responseWithError(
                    ErrorCodes.ERROR_CODE_INVALID_PARAMETER,
                    'Khong ton tai id',
                ),
            );
    }

    return res.json(phieuthue);
}

module.exports = {
    getAllController,
    createPhieuThueController,
    updatePhieuThueController,
};
