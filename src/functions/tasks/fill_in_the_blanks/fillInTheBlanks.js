const FIllInTheBlanksModel = require("../../../models/fill_in_the_blanks");
const {Op} = require("sequelize");

const FetchFillInTheBlanks = async (subTaskId) => {
	const questions = await FIllInTheBlanksModel.findAll({
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
			paragraph: question.dataValues.paragraph,
			options: question.dataValues.options,
			answers: question.dataValues.answers,
			explanation: question.dataValues.explanation,
		};

		returnableQuestion.push(exercise);
	}

	return {error: false, question: returnableQuestion};
};

module.exports = FetchFillInTheBlanks;
