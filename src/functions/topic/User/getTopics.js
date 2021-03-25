const topicModel = require("../../../models/topic");
const topicLevelCountModel = require("../../../models/topic_level_count");
const status_codes = require("../../../utils/status_code/status_codes");
const {Op} = require("sequelize");

const getTopics = async (req, res) => {
	const level = req.query.level;
	const type = req.query.type;

	if (!type || type.length === 0)
		return res.status(status_codes.BAD_REQUEST).json({error: "no types provided"});

	const eligibleTopics = [];
	const allTopics = await topicLevelCountModel.findAll({where: {level: level}});
	for (let topic of allTopics) {
		if (topic.dataValues.count > 0) {
			const tempTopics = await topicModel.findAll({
				where: {id: topic.dataValues.topic_id, type: type},
			});

			for (let topic2 of tempTopics) eligibleTopics.push(topic2.dataValues);
		}
	}

	res.status(status_codes.SUCCESS).json(eligibleTopics);
};

module.exports = getTopics;
