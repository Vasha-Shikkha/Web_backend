const UserModel = require("../../../models/User");
const taskModel = require("../../../models/task");
const subTaskModel = require("../../../models/sub_task");
const FIllInTheBlanksModel = require("../../../models/fill_in_the_blanks");
const status = require("../../../utils/status_code/status_codes");
const {verifyToken} = require("../../../utils/token/token");
const {Op} = require("sequelize");

const findParagraph = async (req, res) => {
	let offset = parseInt(req.query.offset);
	let limit = parseInt(req.query.limit);
	let level = parseInt(req.query.level);
	let topic_id = parseInt(req.query.topic_id);
	const token = req.header("Authorization").replace("Bearer ", "");
	const data = verifyToken(token);
	let allTasks = [],
		allSubTasks = [],
		taskArray = [],
		subTaskToTaskMap = new Map();
	let user = await UserModel.findOne({
		where: {
			id: data.userID,
		},
	});

	if (!user) {
		return res.status(status.DATA_NOT_FOUND).json({
			error: "Could not process request at this moment",
		});
	}

	const tasks = await taskModel.findAll({
		offset,
		limit,
		where: {
			topic_id,
			level,
		},
	});

	for (let task of tasks) {
		taskArray.push([]);
		allTasks.push(task.dataValues.id);
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

	const paragraphs = await FIllInTheBlanksModel.findAll({
		where: {
			subTask_id: {
				[Op.in]: allSubTasks,
			},
		},
	});

	console.log(paragraphs);

	for (let paragraph of paragraphs) {
		let paragraphsToReturn = {
			paragraph: paragraph.dataValues.paragraph,
			options: paragraph.dataValues.options,
			answers: paragraph.dataValues.answers,
			explanation: paragraph.dataValues.explanation,
		};
		taskArray[subTaskToTaskMap.get(paragraph.dataValues.subTask_id) - 1].push(paragraphsToReturn);
	}

	try {
		return res.status(status.SUCCESS).send(taskArray);
	} catch (error) {
		return res.status(status.INTERNAL_SERVER_ERROR).json({
			error: "Something went wrong",
		});
	}
};

module.exports = findParagraph;
