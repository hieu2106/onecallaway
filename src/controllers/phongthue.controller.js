const { Op } = require('sequelize');
const { ErrorCodes } = require('../helpers/constants');
const { responseWithError } = require('../helpers/response-messages');
const { PhongThue } = require('../models');

async function getAllController(req, res) {
    const phongthue = await PhongThue.findAll();
    return res.json(phongthue);
}

async function createPhongThueController(req, res) {
    const phongthue = await PhongThue.create(req.body);
    return res.json(phongthue);
}

async function updatePhongThueController(req, res) {
    const { id } = req.params;
    const {
        giathue, giacoc,
    } = req.body;
    const phongthue = await PhongThue.findOne({
        where: { id },
    });
    if (!phongthue) {
        return res
            .status(ErrorCodes.ERROR_CODE_UNAUTHORIZED)
            .send(
                responseWithError(
                    ErrorCodes.ERROR_CODE_UNAUTHORIZED,
                    'Invalid payload',
                ),
            );
    }
    phongthue.giathue = giathue;
    phongthue.giacoc = giacoc;

    phongthue.save();
    return res.json(phongthue);
}

async function findPhongThuebyIDController(req, res) {
    const { id } = req.params;
    const phongthue = await PhongThue.findOne({
        where: { id },
    });
    if (!phongthue) {
        return res
            .status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .send(
                responseWithError(
                    ErrorCodes.ERROR_CODE_INVALID_PARAMETER,
                    'Khong ton tai id',
                ),
            );
    }

    return res.json(phongthue);
}

module.exports = {
    getAllController,
    createPhongThueController,
    updatePhongThueController,
};
