const AdminModel = require('../../../models/admin')
const status = require('../../../utils/status_code/status_codes')

const initialAdminCreate = async (req, res) => {
    let adminInfo = req.body
    adminInfo.role = 'Super-admin'
    let admin = await AdminModel.create(adminInfo)


    if (!admin)
        res.status(status.INTERNAL_SERVER_ERROR)
            .json({error: "server error while creating new user"});
    else {
        delete admin.dataValues.password;
        res.status(status.SUCCESS).json({admin});
    }
}

module.exports = initialAdminCreate


