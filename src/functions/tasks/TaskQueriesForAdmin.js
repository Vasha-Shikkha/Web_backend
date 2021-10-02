const taskModel = require("../../models/task");
const statusCodes = require("../../utils/status_code/status_codes");

exports.GetAllTasksByName = async (req, res) => {
	const taskName = req.query.taskName;
	try {
		const tasks = await taskModel.findAll({where: {name: taskName}});
		res.status(statusCodes.SUCCESS).json(tasks);
	} catch (e) {
		res.status(statusCodes.INTERNAL_SERVER_ERROR).send("Something Went Wrong");
	}
};
