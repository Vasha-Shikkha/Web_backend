const {DataTypes} = require("sequelize");
const database = require("../utils/database/database");
const Sequelize = require("sequelize");

const Solve_History = database.define(
	"Solve_History",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
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

		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: "User",
				key: "id",
				deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
				onDelete: "CASCADE",
				hooks: true,
			},
		},

		solved_status: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
		},

		attempted: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
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

module.exports = Solve_History;
