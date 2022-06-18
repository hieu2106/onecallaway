const sequelize = require('../config/database');
const { hashPassword } = require('../services/taikhoan.service');
const NhanVien = require('./nhanvien.model');
const TaiKhoan = require('./taikhoan.model');
const DichVu = require('./dichvu.model');
const KhachHang = require('./khachhang.model');
const HDDichVu = require('./hddichvu.model');
const DichVuSD = require('./dichvusudung.model');
const Phong = require('./phong.model');
const TienNghi = require('./tiennghi.model');
const TienNghiPhong = require('./tiennghiphong.model');
const PhieuThue = require('./phieuthue.model');
const PhieuTra = require('./phieutra.model');
const PhongThue = require('./phongthue.model');

NhanVien.hasOne(TaiKhoan);
TaiKhoan.belongsTo(NhanVien);

PhieuThue.hasMany(PhongThue);
PhongThue.belongsTo(PhieuThue);

PhieuThue.hasMany(PhieuTra);
PhieuTra.belongsTo(PhieuThue);

PhieuTra.hasMany(PhongThue);
PhongThue.belongsTo(PhieuTra);

Phong.hasMany(PhongThue);
PhongThue.belongsTo(Phong);

NhanVien.hasMany(PhieuThue);
PhieuThue.belongsTo(NhanVien);

KhachHang.hasMany(PhieuThue);
PhieuThue.belongsTo(KhachHang);

async function synchronize() {
    await sequelize.sync();
    const rootUser = await NhanVien.findOne({
        where: {
            name: 'Root User',
        },
        include: TaiKhoan,
    });
    if (!rootUser) {
        const nhanvien = await NhanVien.create({
            name: 'Root User',
            email: 'root@hihihaha.com',
            address: '123 Fake Street',
            dob: new Date(),
            phone: '123456789',
            gender: 'male',
        });
        const taikhoan = await TaiKhoan.create({
            username: 'root',
            password: hashPassword('root@123'),
        });
        await nhanvien.setTaikhoan(taikhoan);
    }
}
synchronize();

module.exports = {
    NhanVien,
    TaiKhoan,
    DichVu,
    KhachHang,
    HDDichVu,
    DichVuSD,
    Phong,
    TienNghi,
    TienNghiPhong,
    PhieuThue,
    PhieuTra,
    PhongThue,
};
