const taskModel = require("../../models/task");
const subTaskModel = require("../../models/sub_task");
const FetchWordToPicture = require("./word_to_picture/wordToPicture");
const FetchSentenceMatching = require("./sentence_matching/sentenceMatching");
const FetchPictureToWord = require("./picture_to_word/pictureToWord");
const FetchMCQ = require("./mcq/mcq");
const FetchErrorInSentence = require("./error_in_sentence/errorInSentence");
const FetchJumbledWord = require("./fix_jumbled_word/jumbledWord");
const FetchJumbledSentence = require("./fix_jumbled_sentence/jumbledSentence");
const FetchFillInTheBlanks = require("./fill_in_the_blanks/fillInTheBlanks");
const FetchCaptionMatching = require("./caption_matching/captionMatching");
const status = require("../../utils/status_code/status_codes");
const sequelize = require("sequelize");

const getExerciseById = async (req, res) => {
	let questions = [];

	let task = await taskModel.findOne({
		where: {
			id: req.query.id,
		},
	});

	let subTasks = await subTaskModel.findAll({
		where: {
			task_id: req.query.id,
		},
	});

	let subTaskId = [];
	for (let subTask of subTasks) subTaskId.push(subTask.dataValues.id);

	switch (task.dataValues.name) {
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
		case "Error in Sentence":
			data = await FetchErrorInSentence(subTaskId);
		default:
			break;
	}
	data.question.sort((a, b) => a.subTaskId - b.subTaskId);
	// console.log(data);

	if (data && !data.error && data.question) {
		questions.push({taskname: task.dataValues.name, question: data.question});
	}

	//console.log(questions);
	//return questions;
	return res.status(status.SUCCESS).json(questions);
};

module.exports = getExerciseById;
