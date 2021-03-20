const {DataTypes} = require("sequelize");
const database = require("../utils/database/database");

const dictionary = database.define(
	"Dictionary",
	{
		word: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			primaryKey: true,
		},

		meaning: {
			type: DataTypes.ARRAY(DataTypes.STRING),
			allowNull: false,
		},

		example: {
			type: DataTypes.ARRAY(DataTypes.TEXT),
			allowNull: true,
		},
	},
	{
		freezeTableName: true,
		timestamps: false,
	}
);

module.exports = dictionary;
