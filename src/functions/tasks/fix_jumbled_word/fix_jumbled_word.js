const taskModel = require("../../../models/task");
const subTaskModel = require("../../../models/sub_task");
const JumbledWordModel = require("../../../models/jumbled_word");
const {shuffle} = require("../../../utils/helper_functions");
const status = require("../../../utils/status_code/status_codes");
const {Op} = require("sequelize");

const findJumbledWord = async (req, res) => {
	let offset = parseInt(req.query.offset);
	let limit = parseInt(req.query.limit);
	let level = parseInt(req.query.level);
	let topic_id = parseInt(req.query.topic_id);

	let allTasks = [],
		allSubTasks = [],
		allTaskDetails = new Map(),
		taskArray = new Map(),
		subTaskToTaskMap = new Map();

	const tasks = await taskModel.findAll({
		offset,
		limit,
		where: {
			topic_id,
			level,
			name: "Jumbled Word",
		},
	});

	for (let task of tasks) {
		allTasks.push(task.dataValues.id);
		allTaskDetails.set(task.dataValues.id,task.dataValues);
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

	const jumbled_word = await JumbledWordModel.findAll({
		where: {
			subTask_id: {
				[Op.in]: allSubTasks,
			},
		},
	});

	for (let jw of jumbled_word) {
		let obj_to_return = {
			id: jw.id,
			subTask_id: jw.subTask_id,
			chunks: shuffle(jw.original_word.split("")),
			answer: jw.original_word,
			paragraph: jw.paragraph,
			explanation: jw.explanation,
		};

		let temp_arr = [...taskArray.get(subTaskToTaskMap.get(js.dataValues.subTask_id))];
		temp_arr.push(obj_to_return);
		taskArray.set(subTaskToTaskMap.get(jw.dataValues.subTask_id), temp_arr);
	}

	let ret = [];
	taskArray.forEach((value) => {
		// ret.push(value);
		for (let val of value) ret.push(val);
	});

	try {
		return res.status(status.SUCCESS).send(ret);
	} catch (error) {
		return res.status(status.INTERNAL_SERVER_ERROR).json({
			error: "Something went wrong",
		});
	}
};

module.exports = findJumbledWord;
