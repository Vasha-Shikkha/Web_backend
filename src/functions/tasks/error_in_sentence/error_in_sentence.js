const taskModel = require("../../../models/task");
const subTaskModel = require("../../../models/sub_task");
const ErrorInSentenceModel = require("../../../models/error_in_sentence");
const {shuffle} = require("../../../utils/helper_functions");
const status = require("../../../utils/status_code/status_codes");
const {Op} = require("sequelize");

const findErrorInSentence = async (req, res) => {
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
			name: "Error In Sentence",
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

	const error_in_sentence = await ErrorInSentenceModel.findAll({
		where: {
			subTask_id: {
				[Op.in]: allSubTasks,
			},
		},
	});

	for (let object of error_in_sentence) {
		let obj_to_return = {
			id: object.id,
			subTask_id: object.subTask_id,
			sentence: object.sentence,
            options: object.options,
            answer: object.answer,
			explanation: object.explanation,
            isMCQ: object.isMCQ
		};

		let temp_arr = [...taskArray.get(subTaskToTaskMap.get(object.dataValues.subTask_id))];
		temp_arr.push(obj_to_return);
		taskArray.set(subTaskToTaskMap.get(object.dataValues.subTask_id), temp_arr);
	}

	let ret = [];
	taskArray.forEach((value,key) => {
		// ret.push(value);
		
		//let values=[];
		//for(let val of value) values.push(val);
		ret.push({taskDetail: allTaskDetails.get(key),questions:value});
		
		
		//for (let val of value) ret.push(val);
	});

	try {
		return res.status(status.SUCCESS).send(ret);
	} catch (error) {
		return res.status(status.INTERNAL_SERVER_ERROR).json({
			error: "Something went wrong",
		});
	}
};

module.exports = findErrorInSentence;
