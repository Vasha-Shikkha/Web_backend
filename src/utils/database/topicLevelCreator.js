const topicLevelCountModel = require("../../models/topic_level_count");

const topicLevelCreator = async (topic_id, level) => {
	let topicLevelCount = await topicLevelCountModel.findOne({
		where: {level, topic_id},
	});

	if (topicLevelCount) {
		await topicLevelCount.update({count: topicLevelCount.dataValues.count + 1});
	} else {
		await topicLevelCountModel.create({
			topic_id,
			level,
			count: 1,
		});
	}
};

module.exports = topicLevelCreator;
