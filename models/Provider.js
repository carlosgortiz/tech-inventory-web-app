const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Provider extends Model { }

Provider.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            len: [50],
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        tel: {
            type: DataTypes.INTEGER,
            validate: {
                isNumeric: true,
            },
        },

    },
    {
        sequelize,
        freezeTableName: true,
        underscored: false,
        modelName: 'provider',
    }
);

module.exports = Provider;
