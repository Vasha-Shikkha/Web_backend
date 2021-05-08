const JumbledWordModel = require("../../../models/jumbled_word");
const {shuffle} = require("../../../utils/helper_functions");
const {Op} = require("sequelize");

const fetchJumbledWord = async (subTaskId) => {
	const questions = await JumbledWordModel.findAll({
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
			subTask_id: question.dataValues.subTask_id,
			chunks: shuffle(question.dataValues.original_word.split("")),
			answer: question.dataValues.original_word,
			paragraph: question.dataValues.paragraph,
			explanation: question.dataValues.explanation,
		};

		returnableQuestion.push(exercise);
	}

	return {error: false, question: returnableQuestion};
};

module.exports = fetchJumbledWord;
