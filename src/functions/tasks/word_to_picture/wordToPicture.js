const WordToPictureModel = require("../../../models/word_picture");

const FetchWordToPicture = async (subTaskId) => {
	await WordToPictureModel.findAll({
		where: {
			subTask_id: {
				[Op.in]: subTaskId,
			},
		},
	})
		.then((questions) => {
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
				return {error: null, question: returnableQuestion};
			}
		})
		.catch((error) => {
			return {error, question: []};
		});
};

module.exports = FetchWordToPicture;
