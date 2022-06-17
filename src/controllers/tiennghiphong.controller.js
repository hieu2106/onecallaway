const { Op } = require('sequelize');
const { ErrorCodes } = require('../helpers/constants');
const { responseWithError } = require('../helpers/response-messages');
const { TienNghiPhong } = require('../models');

async function getAllController(req, res) {
    const tiennghiphong = await TienNghiPhong.findAll();
    return res.json(tiennghiphong);
}

async function createTienNghiPhongController(req, res) {
    const tiennghiphong = await TienNghiPhong.create(req.body);
    return res.json(tiennghiphong);
}

async function updateTienNghiPhongController(req, res) {
    const { id } = req.params;
    const { matn, maphong, soluong } = req.body;
    const tiennghiphong = await TienNghiPhong.findOne({
        where: { id },
    });
    if (!tiennghiphong) {
        return res
            .status(ErrorCodes.ERROR_CODE_UNAUTHORIZED)
            .send(
                responseWithError(
                    ErrorCodes.ERROR_CODE_UNAUTHORIZED,
                    'Invalid payload',
                ),
            );
    }
    tiennghiphong.matn = matn;
    tiennghiphong.tentn = maphong;
    tiennghiphong.tinhtrang = soluong;

    tiennghiphong.save();
    return res.json(tiennghiphong);
}

async function findTienNghiPhongbyIDController(req, res) {
    const { id } = req.params;
    const tiennghiphong = await TienNghiPhong.findOne({
        where: { id },
    });
    if (!tiennghiphong) {
        return res
            .status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .send(
                responseWithError(
                    ErrorCodes.ERROR_CODE_INVALID_PARAMETER,
                    'Khong ton tai id',
                ),
            );
    }

    return res.json(tiennghiphong);
}

async function deleteTienNghiPhongbyIDController(req, res) {
    const { id } = req.params;
    const tiennghiphong = await TienNghiPhong.findOne({
        where: { id },
    });
    if (!tiennghiphong) {
        return res
            .status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .send(
                responseWithError(
                    ErrorCodes.ERROR_CODE_INVALID_PARAMETER,
                    'Khong ton tai id',
                ),
            );
    }
    tiennghiphong.destroy();
    return res.json(tiennghiphong);
}

async function findTienNghiPhongByNameController(req, res) {
    const { matn } = req.query;
    const tiennghiphong = await TienNghiPhong.findAll({
        where: {
            matn: {
                [Op.like]: `%${matn}%`,
            },
        },
    });
    console.log(tiennghiphong);
    return res.json(tiennghiphong);
}
module.exports = {
    getAllController,
    createTienNghiPhongController,
    updateTienNghiPhongController,
    findTienNghiPhongbyIDController,
    deleteTienNghiPhongbyIDController,
    findTienNghiPhongByNameController,
};
