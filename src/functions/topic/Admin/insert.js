const topicModel = require("../../../models/topic");
const status_codes = require("../../../utils/status_code/status_codes");

const createTopic = async (req, res) => {
	topicModel
		.create(req.body)
		.then((r) => {
			if (r !== undefined)
				return res.status(status_codes.SUCCESS).send({
					message: "Topic created successfully",
				});
		})
		.catch((err) => {
			return res.status(status_codes.INTERNAL_SERVER_ERROR).send({
				error: "Something went wrong",
			});
		});
};

module.exports = createTopic;
