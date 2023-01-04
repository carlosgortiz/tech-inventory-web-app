const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class DevicePackage extends Model { }

DevicePackage.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        
        hardware_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'hardware',
                key: 'id',
            },
        },
        software_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'software',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: false,
        modelName: 'devicePackage',
    }
);

module.exports = DevicePackage;
