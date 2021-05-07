const taskModel = require("../../models/task");
const solveHistoryModel = require("../../models/solve_history");
const status = require("../../utils/status_code/status_codes");
const TaskFactory = require("./TaskFactory");

const getTasks = async (req, res) => {
	let offset = parseInt(req.query.offset);
	let limit = parseInt(req.query.limit);
	let level = parseInt(req.query.level);
	let topic_id = parseInt(req.query.topic_id);

	await taskModel
		.findAll({
			offset,
			limit,
			where: {
				topic_id,
				level,
			},
			include: [
				{
					model: solveHistoryModel,
					required: false,
					where: {
						user_id: req.user.id,
					},
				},
			],
			order: [
				[{model: solveHistoryModel}, "solved_status", "asc"],
				[{model: solveHistoryModel}, "attempted", "desc"],
				["id", "asc"],
			],
		})
		.then(async (val) => {
			let ret = await TaskFactory(val);
			res.status(status.SUCCESS).json(ret);
		})
		.catch((err) => {
			console.log(err);
			res.status(status.INTERNAL_SERVER_ERROR).json({error: "Something Went Wrong"});
		});
};

module.exports = getTasks;
