const fixJumbledSentenceModel = require("../../../models/jumbled_sentence");
const taskModel = require("../../../models/task");
const subTaskModel = require("../../../models/sub_task");
const topicLevelCreator = require("../../../utils/database/topicLevelCreator");
const status_codes = require("../../../utils/status_code/status_codes");

const insertJumbledWord = async (req, res) => {
	req.setTimeout(10 * 1000);
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
			name: "Jumbled Sentence",
		});

		// check if that topic-level-count exists
		// if not then create
		// else update
		await topicLevelCreator(task.topic_id, task.level_requirement);
	}

	// insert the tasks in the task-table
	await taskModel
		.bulkCreate(tasks, {
			fields: ["topic_id", "level", "name", "instruction", "instructionImage"],
		})
		.then((res) => {
			for (let task of res) {
				taskIDs.push(task.dataValues.id);
			}
		})
		.catch((err) => {
			return res.status(status_codes.INTERNAL_SERVER_ERROR).send({
				error: "Something went Wrong",
			});
		});

	// add sub-tasks
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

	await fixJumbledWordModel
		.bulkCreate(entries, {
			fields: ["subTask_id", "paragraph", "original_sentence", "explanation"],
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

module.exports = insertJumbledWord;
