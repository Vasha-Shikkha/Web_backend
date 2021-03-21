const fixJumbledSentenceModel = require("../../../models/jumbled_sentence");
const status_codes = require("../../../utils/status_code/status_codes");

const insertFB = async (req, res) => {
	fixJumbledSentenceModel
		.bulkCreate(req.body, {
			fields: ["topic_id", "original_sentence", "level_requirement", "explanation", "context"],
		})
		.then((r) => {
			if (r !== undefined)
				return res.status(status_codes.SUCCESS).send({
					message: "Content insertion successful",
				});
		})
		.catch((err) => {
			return res.status(status_codes.INTERNAL_SERVER_ERROR).send({
				error: "Something went wrong",
			});
		});
};

module.exports = insertFB;
