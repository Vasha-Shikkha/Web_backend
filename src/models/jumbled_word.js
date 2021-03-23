const {DataTypes} = require("sequelize");
const database = require("../utils/database/database");
const Sequelize = require("sequelize");

const Jumbled_Word = database.define(
	"Fix Jumbled Word",
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

		paragraph: {
			type: DataTypes.TEXT,
			allowNull: true,
		},

		original_word: {
			type: DataTypes.TEXT,
			allowNull: false,
		},

		explanation: {
			type: DataTypes.TEXT,
			allowNull: true,
		},

		deleted: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
	},
	{
		freezeTableName: true,
		timestamps: false,
	}
);

module.exports = Jumbled_Word;