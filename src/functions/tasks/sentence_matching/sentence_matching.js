const taskModel = require("../../../models/task");
const subTaskModel = require("../../../models/sub_task");
const SentenceMatchingModel = require("../../../models/sentence_matching");
const status = require("../../../utils/status_code/status_codes");
const {Op} = require("sequelize");

const findMatchingPairs = async (req, res) => {
	let offset = parseInt(req.query.offset);
	let limit = parseInt(req.query.limit);
	let level = parseInt(req.query.level);
	let topic_id = parseInt(req.query.topic_id);

	let allTasks = [],
		allTaskDetails = new Map(),
		allSubTasks = [],
		taskArray = new Map(),
		subTaskToTaskMap = new Map();

	const tasks = await taskModel.findAll({
		offset,
		limit,
		where: {
			topic_id,
			level,
			name: "Sentence Matching",
		},
	});

	for (let task of tasks) {
		allTasks.push(task.dataValues.id);
		allTaskDetails.set(task.dataValues.id, task.dataValues);
		taskArray.set(task.dataValues.id, []);
	}

	const subTasks = await subTaskModel.findAll({
		where: {
			task_id: {
				[Op.in]: allTasks,
			},
		},
	});

	for (let subTask of subTasks) {
		subTaskToTaskMap.set(subTask.dataValues.id, subTask.dataValues.task_id);
		allSubTasks.push(subTask.dataValues.id);
	}

	const sentences = await SentenceMatchingModel.findAll({
		where: {
			subTask_id: {
				[Op.in]: allSubTasks,
			},
		},
	});

	for (let sentence of sentences) {
		let sentencesToReturn = {
			part_one: sentence.dataValues.left_part
				.replace(/\<\/b\> /i, "</b>&nbsp;")
				.replace(/ \<b\>/i, "&nbsp;<b>"),
			part_two: sentence.dataValues.right_part
				.replace(/\<\/b\> /i, "</b>&nbsp;")
				.replace(/ \<b\>/i, "&nbsp;<b>"),
			explanation: sentence.dataValues.explanation,
		};

		let temp_arr = [...taskArray.get(subTaskToTaskMap.get(sentence.dataValues.subTask_id))];
		temp_arr.push(sentencesToReturn);
		taskArray.set(subTaskToTaskMap.get(sentence.dataValues.subTask_id), temp_arr);
	}

	let ret = [];

	// key has the task id. send the task detail
	taskArray.forEach((value, key) => {
		ret.push({taskDetail: allTaskDetails.get(key), sentences: value});
	});

	try {
		return res.status(status.SUCCESS).send(ret);
	} catch (error) {
		return res.status(status.INTERNAL_SERVER_ERROR).json({
			error: "Something went wrong",
		});
	}
};

module.exports = findMatchingPairs;
