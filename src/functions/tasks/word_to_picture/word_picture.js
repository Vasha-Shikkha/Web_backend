const UserModel = require('../../../models/User')
const WordToPictureModel = require('../../../models/word_picture')
const status = require('../../../utils/status_code/status_codes')
const { verifyToken } = require('../../../utils/token/token')
const { Op } = require('sequelize')

const findWordToPicture = async (req, res) => {
    let offset = parseInt(req.query.offset)
    let limit = parseInt(req.query.limit)
    const token = req.header('Authorization').replace('Bearer ', '')
    const data = verifyToken(token)
    let wordPictureToReturn = []
    let user = await UserModel.findOne({
        where: {
            id: data.userID
        }
    })

    if (!user) {
        return res.status(status.DATA_NOT_FOUND)
            .json({
                error: "Could not process request at this moment"
            })
    }

    const user_level = user.dataValues.level

    const word_to_picture = await WordToPictureModel.findAll({
        offset,
        limit,
        where: {
            level_requirement: {
                [Op.lte]: user_level
            },
        },
    })

    for(let exercise of word_to_picture){
        wordPictureToReturn.push({
            question: exercise.dataValues.question,
            images: exercise.dataValues.images,
            answer: exercise.dataValues.answer,
            explanation_english: exercise.dataValues.explanation_english,
            explanation_bangla: exercise.dataValues.explanation_bangla
        })
    }

    try {
        return res.status(status.SUCCESS)
            .send(wordPictureToReturn)
    }catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR)
            .json({
                error: "Something went wrong"
            })
    }
}

module.exports = findWordToPicture
