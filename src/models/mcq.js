const { DataTypes } = require('sequelize')
const database = require('../utils/database/database')
const Sequelize = require('sequelize')

const Mcq = database.define(
    'Mcq',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },

        question: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        options: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        },

        answer: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        level_requirement: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },

        explanation: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
)

module.exports = Mcq
