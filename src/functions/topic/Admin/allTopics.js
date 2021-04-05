const topicModel = require("../../../models/topic");
const status_codes = require("../../../utils/status_code/status_codes");

const getAllTopics = async (req, res) => {
	let topics = await topicModel.findAll();

	if (topics) res.status(status_codes.SUCCESS).send(topics);
	else
		res.status(status_codes.INTERNAL_SERVER_ERROR).send({
			error: "Something went Wrong",
		});
};

module.exports = getAllTopics;
