const taskModel = require("../../../models/task");
const subTaskModel = require("../../../models/sub_task");
const JumbledSentenceModel = require("../../../models/jumbled_sentence");
const {shuffle} = require("../../../utils/helper_functions");
const status = require("../../../utils/status_code/status_codes");
const {Op} = require("sequelize");

const findJumbledSentence = async (req, res) => {
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
			name: "Jumbled Sentence",
		},
	});

	for (let task of tasks) {
		allTasks.push(task.dataValues.id);
		allTaskDetails.set()
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

	const jumbled_sentence = await JumbledSentenceModel.findAll({
		where: {
			subTask_id: {
				[Op.in]: allSubTasks,
			},
		},
	});

	for (let js of jumbled_sentence) {
		let obj_to_return = {
			id: js.id,
			subTask_id: js.subTask_id,
			chunks: js.original_sentence,
			paragraph: js.paragraph,
			explanation: js.explanation,
		};

		let temp_arr = [...taskArray.get(subTaskToTaskMap.get(js.dataValues.subTask_id))];
		temp_arr.push(obj_to_return);
		taskArray.set(subTaskToTaskMap.get(js.dataValues.subTask_id), temp_arr);
	}

	let ret = [];
	taskArray.forEach((value,key) => {
		// ret.push(value);
		
		//let values=[];
		//for(let val of value) values.push(val);
		//ret.push({taskDetail: allTaskDetails.get(key),questions:values})
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

module.exports = findJumbledSentence;
