const { Op } = require('sequelize');
const { ErrorCodes } = require('../helpers/constants');
const { responseWithError } = require('../helpers/response-messages');
const { Phong } = require('../models');

async function getAllController(req, res) {
    const phong = await Phong.findAll();
    return res.json(phong);
}

async function createPhongController(req, res) {
    const phong = await Phong.create(req.body);
    return res.json(phong);
    // const { maphong } = req.params;
    // const phong = await Phong.findOne({
    //     where: { maphong },
    // });
    // if (phong) {
    //     console.log('Phòng này đã có trong danh sách');
    // } else {
    //     const phong = await Phong.create(req.body);
    //     return res.json(phong);
    // }
}

async function updatePhongController(req, res) {
    const { id } = req.params;
    const { maphong, dientich, dongia, loaiphong } = req.body;
    const phong = await Phong.findOne({
        where: { id },
    });
    if (!phong) {
        return res
            .status(ErrorCodes.ERROR_CODE_UNAUTHORIZED)
            .send(
                responseWithError(
                    ErrorCodes.ERROR_CODE_UNAUTHORIZED,
                    'Invalid payload',
                ),
            );
    }
    phong.maphong = maphong;
    phong.dientich = dientich;
    phong.dongia = dongia;
    phong.loaiphong = loaiphong;

    phong.save();
    return res.json(phong);
}

async function findPhongbyIDController(req, res) {
    const { id } = req.params;
    const phong = await Phong.findOne({
        where: { id },
    });
    if (!phong) {
        return res
            .status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .send(
                responseWithError(
                    ErrorCodes.ERROR_CODE_INVALID_PARAMETER,
                    'Khong ton tai id',
                ),
            );
    }

    return res.json(phong);
}

async function deletePhongbyIDController(req, res) {
    const { id } = req.params;
    const phong = await Phong.findOne({
        where: { id },
    });
    if (!phong) {
        return res
            .status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .send(
                responseWithError(
                    ErrorCodes.ERROR_CODE_INVALID_PARAMETER,
                    'Khong ton tai id',
                ),
            );
    }
    phong.destroy();
    return res.json(phong);
}

async function findPhongByNameController(req, res) {
    const { maphong } = req.query;
    const phong = await Phong.findAll({
        where: {
            maphong: {
                [Op.like]: `%${maphong}%`,
            },
        },
    });
    console.log(phong);
    return res.json(phong);
}
module.exports = {
    getAllController,
    createPhongController,
    updatePhongController,
    findPhongbyIDController,
    deletePhongbyIDController,
    findPhongByNameController,
};
