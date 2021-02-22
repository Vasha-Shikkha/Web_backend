const AdminModel = require('../../../models/admin')
const status = require('../../../utils/status_code/status_codes')
const { verifyToken } = require('../../../utils/token/token')

const createAdmin = async (req, res) => {
    const token = req.header('Authorization').replace('Admin ','')
    const data = verifyToken(token)
    let admin = await AdminModel.findOne({
        where: {
            id: data.adminID
        }
    })

    if (!admin){
        return res.status(status.DATA_NOT_FOUND)
            .send({
                error: "No such admin exists"
            })
    }

    if (admin.dataValues.role !== 'Super-admin'){
        return res.status(status.FORBIDDEN)
            .send({
                error: "You do not have this permission"
            })
    }

    let adminInfo = req.body
    let newAdmin = await AdminModel.findOne({
        where: {
            phone: adminInfo.phone
        }
    })

    if (newAdmin){
        return res.status(status.BAD_REQUEST).json({
            error: "Phone number already in use"
        })
    }
    else {
        newAdmin = await AdminModel.create(adminInfo)

        if (!newAdmin)
            res.status(status.INTERNAL_SERVER_ERROR)
                .json({error: "server error while creating new admin"});
        else {
            delete newAdmin.dataValues.password;
            res.status(status.SUCCESS).json({newAdmin});
        }
    }
}

module.exports = createAdmin
