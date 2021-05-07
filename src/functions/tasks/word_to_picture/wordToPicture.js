const subTaskModel = require("../../../models/sub_task");
const WordToPictureModel = require("../../../models/word_picture");

const FetchWordToPicture = async (tasks) => {
	let error = null;

	const subTasks = await subTaskModel.findAll({where: {}});
};

module.exports = FetchWordToPicture;
