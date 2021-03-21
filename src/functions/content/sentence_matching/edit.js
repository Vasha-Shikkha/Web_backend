const sentenceMatchingModel = require("../../../models/sentence_matching");
const status_codes = require("../../../utils/status_code/status_codes");

const updateFB = async (req, res) => {
	sentenceMatchingModel
		.bulkCreate(req.body, {
			fields: ["id", "topic_id", "left_part", "right_part", "level_requirement", "explanation"],
			updateOnDuplicate: [
				"topic_id",
				"left_part",
				"right_part",
				"level_requirement",
				"explanation",
			],
		})
		.then((r) => {
			if (r !== undefined)
				return res.status(status_codes.SUCCESS).send({
					message: "Content update successful",
				});
		})
		.catch((err) => {
			return res.status(status_codes.INTERNAL_SERVER_ERROR).send({
				error: "Something went wrong",
			});
		});
};

module.exports = updateFB;
