const status = require("../../../utils/status_code/status_codes");
const AdminTokenModel = require("../../../models/adminToken");
const {verifyToken} = require("../../../utils/token/token");

const signOut = async (req, res) => {
	const token = req.header("Authorization").replace("Admin ", "");
	const info = verifyToken(token);

	let destroyed = await AdminTokenModel.destroy({
		where: {
			adminID: info.adminID,
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
