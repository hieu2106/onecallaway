const sequelize = require('../config/database');
const { hashPassword } = require('../services/taikhoan.service');
const NhanVien = require('./nhanvien.model');
const TaiKhoan = require('./taikhoan.model');

NhanVien.hasOne(TaiKhoan);
TaiKhoan.belongsTo(NhanVien);

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

module.exports = { NhanVien, TaiKhoan };
