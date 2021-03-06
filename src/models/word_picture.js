const { DataTypes } = require('sequelize')
const database = require('../utils/database/database')

const word_picture = database.define(
    'Word Picture',
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

        images: {
            type: DataTypes.ARRAY(DataTypes.TEXT),
            allowNull: false,
        },

        answer: {
            type: DataTypes.INTEGER,
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
        timestamps: false
    }
)

module.exports = word_picture
