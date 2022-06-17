const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TienNghi = sequelize.define(
    'tiennghi',
    {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        matn: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        tentn: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tinhtrang: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        slco: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    },
);

module.exports = TienNghi;
