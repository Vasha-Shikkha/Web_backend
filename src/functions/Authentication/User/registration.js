const UserModel = require('../../../models/User')
const status = require('../../../utils/status_code/status_codes')

const register = async (req, res) => {
    let userInfo = req.body
    let user = await UserModel.findOne({
        where: {
            phone: userInfo.phone
        }
    })

    if (user){
        return res.status(status.BAD_REQUEST).json({
            error: "Phone number already in use"
        })
    }
    else {
        user = await UserModel.create(userInfo)

        if (!user)
            res.status(status.INTERNAL_SERVER_ERROR)
                .json({error: "server error while creating new user"});
        else {
            delete user.dataValues.password;
            res.status(status.SUCCESS).json({user});
        }
    }
}

module.exports = register
