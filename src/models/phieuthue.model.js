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
        tiencoc: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    },
);

module.exports = PhieuThue;
