const subTaskModel = require("../../models/sub_task");
const FetchWordToPicture = require("./word_to_picture/wordToPicture");
const FetchSentenceMatching = require("./sentence_matching/sentenceMatching");
const FetchPictureToWord = require("./picture_to_word/pictureToWord");

const TaskFactory = async (tasks) => {
	let questions = [];
	for (let task of tasks) {
		let data = {};
		let subTasks = await subTaskModel.findAll(
			{attributes: ["id"]},
			{
				where: {
					task_id: task.dataValues.id,
				},
			}
		);

		let subTaskId = [];
		for (let subTask of subTasks) subTaskId.push(subTask.dataValues.id);

		switch (task.name) {
			case "Word to Picture":
				data = await FetchWordToPicture(subTaskId);
				break;
			case "Sentence Matching":
				data = await FetchSentenceMatching(subTaskId);
				break;
			case "Picture to Word":
				data = await FetchPictureToWord(subTaskId);
				break;
			default:
				break;
		}

		if (data && !data.error && data.question) {
			questions.push({taskDetail: task.dataValues, question: data.question});
		}
	}

	return questions;
};

module.exports = TaskFactory;
