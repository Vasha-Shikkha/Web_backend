const taskModel = require("../../models/task");
const topicModel = require('../../models/topic');
const status = require("../../utils/status_code/status_codes");

const getTaskDetails = async (req, res) => {
	const tasks = await taskModel.findAll();

	/*
	*TODO: fetching topic name for each task has been done in a naive approach.
	* It can be improved my creating association between topic and task.
	 */

	let topics = {};

	await topicModel.findAll()
		.then(r => {
			r.forEach(topic => {
				topics[topic.id] = topic.name
			})
		})
		.catch(() => {
			return res.status(status.INTERNAL_SERVER_ERROR).json({
				error: "Error while fetching topics",
			});
		})

	tasks.forEach(task => {
		task.dataValues.topic_name = topics[task.topic_id]
	})

	try {
		return res.status(status.SUCCESS).send(tasks);
	} catch (error) {
		return res.status(status.INTERNAL_SERVER_ERROR).json({
			error: "Something went wrong",
		});
	}
};

module.exports = getTaskDetails;
