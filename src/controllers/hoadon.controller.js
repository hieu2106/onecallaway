const {
    PhieuTra,
    PhieuThue,
    PhongThue,
    NhanVien,
    KhachHang,
} = require('../models');

async function getHoaDonByIdController(req, res) {
    const { id } = req.params;

    const hoaDon = await PhieuTra.findOne({
        where: {
            id,
        },
        include: [
            {
                model: PhieuThue,
                include: [
                    {
                        model: NhanVien,
                        attributes: ['id', 'name'],
                    },
                    {
                        model: KhachHang,
                        attributes: ['makh', 'tenkh', 'sdt'],
                    },
                ],
            },
            {
                model: PhongThue,
            },
        ],
    });

    return res.json(hoaDon);
}

module.exports = {
    getHoaDonByIdController,
};
