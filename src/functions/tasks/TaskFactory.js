const FetchWordToPicture = require("./word_to_picture/wordToPicture");
const subTaskModel = require("../../models/sub_task");

const TaskFactory = async (tasks) => {
	let data = [];
	let taskId = [];
	let subTaskId = [];

	for (let task of tasks) {
		taskId.push(task.dataValues.id);
	}

	const subTasks = await subTaskModel.findAll({
		where: {
			task_id: {
				[Op.in]: allTasks,
			},
		},
	});

	for (let subTask of subTasks) {
		subTaskId.push(subTask.dataValues.id);
	}
	// switch (task.name) {
	// 	case "Word to Picture":
	// 		return await FetchWordToPicture(task);
	// 	default:
	// 		return {msg: "nai"};
	// }
	console.log(tasks);
	return [];
};

module.exports = TaskFactory;
