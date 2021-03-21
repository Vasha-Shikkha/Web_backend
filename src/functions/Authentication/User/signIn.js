const UserModel = require("../../../models/User");
const status = require("../../../utils/status_code/status_codes");
const {compare} = require("../../../utils/encryption/hash_password");
const UserTokenModel = require("../../../models/UserToken");
const {generateToken} = require("../../../utils/token/token");
const moment = require("moment");

const signIn = async (req, res) => {
	const ip = req.ip;
	let user = await UserModel.findOne({
		where: {
			phone: req.body.phone,
		},
	});

	if (!user) {
		return res.status(status.DATA_NOT_FOUND).json({
			error: "No such user exists",
		});
	}

	if (!(await compare(req.body.password, user.dataValues.password))) {
		return res.status(status.BAD_REQUEST).json({
			error: "Wrong password",
		});
	}

	const old_token = await UserTokenModel.findOne({
		where: {
			userID: user.dataValues.id,
			deviceIP: ip,
		},
	});

	if (old_token) {
		await old_token.destroy();
	}

	let currentDate = new Date();

	const payload = {
		userID: user.dataValues.id,
		deviceIP: ip,
		time: currentDate,
	};

	const token = generateToken(payload);

	let new_token = await UserTokenModel.create(payload);

	const expires_at = moment(currentDate)
		.add(parseInt(process.env.TOKEN_EXPIRE_TIME, process.env.TOKEN_EXPIRE_UNIT))
		.toDate();

	if (new_token) {
		return res.status(status.SUCCESS).json({
			message: "Successful login",
			access_token: token,
			type: "Bearer",
			expires_at,
		});
	} else {
		return res.status(status.INTERNAL_SERVER_ERROR).json({
			error: "Error while processing request",
		});
	}
};

module.exports = signIn;
