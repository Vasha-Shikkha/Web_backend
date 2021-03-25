const taskModel = require("../../../models/task");
const status_codes = require("../../../utils/status_code/status_codes");

const getAvailableExercises = async (req, res) => {
	const level = req.query.level;
	const topicId = req.query.topic;

	if (!topicId) return res.status(status_codes.BAD_REQUEST).json({error: "no types provided"});
	if (!level) return res.status(status_codes.BAD_REQUEST).json({error: "no levels provided"});

	const allExercises = await taskModel.findAll({where: {level: level, topic_id: topicId}});

	let ret = new Map();
	for (let exercise of allExercises) {
		if (ret.has(exercise.dataValues.name))
			ret.set(exercise.dataValues.name, ret.get(exercise.dataValues.name) + 1);
		else ret.set(exercise.dataValues.name, 1);
	}

	res.status(status_codes.SUCCESS).json(Object.fromEntries(ret));
};

module.exports = getAvailableExercises;
