const { Op } = require('sequelize');
const { ErrorCodes } = require('../helpers/constants');
const { responseWithError } = require('../helpers/response-messages');
const { DichVuSD } = require('../models');

async function getAllController(req, res) {
    const dichvusd = await DichVuSD.findAll();
    return res.json(dichvusd);
}

async function createDichVuSDController(req, res) {
    const dichvusd = await DichVuSD.create(req.body);
    return res.json(dichvusd);
}

async function updateDichVuSDController(req, res) {
    const { id } = req.params;
    const {
        madv, tendv, dongia, mota,
    } = req.body;
    const dichvusd = await DichVuSD.findOne({
        where: { id },
    });
    if (!dichvusd) {
        return res
            .status(ErrorCodes.ERROR_CODE_UNAUTHORIZED)
            .send(
                responseWithError(
                    ErrorCodes.ERROR_CODE_UNAUTHORIZED,
                    'Invalid payload',
                ),
            );
    }
    dichvusd.madv = madv;
    dichvusd.tendv = tendv;
    dichvusd.dongia = dongia;
    dichvusd.mota = mota;

    dichvusd.save();
    return res.json(dichvusd);
}

async function findDichVuSDbyIDController(req, res) {
    const { id } = req.params;
    const dichvusd = await DichVuSD.findOne({
        where: { id },
    });
    if (!dichvusd) {
        return res
            .status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .send(
                responseWithError(
                    ErrorCodes.ERROR_CODE_INVALID_PARAMETER,
                    'Khong ton tai id',
                ),
            );
    }

    return res.json(dichvusd);
}

async function deleteDichVuSDbyIDController(req, res) {
    const { id } = req.params;
    const dichvusd = await DichVuSD.findOne({
        where: { id },
    });
    if (!dichvusd) {
        return res
            .status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .send(
                responseWithError(
                    ErrorCodes.ERROR_CODE_INVALID_PARAMETER,
                    'Khong ton tai id',
                ),
            );
    }
    dichvusd.destroy();
    return res.json(dichvusd);
}

async function findDichVuSDByNameController(req, res) {
    const { tendv } = req.query;
    const dichvusd = await DichVuSD.findAll({
        where: {
            tendv: {
                [Op.like]: `%${tendv}%`,
            },
        },
    });
    console.log(dichvusd);
    return res.json(dichvusd);
}
module.exports = {
    getAllController,
    createDichVuSDController,
    updateDichVuSDController,
    findDichVuSDbyIDController,
    deleteDichVuSDbyIDController,
    findDichVuSDByNameController,
};
