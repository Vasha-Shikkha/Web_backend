const UserModel = require('../../../models/User')
const SentenceMatchingModel = require('../../../models/sentence_matching')
const status = require('../../../utils/status_code/status_codes')
const { verifyToken } = require('../../../utils/token/token')
const { Op } = require('sequelize')

const findMatchingPairs = async (req, res) => {
    let offset = parseInt(req.query.offset)
    let limit = parseInt(req.query.limit)
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

    const sentences = await SentenceMatchingModel.findAll({
        offset,
        limit,
        where: {
            level_requirement: {
                [Op.lte] : user_level
            },
        },
    })

    for (let sentence of sentences){
        sentencesToReturn.push({
            part_one: sentence.dataValues.left_part,
            part_two: sentence.dataValues.right_part,
            explanation: sentence.dataValues.explanation,
        })
    }

    try {
        return res.status(status.SUCCESS)
            .send({sentences: sentencesToReturn})
    }catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR)
            .json({
                error: "Something went wrong"
            })
    }
}

module.exports = findMatchingPairs
