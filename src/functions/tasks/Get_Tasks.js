const status = require("../../utils/status_code/status_codes");
const {QueryTypes} = require("sequelize");
const sequelize = require("../../utils/database/database");
const TaskFactory = require("./Task_Factory");

const GetTasks = async (req, res) => {
	let offset = parseInt(req.query.offset);
	let limit = parseInt(req.query.limit);
	let level = parseInt(req.query.level);
	let topic_id = parseInt(req.query.topic_id);

	const sql =
		'select * from (select id as task_id, topic_id, level, name, instruction, "instructionImage" from "Task") T\n' +
		'left join (select id as SH_ID, task_id as sh_task_id, user_id, solved_status, attempted, deleted from "Solve_History") SH on task_id = SH_task_id\n' +
		"where (user_id is null) or (topic_id = " +
		topic_id +
		" and level = " +
		level +
		" and user_id = " +
		req.user.id +
		")\n" +
		"order by coalesce(solved_status, 1) asc, coalesce(attempted, 0) desc\n" +
		"limit " +
		limit +
		"\n" +
		"offset " +
		offset +
		";";

	await sequelize
		.query(sql, {
			type: QueryTypes.UPDATE,
		})
		.then(async (val) => {
			let ret = await TaskFactory(val[0]);
			res.status(status.SUCCESS).json(ret);
		})
		.catch((err) => {
			console.log(err);
			res.status(status.INTERNAL_SERVER_ERROR).json({error: "Something Went Wrong"});
		});
};

module.exports = GetTasks;
