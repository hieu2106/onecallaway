const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const NhanVien = sequelize.define(
    'nhanvien',
    {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
        },
        dob: {
            type: DataTypes.DATE,
        },
        phone: {
            type: DataTypes.STRING,
        },
        gender: {
            type: DataTypes.STRING,
        },
    },
    {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    },
);

module.exports = NhanVien;
