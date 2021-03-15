const {DataTypes} = require("sequelize");
const database = require("../utils/database/database");
const Sequelize = require("sequelize");

const flashCard = database.define(
	"Flashcard",
	{
		user_id: {
			type: Sequelize.INTEGER,
			references: {
				model: "User",
				key: "id",
				deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
			},
			allowNull: false,
			primaryKey: true,
		},

		word: {
			type: Sequelize.STRING,
			references: {
				model: "Dictionary",
				key: "word",
				deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
				onDelete: "CASCADE",
				hooks: true,
			},
			allowNull: false,
			primaryKey: true,
		},

		last_searched: {
			type: "TIMESTAMP",
			allowNull: false,
			defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
		},
	},
	{
		freezeTableName: true,
		timestamps: false,
	}
);

module.exports = flashCard;
