const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Software extends Model { }

Software.init(
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
        underscored: false,
        modelName: 'software',
    }
);

module.exports = Software;