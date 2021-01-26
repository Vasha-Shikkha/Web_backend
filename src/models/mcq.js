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

        answer: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        level_requirement: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },

        explanation_english: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        explanation_bangla: {
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
