const flashCardModel = require('../../models/flashcard')
const userModel = require('../../models/User')
const dictionaryModel = require('../../models/dictionary')
const { verifyToken } = require('../../utils/token/token')
const status = require('../../utils/status_code/status_codes')
const { Op } = require('sequelize')

const recentSearches = async (req, res) => {
    const token = req.header('Authorization').replace('Bearer ','')
    const data = verifyToken(token)
    let user = await userModel.findOne({
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

    let dateToTime = new Date(req.body.date)
    console.log(dateToTime)
    console.log(typeof dateToTime)

    const flashCards = await flashCardModel.findAll({
        where: {
            user_id: data.userID,
            last_searched : {
                [Op.gte] : dateToTime
            }
        }
    })

    let recentWords = []

    for (card of flashCards){
        const dictionaryResult = await dictionaryModel.findOne({
            where:{
                word: card.dataValues.word
            }
        })
        recentWords.push(dictionaryResult.dataValues)
    }

    try {
        return res.status(status.SUCCESS)
            .send(recentWords)
    }catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR)
            .json({
                error: "Something went wrong"
            })
    }
}

module.exports = recentSearches
