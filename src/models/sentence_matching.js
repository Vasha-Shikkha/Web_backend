const { DataTypes } = require('sequelize')
const database = require('../utils/database/database')
const Sequelize = require('sequelize')

const sentence_matching = database.define(
    'Sentence Matching',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
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
