const taskModel = require("../../models/task");
const status = require("../../utils/status_code/status_codes");

const getTaskDetails = async (req, res) => {
	const tasks = await taskModel.findAll();

	try {
		return res.status(status.SUCCESS).send(tasks);
	} catch (error) {
		return res.status(status.INTERNAL_SERVER_ERROR).json({
			error: "Something went wrong",
		});
	}
};

module.exports = getTaskDetails;
