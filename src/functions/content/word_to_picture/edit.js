const wordToPictureModel = require('../../../models/word_picture')
const status_codes = require('../../../utils/status_code/status_codes')

const updateFB = async (req, res) => {
    wordToPictureModel.bulkCreate(
        req.body,
        {
            fields:[
                'id',
                'topic_id',
                'question',
                'images',
                'answer',
                'level_requirement',
                'explanation'
            ],
            updateOnDuplicate: [
                'question',
                'images',
                'answer',
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
