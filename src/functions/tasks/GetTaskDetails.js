const taskModel = require("../../models/task");
const topicModel = require("../../models/topic");
const status = require("../../utils/status_code/status_codes");

const getTaskDetails = async (req, res) => {
	const tasks = await taskModel.findAll();

	/*
	 *TODO: fetching topic name for each task has been done in a naive approach.
	 * It can be improved my creating association between topic and task.
	 */

	let topics = {};

	await topicModel
		.findAll()
		.then((r) => {
			r.forEach((topic) => {
				topics[topic.id] = {
					topic_name: topic.name,
					topic_type: topic.type,
				};
			});
		})
		.catch(() => {
			return res.status(status.INTERNAL_SERVER_ERROR).json({
				error: "Error while fetching topics",
			});
		});

	tasks.forEach((task) => {
		task.dataValues.topic_name = topics[task.topic_id].topic_name;
		task.dataValues.topic_type = topics[task.topic_id].topic_type;
	});

	try {
		return res.status(status.SUCCESS).send(tasks);
	} catch (error) {
		return res.status(status.INTERNAL_SERVER_ERROR).json({
			error: "Something went wrong",
		});
	}
};

module.exports = getTaskDetails;
