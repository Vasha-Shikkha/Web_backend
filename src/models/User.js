const { DataTypes } = require('sequelize')
const database = require('../utils/database/database')
const { hash_password, compare } = require('../utils/encryption/hash_passowrd')

const User = database.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        phone: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        level: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        }

    },
    {
        freezeTableName: true,
        timestamps: true
    }
)

User.beforeCreate(async (user, options) => {
    const hashed_password = await hash_password(user.password)
    user.password = hashed_password
})

module.exports = User
