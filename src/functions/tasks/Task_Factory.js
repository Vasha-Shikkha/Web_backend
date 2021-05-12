const subTaskModel = require("../../models/sub_task");
const FetchWordToPicture = require("./word_to_picture/wordToPicture");
const FetchSentenceMatching = require("./sentence_matching/sentenceMatching");
const FetchPictureToWord = require("./picture_to_word/pictureToWord");
const FetchMCQ = require("./mcq/mcq");
const FetchJumbledWord = require("./fix_jumbled_word/jumbledWord");
const FetchJumbledSentence = require("./fix_jumbled_sentence/jumbledSentence");
const FetchFillInTheBlanks = require("./fill_in_the_blanks/fillInTheBlanks");
const FetchCaptionMatching = require("./caption_matching/captionMatching");
const {Op} = require("sequelize");
const TaskFactory = async (tasks) => {
	let questions = [];
	for (let task of tasks) {
		let data = {};
		let subTasks = await subTaskModel.findAll({
			where: {
				task_id: task.task_id,
			},
		});

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
			case "MCQ":
				data = await FetchMCQ(subTaskId);
				break;
			case "Jumbled Word":
				data = await FetchJumbledWord(subTaskId);
				break;
			case "Jumbled Sentence":
				data = await FetchJumbledSentence(subTaskId);
				break;
			case "Fill in the Blanks":
				data = await FetchFillInTheBlanks(subTaskId);
				break;
			case "Drag Caption to Picture":
				data = await FetchCaptionMatching(subTaskId);
				break;
			default:
				break;
		}

		//console.log(data.question);
		if (data && !data.error && data.question) {
			questions.push({taskDetail: task, question: data.question});
		}
	}

	return questions;
};

module.exports = TaskFactory;
