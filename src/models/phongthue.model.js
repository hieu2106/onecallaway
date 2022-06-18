const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PhongThue = sequelize.define(
    'phongthue',
    {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        giathue: {
            type: DataTypes.INTEGER,
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

module.exports = PhongThue;
