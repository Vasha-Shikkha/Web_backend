const SentenceMatchingModel = require("../../../models/sentence_matching");
const {Op} = require("sequelize");

const FetchSentenceMatching = async (subTaskId) => {
	let questions = await SentenceMatchingModel.findAll({
		where: {
			subTask_id: {
				[Op.in]: subTaskId,
			},
		},
	});

	if (!questions) return {error: true, question: []};

	let returnableQuestion = [];
	for (let sentence of questions) {
		let exercise = {
			subTaskId: sentence.dataValues.subTask_id,
			part_one: sentence.dataValues.left_part
				.replace(/\<\/b\> /i, "</b>&nbsp;")
				.replace(/ \<b\>/i, "&nbsp;<b>"),
			part_two: sentence.dataValues.right_part
				.replace(/\<\/b\> /i, "</b>&nbsp;")
				.replace(/ \<b\>/i, "&nbsp;<b>"),
			explanation: sentence.dataValues.explanation,
		};

		returnableQuestion.push(exercise);
	}

	return {error: false, question: returnableQuestion};
};

module.exports = FetchSentenceMatching;
