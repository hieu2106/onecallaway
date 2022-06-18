const { Op } = require('sequelize');
const { ErrorCodes } = require('../helpers/constants');
const { responseWithError } = require('../helpers/response-messages');
const { TienNghi } = require('../models');

async function getAllController(req, res) {
    const tiennghi = await TienNghi.findAll();
    return res.json(tiennghi);
}

async function createTienNghiController(req, res) {
    const tiennghi = await TienNghi.create(req.body);
    return res.json(tiennghi);
}

async function updateTienNghiController(req, res) {
    const { id } = req.params;
    const {
        matn, tentn, tinhtrang, slco,
    } = req.body;
    const tiennghi = await TienNghi.findOne({
        where: { id },
    });
    if (!tiennghi) {
        return res
            .status(ErrorCodes.ERROR_CODE_UNAUTHORIZED)
            .send(
                responseWithError(
                    ErrorCodes.ERROR_CODE_UNAUTHORIZED,
                    'Invalid payload',
                ),
            );
    }
    tiennghi.matn = matn;
    tiennghi.tentn = tentn;
    tiennghi.tinhtrang = tinhtrang;
    tiennghi.slco = slco;

    tiennghi.save();
    return res.json(tiennghi);
}

async function findTienNghibyIDController(req, res) {
    const { id } = req.params;
    const tiennghi = await TienNghi.findOne({
        where: { id },
    });
    if (!tiennghi) {
        return res
            .status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .send(
                responseWithError(
                    ErrorCodes.ERROR_CODE_INVALID_PARAMETER,
                    'Khong ton tai id',
                ),
            );
    }

    return res.json(tiennghi);
}

async function deleteTienNghibyIDController(req, res) {
    const { id } = req.params;
    const tiennghi = await TienNghi.findOne({
        where: { id },
    });
    if (!tiennghi) {
        return res
            .status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .send(
                responseWithError(
                    ErrorCodes.ERROR_CODE_INVALID_PARAMETER,
                    'Khong ton tai id',
                ),
            );
    }
    tiennghi.destroy();
    return res.json(tiennghi);
}

async function findTienNghiByNameController(req, res) {
    const { tentn } = req.query;
    const tiennghi = await TienNghi.findAll({
        where: {
            tentn: {
                [Op.like]: `%${tentn}%`,
            },
        },
    });
    console.log(tiennghi);
    return res.json(tiennghi);
}
module.exports = {
    getAllController,
    createTienNghiController,
    updateTienNghiController,
    findTienNghibyIDController,
    deleteTienNghibyIDController,
    findTienNghiByNameController,
};
