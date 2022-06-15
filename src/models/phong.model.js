const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Phong = sequelize.define(
    'phong',
    {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        maphong: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dientich: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dongia: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        loaiphong: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    },
);

module.exports = Phong;
