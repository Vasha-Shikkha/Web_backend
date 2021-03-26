const taskModel = require("../../../models/task");
const subTaskModel = require("../../../models/sub_task");
const mcqModel = require("../../../models/mcq");
const status = require("../../../utils/status_code/status_codes");
const {Op} = require("sequelize");

const findMcq = async (req, res) => {
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
			name: "MCQ",
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

	const mcqs = await mcqModel.findAll({
		where: {
			subTask_id: {
				[Op.in]: allSubTasks,
			},
		},
	});

	for (let mcq of mcqs) {
		let temp_arr = [...taskArray.get(subTaskToTaskMap.get(mcq.dataValues.subTask_id))];
		temp_arr.push(mcq);
		taskArray.set(subTaskToTaskMap.get(mcq.dataValues.subTask_id), temp_arr);
	}

	let ret = [];
	taskArray.forEach((value, key) => {
		ret.push({taskDetail: allTaskDetails.get(key), questions: value});
	});

	try {
		return res.status(status.SUCCESS).send(ret);
	} catch (error) {
		return res.status(status.INTERNAL_SERVER_ERROR).json({
			error: "Something went wrong",
		});
	}
};

module.exports = findMcq;
