const { DataTypes } = require('sequelize')
const database = require('../utils/database/database')

const topic = database.define(
    'Topic',
    {
        id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            autoIncrement:true,
            primaryKey: true
        },

        name: {
            type: DataTypes.STRING,
            allowNull:false
        },

        type: {
            type: DataTypes.STRING,
            allowNull:false
        }
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
)

module.exports = topic
