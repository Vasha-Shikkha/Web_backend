const { DataTypes } = require('sequelize')
const database = require('../utils/database/database')
const Sequelize = require('sequelize')

const fill_in_the_gaps = database.define(
    'Fill in the gaps',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },

        paragraph: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        options: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        },

        answers: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        },

        context: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
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
        },
    },

    {
        freezeTableName: true,
        timestamps: false,
    }
)

module.exports = fill_in_the_gaps