const {DataTypes} = require("sequelize");
const database = require("../utils/database/database");
const Sequelize = require("sequelize");

const AdminToken = database.define(
	"AdminToken",
	{
		adminID: {
			type: Sequelize.INTEGER,
			references: {
				model: "Admin",
				key: "id",
				deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
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

module.exports = AdminToken;
