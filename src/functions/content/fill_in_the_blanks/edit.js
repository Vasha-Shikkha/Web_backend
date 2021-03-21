const fillInTheBlanksModel = require("../../../models/fill_in_the_blanks");
const status_codes = require("../../../utils/status_code/status_codes");

const updateFB = async (req, res) => {
	fillInTheBlanksModel
		.bulkCreate(req.body, {
			fields: [
				"id",
				"topic_id",
				"paragraph",
				"options",
				"answers",
				"level_requirement",
				"explanation",
				"context",
			],
			updateOnDuplicate: [
				"topic_id",
				"paragraph",
				"options",
				"answers",
				"level_requirement",
				"explanation",
				"context",
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
