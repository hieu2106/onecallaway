const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DichVuSD = sequelize.define(
    'dichvusd',
    {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        mahddv: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        madv: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dongia: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        luongsd: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    },
);

module.exports = DichVuSD;
