const {DataTypes} = require("sequelize");
const database = require("../utils/database/database");

/**
 * @swagger
 * components:
 *   schemas:
 *     Topic:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           descriptions: primary key
 *         name:
 *           type: string
 *           descriptions: name of the topic
 *         type:
 *           type: string
 *           description: either Grammar or Communicative
 *         image:
 *           type: string
 *       required:
 *         - id
 *         - name
 *         - type
 */
const topic = database.define(
	"Topic",
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

		type: {
			type: DataTypes.STRING,
			allowNull: false,
		},

		image: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		freezeTableName: true,
		timestamps: false,
	}
);

module.exports = topic;
