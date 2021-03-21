const topicModel = require("../../../models/topic");
const status_codes = require("../../../utils/status_code/status_codes");

const updateTopic = async (req, res) => {
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

	topic.name = req.body.name;
	topic.type = req.body.type;

	topic
		.save()
		.then((r) => {
			if (r !== undefined) {
				return res.status(status_codes.SUCCESS).send({
					message: "Topic updated successfully",
				});
			}
		})
		.catch((err) => {
			return res.status(status_codes.INTERNAL_SERVER_ERROR).send({
				error: "Something went wrong",
			});
		});
};

module.exports = updateTopic;
