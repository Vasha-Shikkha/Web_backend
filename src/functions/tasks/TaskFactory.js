const FetchWordToPicture = require("./word_to_picture/wordToPicture");
const subTaskModel = require("../../models/sub_task");
const {Op} = require("sequelize");

const TaskFactory = async (tasks) => {
	let taskId = [];
	let subTaskId = [];
	let taskMapping = new Map();
	let subTaskAndTaskMapping = new Map();

	let idx = 0;
	for (let task of tasks) {
		taskId.push(task.dataValues.id);
		taskMapping.set(task.dataValues.id, idx++);
	}

	const subTasks = await subTaskModel.findAll({
		where: {
			task_id: {
				[Op.in]: taskId,
			},
		},
	});

	idx = 0;
	for (let subTask of subTasks) {
		subTaskId.push(subTask.dataValues.id);
		subTaskAndTaskMapping.set(subTask.dataValues.id, subTask.dataValues.task_id);
	}

	let questions = [];
	for (let task of tasks) questions.push({taskDetail: task.dataValues});

	for (let task of tasks) {
		let data = {};
		switch (task.name) {
			case "Word to Picture":
				data = await FetchWordToPicture(subTaskId);
				if (!data.error) {
					idx = taskMapping.get(subTaskAndTaskMapping.get(data.question[0].subTaskId));
					questions[idx].question = data.question;
				}
			default:
				break;
		}
	}

	return questions;
};

module.exports = TaskFactory;
