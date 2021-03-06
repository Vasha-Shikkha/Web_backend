const { DataTypes } = require('sequelize')
const database = require('../utils/database/database')

const sentence_matching = database.define(
    'Sentence Matching',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },

        left_part: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        right_part: {
            type: DataTypes.TEXT,
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
        },


    },
    {
        freezeTableName: true,
        timestamps: false,
    }

)

module.exports = sentence_matching
