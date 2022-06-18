const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PhieuThue = sequelize.define(
    'phieuthue',
    {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        manv: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        makh: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ngayden: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        ngaydenhan: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    },
);

module.exports = PhieuThue;
