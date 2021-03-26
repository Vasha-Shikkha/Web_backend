const taskModel = require("../../../models/task");
const subTaskModel = require("../../../models/sub_task");
const fillInTheBlanksModel = require("../../../models/fill_in_the_blanks");
const topicLevelCreator = require("../../../utils/database/topicLevelCreator");
const status_codes = require("../../../utils/status_code/status_codes");

const insertFB = async (req, res) => {
	req.setTimeout(2 * 1000);
	let tasks = [],
		taskIDs = [],
		subTaskEntries = [],
		subTaskIDs = [],
		entries = [];

	for (let task of req.body) {
		tasks.push({
			topic_id: task.topic_id,
			level: task.level_requirement,
			instruction: task.instruction,
			instructionImage: task.instructionImage,
			name: "Fill in the Blanks",
		});

		// check if that topic-level-count exists
		// if not then create
		// else update
		await topicLevelCreator(task.topic_id, task.level_requirement);
	}

	await taskModel
		.bulkCreate(tasks, {
			fields: ["topic_id", "level", "name"],
		})
		.then((r) => {
			for (let task of r) {
				taskIDs.push(task.dataValues.id);
			}
		})
		.catch((err) => {
			return res.status(status_codes.INTERNAL_SERVER_ERROR).send({
				error: "Something went wrong",
			});
		});

	for (let i in req.body) {
		let task = req.body[i];
		for (let j = 0; j < task.subtask.length; j++) {
			subTaskEntries.push({
				task_id: taskIDs[i],
			});
		}
	}

	await subTaskModel
		.bulkCreate(subTaskEntries, {
			fields: ["task_id"],
		})
		.then((r) => {
			for (let subTask of r) {
				subTaskIDs.push(subTask.dataValues.id);
			}
		})
		.catch((err) => {
			return res.status(status_codes.INTERNAL_SERVER_ERROR).send({
				error: "Something went wrong",
			});
		});

	let k = 0;

	for (let i in req.body) {
		let task = req.body[i];
		for (let j = 0; j < task.subtask.length; j++) {
			let subTask = task.subtask[j];
			subTask.subTask_id = subTaskIDs[k];
			k++;
			entries.push(subTask);
		}
	}

	await fillInTheBlanksModel
		.bulkCreate(entries, {
			fields: ["subTask_id", "paragraph", "options", "answers", "explanation"],
		})
		.then((r) => {
			if (r !== undefined)
				return res.status(status_codes.SUCCESS).send({
					message: "Content insertion successful",
				});
		})
		.catch((err) => {
			console.log(err);
			return res.status(status_codes.INTERNAL_SERVER_ERROR).send({
				error: "Something went wrong",
			});
		});
};

module.exports = insertFB;
