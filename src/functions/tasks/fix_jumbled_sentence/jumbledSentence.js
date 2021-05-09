const JumbledSentenceModel = require("../../../models/jumbled_sentence");
const {Op} = require("sequelize");

const FetchJumbledSentence = async (subTaskId) => {
	const questions = await JumbledSentenceModel.findAll({
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
			subTask_id: question.subTask_id,
			chunks: question.original_sentence,
			paragraph: question.paragraph,
			explanation: question.explanation,
		};

		returnableQuestion.push(exercise);
	}

	return {error: false, question: returnableQuestion};
};

module.exports = FetchJumbledSentence;
