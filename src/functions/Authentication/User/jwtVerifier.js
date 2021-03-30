const status_codes = require("../../../utils/status_code/status_codes");
const {verifyToken} = require("../../../utils/token/token");

const verify_jwt = async (req, res) => {
	if (req.headers.authorization) {
		const token = req.header("Authorization").replace("Bearer ", "");
		verifyToken(token, async (err, data) => {
			if (err) res.status(401).json({error: "jwt expired"});
			else res.status(200).json({msg: "jwt still alive and kicking!!"});
		});
	} else res.status(status_codes.UNAUTHORIZED).json({error: "no jwt sent"});
};

module.exports = verify_jwt;
