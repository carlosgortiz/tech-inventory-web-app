const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Hardware extends Model { }

Hardware.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [80],
        },
        purchase_date: {
            type: DataTypes.DATE,
            validate: {
                isDate: true,
            },
        },
        warranty: {
            type: DataTypes.INTEGER,
            validate: {
                isNumeric: true,
            },
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [80],
        },
        address: {
            type: DataTypes.STRING,
            len: [100],
        },
        department: {
            type: DataTypes.STRING,
            len: [80],
        },
        provider_id: {
            type: DataTypes.INTEGER,
            allowNull:true,
             references: {
                model: 'provider',
                key: 'id',
            }, 
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'hardware',
    }
);

module.exports = Hardware;
