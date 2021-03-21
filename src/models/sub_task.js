const {DataTypes} = require("sequelize");
const database = require("../utils/database/database");
const Sequelize = require("sequelize");

const sub_task = database.define(
    'Sub_task',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },

        task_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Task",
                key: "id",
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
                onDelete: "CASCADE",
                hooks: true,
            },
        },
    },
    {
        freezeTableName: true,
        timestamps: false
    }
)

module.exports = sub_task

