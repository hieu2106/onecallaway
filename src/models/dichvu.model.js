const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DichVu = sequelize.define(
    'dichvu',
    {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        madv: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        tendv: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dongia: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        mota: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    },
);

module.exports = DichVu;
