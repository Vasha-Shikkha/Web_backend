const flashCardModel = require("../../models/flashcard");
const dictionaryModel = require("../../models/dictionary");
const status = require("../../utils/status_code/status_codes");
const {Op} = require("sequelize");

const recentSearches = async (req, res) => {
	let dateToTime = new Date(req.body.date);

	const flashCards = await flashCardModel.findAll({
		where: {
			user_id: req.user.dataValues.id,
			last_searched: {
				[Op.gte]: dateToTime,
			},
		},
	});

	let recentWords = [];

	for (let card of flashCards) {
		const dictionaryResult = await dictionaryModel.findOne({
			where: {
				word: card.dataValues.word,
			},
		});
		recentWords.push(dictionaryResult.dataValues);
	}

	try {
		return res.status(status.SUCCESS).send(recentWords);
	} catch (error) {
		return res.status(status.INTERNAL_SERVER_ERROR).json({
			error: "Something went wrong",
		});
	}
};

module.exports = recentSearches;
