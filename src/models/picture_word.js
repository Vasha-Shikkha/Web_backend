const {DataTypes} = require("sequelize");
const database = require("../utils/database/database");
const Sequelize = require("sequelize");

const picture_word = database.define(
    "Picture Word",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },

        subTask_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Sub_task",
                key: "id",
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
                onDelete: "CASCADE",
                hooks: true,
            },
        },

        question: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        image: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        options: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        },

        answer: {
            type: DataTypes.STRING,
            allowNull: false,
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
);

module.exports = picture_word;
