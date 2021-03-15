const status_codes = require("../utils/status_code/status_codes");
const UserModel = require("../models/User");
const {verifyToken} = require("../utils/token/token");

exports.user_auth = async function (req, res, next) {
	if (req.headers.authorization) {
		const token = req.header("Authorization").replace("Bearer ", "");
		const data = verifyToken(token);
		let user = await UserModel.findOne({
			where: {
				id: data.userID,
			},
		});

		if (user) {
			req.user = user;
			next();
		} else res.status(status_codes.DATA_NOT_FOUND).json({error: "no such user found"});
	} else res.status(status_codes.UNAUTHORIZED).json({error: "no jwt sent"});
};