const dictionaryModel = require("../../models/dictionary");
const flashCardModel = require('../../models/flashcard')
const status = require("../../utils/status_code/status_codes");

const lookUpDictionary = async (req, res) => {
	const dictionaryResult = await dictionaryModel.findOne({
		where: {
			word: req.query.word,
		},
	});

	if (!dictionaryResult) {
		return res.status(status.DATA_NOT_FOUND).send({
			error: "Word does not exist in dictionary",
		});
	}

	try {
		let flashCard = await flashCardModel.findOne({
			where : {
				user_id : req.user.dataValues.id,
				word: req.query.word
			}
		})

		if (flashCard){
			await flashCard.destroy();
		}

		let newFlashCard = await flashCardModel.create({
			user_id: req.user.dataValues.id,
			word: req.query.word,
			last_searched: new Date()
		})

		if (!newFlashCard){
			return res.status(status.INTERNAL_SERVER_ERROR).json({
				error: "Could not create a flashcard on this search",
			});
		}

	} catch (error){
		return res.status(status.INTERNAL_SERVER_ERROR).json({
			error: "Something went wrong",
		});
	}

	try {
		return res.status(status.SUCCESS).send({
			meaning: dictionaryResult.dataValues.meaning,
			example: dictionaryResult.dataValues.example,
		});
	} catch (error) {
		return res.status(status.INTERNAL_SERVER_ERROR).json({
			error: "Something went wrong",
		});
	}
};

module.exports = lookUpDictionary;
