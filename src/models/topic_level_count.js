const { DataTypes } = require('sequelize');
const database = require('../utils/database/database');

/**
 * @swagger
 * components:
 *   schemas:
 *     Topic_Level_Count:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           descriptions: primary key
 *         topic_id:
 *           type: string
 *           descriptions: id of the topic
 *         level:
 *           type: number
 *         count:
 *           type: number
 *       required:
 *         - id
 *         - topic_id
 *         - level
 *         - count
 */
const topic_level_count = database.define(
	'Topic_Level_Count',
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
		},

		topic_id: {
			type: DataTypes.STRING,
			allowNull: false,
			references: {
				model: 'Topic',
				key: 'id',
				deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
				onDelete: 'CASCADE',
				hooks: true,
			},
		},

		level: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},

		count: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		freezeTableName: true,
		timestamps: false,
	}
);

module.exports = topic;
