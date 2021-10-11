const {DataTypes} = require("sequelize");
const database = require("../utils/database/database");
const Sequelize = require("sequelize");

const task = database.define(
	"Task",
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
		},

		topic_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: "Topic",
				key: "id",
				deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
				onDelete: "CASCADE",
				hooks: true,
			},
		},

		level: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 1,
		},

		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		instruction: {
			type: DataTypes.TEXT,
			allowNull: true,
		},

		instructionImage: {
			type: DataTypes.STRING,
			allowNull: true,
		},

		tutorial: {
			type: DataTypes.STRING,
			allowNull: true
		}
	},
	{
		freezeTableName: true,
		timestamps: false,
	}
);

module.exports = task;
