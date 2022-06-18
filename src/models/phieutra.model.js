const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PhieuTra = sequelize.define(
    'phieutra',
    {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        ngaytra: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    },
);

module.exports = PhieuTra;
