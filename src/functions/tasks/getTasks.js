const taskModel = require("../../models/task");
const solveHistoryModel = require("../../models/solve_history");
const status = require("../../utils/status_code/status_codes");

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
		.then((val) => res.status(status.SUCCESS).json(val))
		.catch((err) => {
			console.log(err);
			res.status(status.INTERNAL_SERVER_ERROR).json({error: "Something Went Wrong"});
		});
};

module.exports = getTasks;
