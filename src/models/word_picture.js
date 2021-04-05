const {DataTypes} = require("sequelize");
const database = require("../utils/database/database");
const Sequelize = require("sequelize");

const word_picture = database.define(
	"Word Picture",
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

		images: {
			type: DataTypes.ARRAY(DataTypes.TEXT),
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

module.exports = word_picture;
