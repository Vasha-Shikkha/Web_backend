const taskModel = require("../../../models/task");
const subTaskModel = require("../../../models/sub_task");
const WordToPictureModel = require("../../../models/word_picture");
const status = require("../../../utils/status_code/status_codes");
const {Op} = require("sequelize");

const findWordToPicture = async (req, res) => {
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
			name: "Word to Picture",
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

	const word_to_picture = await WordToPictureModel.findAll({
		where: {
			subTask_id: {
				[Op.in]: allSubTasks,
			},
		},
	});

	for (let wp of word_to_picture) {
		let exercise = {
			question: wp.dataValues.question,
			images: wp.dataValues.images,
			answer: wp.dataValues.answer,
			explanation: wp.dataValues.explanation,
		};

		let temp_arr = [...taskArray.get(subTaskToTaskMap.get(wp.dataValues.subTask_id))];
		temp_arr.push(exercise);
		taskArray.set(subTaskToTaskMap.get(wp.dataValues.subTask_id), temp_arr);
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

module.exports = findWordToPicture;
