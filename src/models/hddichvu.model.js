const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const HDDichVu = sequelize.define(
    'hddichvu',
    {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        mahddv: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        dongia: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        luongsd: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ngaylap: {
            type: DataTypes.DATE,
        },
    },
    {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    },
);

module.exports = HDDichVu;
