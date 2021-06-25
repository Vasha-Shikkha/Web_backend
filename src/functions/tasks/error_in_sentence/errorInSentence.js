const errorInSentenceModel = require("../../../models/error_in_sentence");
const {Op} = require("sequelize");

const FetchMCQ = async (subTaskId) => {
	const questions = await errorInSentenceModel.findAll({
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
			answer: question.dataValues.answer,
			options: question.dataValues.options,
			explanation: question.dataValues.explanation,
		};

		returnableQuestion.push(exercise);
	}

	return {error: false, question: returnableQuestion};
};

module.exports = FetchMCQ;
