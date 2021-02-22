const AdminModel = require('../../../models/admin')
const status = require('../../../utils/status_code/status_codes')
const { compare } = require('../../../utils/encryption/hash_passowrd')
const AdminTokenModel = require('../../../models/adminToken')
const { generateToken} = require('../../../utils/token/token')
const moment = require('moment')

const signIn = async (req, res) => {
    const ip = req.ip
    let admin = undefined
    if (req.body.phone) {
        admin = await AdminModel.findOne({
            where: {
                phone: req.body.phone
            }
        })
    }
    else if(req.body.email) {
        admin = await AdminModel.findOne({
            where: {
                email: req.body.email
            }
        })
    }

    if (!admin){
        return res.status(status.DATA_NOT_FOUND)
            .json({
                error: "No such admin exists"
            })
    }

    if (!await compare(req.body.password, admin.dataValues.password)) {
        return res.status(status.BAD_REQUEST)
            .json({
                error: "Wrong password"
            })
    }

    const old_token = await AdminTokenModel.findOne({
        where: {
            adminID: admin.dataValues.id,
            deviceIP: ip,
        }
    })

    if (old_token){
        await old_token.destroy()
    }

    let currentDate = new Date()

    const payload = {
        adminID: admin.dataValues.id,
        deviceIP: ip,
        time: currentDate
    }

    const token = generateToken(payload)

    let new_token = await AdminTokenModel.create(payload)

    const expires_at = moment(currentDate)
        .add(parseInt(process.env.TOKEN_EXPIRE_TIME,process.env.TOKEN_EXPIRE_UNIT))
        .toDate()

    if (new_token){
        return res.status(status.SUCCESS)
            .json({
                message: "Successful login",
                access_token: token,
                type: "Admin",
                expires_at
            })
    }
    else {
        return res.status(status.INTERNAL_SERVER_ERROR)
            .json({
                error: "Error while processing request"
            })
    }

}

module.exports = signIn
