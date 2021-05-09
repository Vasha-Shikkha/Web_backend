const WordToPictureModel = require("../../../models/word_picture");
const {Op} = require("sequelize");

const FetchWordToPicture = async (subTaskId) => {
	let questions = await WordToPictureModel.findAll({
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

module.exports = FetchWordToPicture;
