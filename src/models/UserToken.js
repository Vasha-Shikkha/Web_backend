const { DataTypes } = require('sequelize')
const database = require('../utils/database/database')
const Sequelize = require('sequelize')
const UserModel = require('./User')
const moment = require('moment')

const UserToken = database.define(
    'UserToken',
    {
        userID: {
            type: Sequelize.INTEGER,
            references: {
                model: 'User',
                key: 'id',
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            },
            allowNull: false,
            primaryKey: true,
        },
        deviceIP: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        time: {
            type: 'TIMESTAMP',
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
)

module.exports = UserToken
