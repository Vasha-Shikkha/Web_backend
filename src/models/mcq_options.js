const { DataTypes } = require('sequelize')
const database = require('../utils/database/database')
const Sequelize = require('sequelize')

const McqOption = database.define(
    'Mcq_Option',
    {
        option_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },

        mcq_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Mcq',
                key: 'id',
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            },
            allowNull: false,
        },

        value: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
)

module.exports = McqOption
