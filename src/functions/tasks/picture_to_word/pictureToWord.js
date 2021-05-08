const taskModel = require("../../../models/task");
const subTaskModel = require("../../../models/sub_task");
const PictureToWordModel = require("../../../models/picture_word");
const status = require("../../../utils/status_code/status_codes");
const {Op} = require("sequelize");

const FetchPictureToWord = async (subTaskId) => {
	const questions = await PictureToWordModel.findAll({
		where: {
			subTask_id: {
				[Op.in]: subTaskId,
			},
		},
	});

	if (!questions) return {error: true, question: []};

	let returnableQuestion = [];
	for (let question of questions) {
		let exercise = {
			subTaskId: question.dataValues.subTask_id,
			question: question.dataValues.question,
			images: question.dataValues.images,
			answer: question.dataValues.answer,
			explanation: question.dataValues.explanation,
		};

		returnableQuestion.push(exercise);
	}

	return {error: false, question: returnableQuestion};
};

module.exports = FetchPictureToWord;
