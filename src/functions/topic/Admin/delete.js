const topicModel = require("../../../models/topic");
const status_codes = require("../../../utils/status_code/status_codes");

const deleteTopic = async (req, res) => {
	const topic = await topicModel.findOne({
		where: {
			id: req.query.id,
		},
	});

	if (!topic) {
		return res.status(status_codes.DATA_NOT_FOUND).send({
			error: "No such topic exists",
		});
	}

	let destroyed = await topicModel.destroy({
		where: {
			id: req.query.id,
		},
	});

	if (destroyed > 0) {
		return res.status(status_codes.SUCCESS).json({
			message: "Successfully deleted topic",
		});
	} else {
		return res.status(status_codes.INTERNAL_SERVER_ERROR).json({
			error: "Error while processing request",
		});
	}
};

module.exports = deleteTopic;
