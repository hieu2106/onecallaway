const { Op } = require('sequelize');
const { ErrorCodes } = require('../helpers/constants');
const { responseWithError } = require('../helpers/response-messages');
const {
    Phong,
    PhongThue,
    PhieuTra,
    PhieuThue,
    KhachHang,
    NhanVien,
} = require('../models');

async function getAllController(req, res) {
    const phong = await Phong.findAll();
    return res.json(phong);
}

async function createPhongController(req, res) {
    const { maphong } = req.body;
    const phong = await Phong.findOne({
        where: {
            maphong,
        },
    });

    if (phong) {
        return res
            .status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .send(
                responseWithError(
                    ErrorCodes.ERROR_CODE_INVALID_PARAMETER,
                    'Phong da ton tai',
                ),
            );
    }

    const phongMoi = await Phong.create({
        ...req.body,
        maphong,
    });
    return res.json(phongMoi);
}

async function updatePhongController(req, res) {
    const { id } = req.params;
    const {
        maphong, dientich, dongia, loaiphong,
    } = req.body;
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
    const phongtt = await Phong.findOne({
        where: {
            maphong,
            id: {
                [Op.not]: id,
            },
        },
    });
    if (phongtt) {
        return res
            .status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .send(
                responseWithError(
                    ErrorCodes.ERROR_CODE_INVALID_PARAMETER,
                    'Ma phong da ton tai',
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
    return res.json(phong);
}

async function getPhongTrongController(req, res) {
    const phongDaThues = await PhongThue.findAll({
        where: {
            phieutraId: null,
        },
        include: PhieuTra,
    });
    const phongTrongs = await Phong.findAll({
        where: {
            id: {
                [Op.notIn]: phongDaThues.map((phong) => phong.phongId),
            },
        },
    });

    return res.json(phongTrongs);
}

async function thuePhongController(req, res) {
    const { makh, phongs, tiencoc } = req.body;
    const phongIds = phongs.map((p) => p.id);
    const [phongDangChoThue, phongAll, khachHang] = await Promise.all([
        PhongThue.findAll({
            where: {
                phieutraId: null,
                phongId: {
                    [Op.in]: phongIds,
                },
            },
        }),
        Phong.findAll({
            where: {
                id: {
                    [Op.in]: phongIds,
                },
            },
        }),
        KhachHang.findOne({
            where: {
                makh,
            },
        }),
    ]);
    if (phongDangChoThue.length > 0) {
        return res
            .status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .send(
                responseWithError(
                    ErrorCodes.ERROR_CODE_INVALID_PARAMETER,
                    'Phong da thue',
                ),
            );
    }
    if (phongAll.length !== phongs.length) {
        return res
            .status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .send(
                responseWithError(
                    ErrorCodes.ERROR_CODE_INVALID_PARAMETER,
                    'Phong khong ton tai',
                ),
            );
    }
    if (!khachHang) {
        return res
            .status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .send(
                responseWithError(
                    ErrorCodes.ERROR_CODE_INVALID_PARAMETER,
                    'Khach hang khong ton tai',
                ),
            );
    }
    const nhanvienId = req.user.nhanvien.id;
    const phieuThue = await PhieuThue.create({
        khachhangId: khachHang.id,
        tiencoc,
        nhanvienId,
    });
    const phongThues = await PhongThue.bulkCreate(
        phongs.map((p) => ({
            giathue: phongAll.find((phong) => phong.id === p.id).dongia,
            ngayden: p.ngayden,
            ngaydenhan: p.ngaydi,
            phongId: p.id,
            phieuthueId: phieuThue.id,
        })),
    );
    return res.json(phongThues);
}

async function getPhongDangThueController(req, res) {
    const { makh } = req.query;
    const phongDangThue = await PhongThue.findAll({
        where: {
            phieutraId: {
                [Op.is]: null,
            },
        },
        attributes: ['id', 'giathue', 'ngayden', 'ngaydenhan'],
        include: [
            {
                model: Phong,
                attributes: ['maphong'],
            },
            {
                model: PhieuThue,
                include: [
                    {
                        model: KhachHang,
                        attributes: ['makh', 'tenkh'],
                        where: {
                            makh: {
                                [Op.like]: `%${makh || ''}%`,
                            },
                        },
                    },
                ],
                attributes: ['id', 'tiencoc'],
            },
        ],
    });
    return res.json(phongDangThue.filter((p) => p.phieuthue));
}

async function traPhongController(req, res) {
    const { phongs, phieuthueId } = req.body;
    const phongDangThue = await PhongThue.findAll({
        where: {
            phieuthueId,
            id: {
                [Op.in]: phongs,
            },
        },
    });
    if (phongDangThue.length !== phongs.length) {
        return res
            .status(ErrorCodes.ERROR_CODE_INVALID_PARAMETER)
            .send(
                responseWithError(
                    ErrorCodes.ERROR_CODE_INVALID_PARAMETER,
                    'Phong khong ton tai',
                ),
            );
    }
    const phieuTra = await PhieuTra.create({
        phieuthueId,
        ngaytra: new Date(),
    });
    phieuTra.setPhongthues(phongDangThue);
    return res.json(phieuTra);
}

async function getAllPhongDaTraController(req, res) {
    const phongDaTra = await PhieuTra.findAll({
        include: [
            {
                model: PhieuThue,
                include: [
                    {
                        model: KhachHang,
                        attributes: ['makh', 'tenkh'],
                    },
                    {
                        model: NhanVien,
                        attributes: ['id', 'name'],
                    },
                ],
            },
        ],
    });
    return res.json(phongDaTra);
}

module.exports = {
    getAllController,
    createPhongController,
    updatePhongController,
    findPhongbyIDController,
    deletePhongbyIDController,
    findPhongByNameController,
    getPhongTrongController,
    thuePhongController,
    getPhongDangThueController,
    traPhongController,
    getAllPhongDaTraController,
};
