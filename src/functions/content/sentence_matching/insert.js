const sentenceMatchingModel = require('../../../models/sentence_matching')
const status_codes = require('../../../utils/status_code/status_codes')

const insertFB = async (req, res) => {
    sentenceMatchingModel.bulkCreate(
        req.body,
        {
            fields:[
                'id',
                'left_part',
                'right_part',
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