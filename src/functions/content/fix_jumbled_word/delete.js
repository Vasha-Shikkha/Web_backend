const fixJumbledWordModel = require("../../../models/jumbled_word");
const status_codes = require("../../../utils/status_code/status_codes");

const deleteFB = async (req, res) => {
	// fixJumbledSentenceModel
	// 	.destroy({
	// 		where: {
	// 			id: req.body.ids,
	// 		},
	// 	})
	// 	.then((r) => {
	// 		if (r !== undefined)
	// 			return res.status(status_codes.SUCCESS).send({
	// 				message: "Content deletion successful",
	// 			});
	// 	})
	// 	.catch((err) => {
	// 		return res.status(status_codes.INTERNAL_SERVER_ERROR).send({
	// 			error: "Something went wrong",
	// 		});
	// 	});
};

module.exports = deleteFB;
