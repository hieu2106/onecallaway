const { Op } = require('sequelize');
const { ErrorCodes } = require('../helpers/constants');
const { responseWithError } = require('../helpers/response-messages');
const { HDDichVu } = require('../models');

async function getAllController(req, res) {
    const hddichvu = await HDDichVu.findAll();
    return res.json(hddichvu);
}

async function createHDDichVuController(req, res) {
    const hddichvu = await HDDichVu.create(req.body);
    return res.json(hddichvu);
}

async function updateHDDichVuController(req, res) {
    const { id } = req.params;
    const {
        madv, tendv, dongia, mota,
    } = req.body;
    const hddichvu = await HDDichVu.findOne({
        where: { id },
    });
    if (!hddichvu) {
        return res
            .status(ErrorCodes.ERROR_CODE_UNAUTHORIZED)
            .send(
                responseWithError(
                    ErrorCodes.ERROR_CODE_UNAUTHORIZED,
                    'Invalid payload',
                ),
            );
    }
    hddichvu.madv = madv;
    hddichvu.tendv = tendv;
    hddichvu.dongia = dongia;
    hddichvu.mota = mota;

    hddichvu.save();
    return res.json(hddichvu);
}

async function findHDDichVubyIDController(req, res) {
    const { id } = req.params;
    const hddichvu = await HDDichVu.findOne({
        where: { id },
    });
    if (!hddichvu) {
        return res
            .status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .send(
                responseWithError(
                    ErrorCodes.ERROR_CODE_INVALID_PARAMETER,
                    'Khong ton tai id',
                ),
            );
    }

    return res.json(hddichvu);
}

async function deleteHDDichVubyIDController(req, res) {
    const { id } = req.params;
    const hddichvu = await HDDichVu.findOne({
        where: { id },
    });
    if (!hddichvu) {
        return res
            .status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .send(
                responseWithError(
                    ErrorCodes.ERROR_CODE_INVALID_PARAMETER,
                    'Khong ton tai id',
                ),
            );
    }
    hddichvu.destroy();
    return res.json(hddichvu);
}

async function findHDDichVuByNameController(req, res) {
    const { mahddv } = req.query;
    const hddichvu = await HDDichVu.findAll({
        where: {
            mahddv: {
                [Op.like]: `%${mahddv}%`,
            },
        },
    });
    console.log(hddichvu);
    return res.json(hddichvu);
}
module.exports = {
    getAllController,
    createHDDichVuController,
    updateHDDichVuController,
    findHDDichVubyIDController,
    deleteHDDichVubyIDController,
    findHDDichVuByNameController,
};
