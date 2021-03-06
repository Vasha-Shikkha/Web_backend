const UserModel = require('../../../models/User')
const FIllInTheBlanksModel = require('../../../models/fill_in_the_blanks')
const status = require('../../../utils/status_code/status_codes')
const { verifyToken } = require('../../../utils/token/token')
const { Op } = require('sequelize')

const findParagraph = async (req, res) => {
    let offset = parseInt(req.query.offset)
    let limit = parseInt(req.query.limit)
    let context = (req.body.context === 'true')
    const token = req.header('Authorization').replace('Bearer ','')
    const data = verifyToken(token)
    let paragraphsToReturn = []
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

    const paragraphs = await FIllInTheBlanksModel.findAll({
        offset,
        limit,
        where: {
            level_requirement: {
                [Op.lte] : user_level
            },
            context
        },
    })

    for (let paragraph of paragraphs){
        paragraphsToReturn.push({
            paragraph: paragraph.dataValues.paragraph,
            options: paragraph.dataValues.options,
            answers: paragraph.dataValues.answers,
            explanation: paragraph.dataValues.explanation,
        })
    }

    try {
        return res.status(status.SUCCESS)
            .send(paragraphsToReturn)
    }catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR)
            .json({
                error: "Something went wrong"
            })
    }
}

module.exports = findParagraph
