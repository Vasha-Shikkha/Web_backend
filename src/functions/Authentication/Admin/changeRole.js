const AdminModel = require('../../../models/admin')
const status = require('../../../utils/status_code/status_codes')
const { verifyToken } = require('../../../utils/token/token')

const changeRole = async (req, res) => {
    const token = req.header('Authorization').replace('Admin ', '')
    const data = verifyToken(token)
    let admin = await AdminModel.findOne({
        where: {
            id: data.adminID
        }
    })

    if (!admin) {
        return res.status(status.DATA_NOT_FOUND)
            .send({
                error: "No such admin exists"
            })
    }

    if (admin.dataValues.role !== 'Super-admin') {
        return res.status(status.FORBIDDEN)
            .send({
                error: "You do not have this permission"
            })
    }

    const changedAdmin = await AdminModel.findOne({
        where: {
            phone : req.body.phone
        }
    })

    if (changedAdmin.dataValues.role !== 'Admin'){
        return res.status(status.FORBIDDEN)
            .send({
                error: "Cannot change role of this admin"
            })
    }
    else {
        changedAdmin.role = "Super-admin"
        await changedAdmin.save()
        return res.status(status.SUCCESS)
            .send({
                error: "Successfully updated the role"
            })
    }
}

module.exports = changeRole
