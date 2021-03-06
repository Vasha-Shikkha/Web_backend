const fixJumbledSentenceModel = require('../../../models/jumbled_sentence')
const status_codes = require('../../../utils/status_code/status_codes')

const updateFB = async (req, res) => {
    fixJumbledSentenceModel.bulkCreate(
        req.body,
        {
            fields:[
                'id',
                'original_sentence',
                'level_requirement',
                'explanation'
            ],
            updateOnDuplicate: [
                'original_sentence',
                'level_requirement',
                'explanation'
            ]
        }
    ).then(r => {
            if(r !== undefined)
                return res.status(status_codes.SUCCESS)
                    .send({
                        message: "Content update successful"
                    })
        }
    ).catch(err => {
        return res.status(status_codes.INTERNAL_SERVER_ERROR)
            .send({
                error: "Something went wrong"
            })
    })
}

module.exports = updateFB
