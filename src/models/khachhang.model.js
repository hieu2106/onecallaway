const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const KhachHang = sequelize.define(
    'khachhang',
    {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        makh: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        tenkh: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        diachi: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dob: {
            type: DataTypes.DATE,
        },
        sdt: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quoctich: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        hochieu: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        cccd: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    },
);

module.exports = KhachHang;
