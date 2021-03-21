const dictionaryModel = require("../../../models/dictionary");
const status_codes = require("../../../utils/status_code/status_codes");

const dumpDictionary = async (req, res) => {
	const deletedRows = await dictionaryModel.destroy({
		where: {},
		truncate: true,
		cascade: true,
	});

	if (deletedRows !== undefined) {
		return res.status(status_codes.SUCCESS).send({
			message: "Successfully deleted all entries",
		});
	} else {
		return res.status(status_codes.INTERNAL_SERVER_ERROR).send({
			error: "Something went wrong",
		});
	}
};

module.exports = dumpDictionary;
