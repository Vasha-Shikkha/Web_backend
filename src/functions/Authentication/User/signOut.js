const status = require("../../../utils/status_code/status_codes");
const UserTokenModel = require("../../../models/UserToken");
const {verifyToken} = require("../../../utils/token/token");

const signOut = async (req, res) => {
	const token = req.header("Authorization").replace("Bearer ", "");
	const info = verifyToken(token);

	let destroyed = await UserTokenModel.destroy({
		where: {
			userID: info.userID,
			deviceIP: info.deviceIP,
		},
	});

	if (destroyed > 0) {
		return res.status(status.SUCCESS).json({
			message: "Successfully logged out",
		});
	} else {
		return res.status(status.INTERNAL_SERVER_ERROR).json({
			error: "Error while processing request",
		});
	}
};

module.exports = signOut;
