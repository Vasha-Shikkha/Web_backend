const fillInTheBlanksModel = require("../../../models/fill_in_the_blanks");
const status_codes = require("../../../utils/status_code/status_codes");

const updateFB = async (req, res) => {
	const toUpdate = req.body.question
	toUpdate.forEach((question) => {
		fillInTheBlanksModel.update({
			paragraph: question.paragraph,
			options: question.options,
			answers: question.answers,
			explanation: question.explanation
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

module.exports = updateFB;
