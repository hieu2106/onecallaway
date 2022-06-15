const { Op } = require('sequelize');
const { ErrorCodes } = require('../helpers/constants');
const { responseWithError } = require('../helpers/response-messages');
const { NhanVien } = require('../models');

async function getAllController(req, res) {
    const nhanvien = await NhanVien.findAll();
    return res.json(nhanvien);
}

async function createNhanVienController(req, res) {
    const nhanvien = await NhanVien.create(req.body);
    return res.json(nhanvien);
}

async function updateNhanVienController(req, res) {
    const { id } = req.params;
    const { name, address, email, dob, phone, gender } = req.body;
    const nhanvien = await NhanVien.findOne({
        where: { id },
    });
    if (!nhanvien) {
        return res
            .status(ErrorCodes.ERROR_CODE_UNAUTHORIZED)
            .send(
                responseWithError(
                    ErrorCodes.ERROR_CODE_UNAUTHORIZED,
                    'Invalid payload',
                ),
            );
    }
    nhanvien.name = name;
    nhanvien.address = address;
    nhanvien.email = email;
    nhanvien.dob = dob;
    nhanvien.phone = phone;
    nhanvien.gender = gender;

    nhanvien.save();
    return res.json(nhanvien);
}

async function findNhanVienbyIDController(req, res) {
    const { id } = req.params;
    const nhanvien = await NhanVien.findOne({
        where: { id },
    });
    if (!nhanvien) {
        return res
            .status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .send(
                responseWithError(
                    ErrorCodes.ERROR_CODE_INVALID_PARAMETER,
                    'Khong ton tai id',
                ),
            );
    }

    return res.json(nhanvien);
}

async function deleteNhanVienbyIDController(req, res) {
    const { id } = req.params;
    const nhanvien = await NhanVien.findOne({
        where: { id },
    });
    if (!nhanvien) {
        return res
            .status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .send(
                responseWithError(
                    ErrorCodes.ERROR_CODE_INVALID_PARAMETER,
                    'Khong ton tai id',
                ),
            );
    }
    nhanvien.destroy();
    return res.json(nhanvien);
}

async function findNhanvienByNameController(req, res) {
    const { name } = req.query;
    const nhanvien = await NhanVien.findAll({
        where: {
            name: {
                [Op.like]: `%${name}%`,
            },
        },
    });
    console.log(nhanvien);
    return res.json(nhanvien);
}
module.exports = {
    getAllController,
    createNhanVienController,
    updateNhanVienController,
    findNhanVienbyIDController,
    deleteNhanVienbyIDController,
    findNhanvienByNameController,
};
