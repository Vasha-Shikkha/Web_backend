const UserModel = require('../../../models/User')
const JumbledSentenceModel = require('../../../models/jumbled_sentence')
const status = require('../../../utils/status_code/status_codes')
const { verifyToken } = require('../../../utils/token/token')
const { Op } = require('sequelize')

const findSentenceToJumble = async (req, res) => {
    let offset = parseInt(req.query.offset)
    let limit = parseInt(req.query.limit)
    let topic_id = parseInt(req.query.topic_id)
    const token = req.header('Authorization').replace('Bearer ','')
    const data = verifyToken(token)
    let sentencesToReturn = []
    let user = await UserModel.findOne({
        where: {
            id: data.userID
        }
    })

    if (!user){
        return res.status(status.DATA_NOT_FOUND)
            .json({
                error: "Could not process request at this moment"
            })
    }

    const user_level = user.dataValues.level

    const sentences = await JumbledSentenceModel.findAll({
        offset,
        limit,
        where: {
            topic_id,
            level_requirement: {
                [Op.lte] : user_level
            },
        },
    })

    for (sentence of sentences){
        sentencesToReturn.push({
            original_sentence: sentence.dataValues.original_sentence,
            explanation: sentence.dataValues.explanation,
            context: sentence.dataValues.context
        })
    }

    try {
        return res.status(status.SUCCESS)
            .send(sentencesToReturn)
    }catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR)
            .json({
                error: "Something went wrong"
            })
    }
}

module.exports = findSentenceToJumble
