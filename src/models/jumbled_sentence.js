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

        topic_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Topic',
                key: 'id',
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
                onDelete: 'CASCADE',
                hooks: true
            }
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

        explanation: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        context: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
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
