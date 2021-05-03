const status_codes = require("../utils/status_code/status_codes");
const adminModel = require("../models/admin");
const {verifyToken} = require("../utils/token/token");

exports.admin_auth = async function (req, res, next) {
    if (req.headers.authorization) {
        if(!req.header("Authorization").startsWith("Admin ")){
            return res.status(status_codes.BAD_REQUEST)
                .json({
                    error: "Wrong format"
                })
        }
        const token = req.header("Authorization").replace("Admin ", "");
        verifyToken(token, async (err, data) => {
            if (err) res.status(401).json({error: "jwt expired"});
            else {
                let admin = await adminModel.findOne({
                    where: {
                        id: data.adminID,
                    },
                });

                if (admin) {
                    req.admin = admin;
                    next();
                } else res.status(status_codes.DATA_NOT_FOUND).json({error: "no such admin found"});
            }
        });
    } else res.status(status_codes.UNAUTHORIZED).json({error: "no jwt sent"});
};
