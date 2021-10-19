const mcqModel = require("../../../models/mcq");
const status_codes = require("../../../utils/status_code/status_codes");

const updateMCQ = async (req, res) => {
	const toUpdate = req.body.question
	toUpdate.forEach((question) => {
		mcqModel.update({
			question: question.question,
			options: question.options,
			answer: question.answer,
			explanation: question.explanation
		}, {
			where: {
				subTask_id: question.subTask_id
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

module.exports = updateMCQ;
