const { DataTypes } = require('sequelize')
const database = require('../utils/database/database')

const Jumbled_sentence = database.define(
    'Fix Jumbled Sentence',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

        original_sentence: {
            type: DataTypes.TEXT,
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
            allowNull: true
        },

        deleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
)

module.exports = Jumbled_sentence
