const wordPictureModel = require("../../../models/word_picture");
const status_codes = require("../../../utils/status_code/status_codes");

const updateWordToPicture = async (req, res) => {
	const toUpdate = req.body.question
	toUpdate.forEach((question) => {
		wordPictureModel.update({
			question: question.question,
			images: question.images,
			answer: question.answer,
			explanation: question.explanation,
		}, {
			where: {
				subTask_id: question.subTaskId
			}
		}).then(() => {
			return res.status(status_codes.SUCCESS).json({
				message: "Content updated successfully"
			})
		}).catch(() => {
			return res.status(status_codes.INTERNAL_SERVER_ERROR).json({
				error: "Something went wrong"
			})
		})
	})
};

module.exports = updateWordToPicture;
