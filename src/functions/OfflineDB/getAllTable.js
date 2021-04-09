const topicModel = require("../../models/topic");
const topicLevelCountModel = require("../../models/topic_level_count");
const status_codes = require("../../../utils/status_code/status_codes");

exports.getTopicTable = async (req, res) => {
	let topics = await topicModel.findAll();

	if (topics) res.status(status_codes.SUCCESS).send(topics);
	else
		res.status(status_codes.INTERNAL_SERVER_ERROR).send({
			error: "Something went Wrong",
		});
};

exports.getTopicLevelCountTable = async (req, res) => {
	let topics = await topicLevelCountModel.findAll();

	if (topics) res.status(status_codes.SUCCESS).send(topics);
	else
		res.status(status_codes.INTERNAL_SERVER_ERROR).send({
			error: "Something went Wrong",
		});
};
