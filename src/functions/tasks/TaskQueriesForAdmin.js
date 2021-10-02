const taskModel = require("../../models/task");
const {QueryTypes} = require("sequelize");
const sequelize = require("../../utils/database/database");
const statusCodes = require("../../utils/status_code/status_codes");

exports.GetAllTasksByName = async (req, res) => {
	const taskName = req.query.taskName;
	const sql = `select t.id, t.level, tp.name, tp.type
		 from "Task" as t
		 inner join "Topic" as tp on t.topic_id = tp.id
		 where t.name = '${taskName}'`;

	await sequelize
		.query(sql, {
			type: QueryTypes.SELECT,
		})
		.then(async (value) => {
			res.status(statusCodes.SUCCESS).json(value);
		})
		.catch((err) => {
			res.status(statusCodes.INTERNAL_SERVER_ERROR).send("Something Went Wrong");
		});
};
