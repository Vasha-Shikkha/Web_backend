const mcqModel = require('../../../models/mcq')
const status_codes = require('../../../utils/status_code/status_codes')

const insertFB = async (req, res) => {
    mcqModel.bulkCreate(
        req.body,
        {
            fields:[
                'paragraph',
                'options',
                'answers',
                'level_requirement',
                'explanation'
            ]
        }
    ).then(r => {
            if(r !== undefined)
                return res.status(status_codes.SUCCESS)
                    .send({
                        message: "Content insertion successful"
                    })
        }
    ).catch(err => {
        return res.status(status_codes.INTERNAL_SERVER_ERROR)
            .send({
                error: "Something went wrong"
            })
    })
}

module.exports = insertFB
