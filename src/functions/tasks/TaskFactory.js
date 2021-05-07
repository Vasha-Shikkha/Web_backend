const FetchWordToPicture = require("./word_to_picture/wordToPicture");

const TaskFactory = async (tasks) => {
	// switch (task.name) {
	// 	case "Word to Picture":
	// 		return await FetchWordToPicture(task);
	// 	default:
	// 		return {msg: "nai"};
	// }
	console.log(tasks);
	return [];
};

module.exports = TaskFactory;
