const mcqModel = require("../../../models/mcq");
const taskModel = require("../../../models/task");
const subTaskModel = require("../../../models/sub_task");
const topicLevelCreator = require("../../../utils/database/topicLevelCreator");
const status_codes = require("../../../utils/status_code/status_codes");

const insertMCQ = async (req, res) => {
	let tasks = [],
		taskIDs = [],
		subTaskEntries = [],
		subTaskIDs = [],
		entries = [];

	for (let task of req.body) {
		tasks.push({
			topic_id: task.topic_id,
			level: task.level_requirement,
			name: "MCQ",
		});

		// check if that topic-level-count exists
		// if not then create
		// else update
		await topicLevelCreator(task.topic_id, task.level_requirement);
	}

	return res.status(200).json({msg: "succ"});
};

module.exports = insertMCQ;
