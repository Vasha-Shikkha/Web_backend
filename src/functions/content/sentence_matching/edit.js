const sentenceMatchingModel = require("../../../models/sentence_matching");
const status_codes = require("../../../utils/status_code/status_codes");

const updateSM = async (req, res) => {
	const toUpdate = req.body.question
	toUpdate.forEach((question) => {
		sentenceMatchingModel.update({
			left_part: question.part_one,
			right_part: question.part_two,
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

module.exports = updateSM;
