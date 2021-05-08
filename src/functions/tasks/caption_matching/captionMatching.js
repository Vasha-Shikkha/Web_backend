const CaptionMatchingModel = require("../../../models/picture_caption");
const {Op} = require("sequelize");

const FetchMatchingPairs = async (subTaskId) => {
	const questions = await CaptionMatchingModel.findAll({
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
			image: question.dataValues.image,
			caption: question.dataValues.caption,
			explanation: question.dataValues.explanation,
		};

		returnableQuestion.push(exercise);
	}

	return {error: false, question: returnableQuestion};
};

module.exports = FetchMatchingPairs;
