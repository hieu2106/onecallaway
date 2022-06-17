const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TienNghiPhong = sequelize.define(
    'tiennghiphong',
    {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        matn: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        maphong: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        soluong: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    },
);

module.exports = TienNghiPhong;
