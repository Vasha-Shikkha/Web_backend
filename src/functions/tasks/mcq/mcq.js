const UserModel = require('../../../models/User')
const McqModel = require('../../../models/mcq')
const status = require('../../../utils/status_code/status_codes')
const { verifyToken } = require('../../../utils/token/token')
const { Op } = require('sequelize')

const findMcq = async (req, res) => {
    let offset = parseInt(req.query.offset)
    let limit = parseInt(req.query.limit)
    const token = req.header('Authorization').replace('Bearer ','')
    const data = verifyToken(token)
    let mcqsToReturn = []
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

    const mcqs = await McqModel.findAll({
        offset,
        limit,
        where: {
            level_requirement: {
                [Op.lte] : user_level
            },
        },
        //logging: console.log
    })

    for (mcq of mcqs){
        let mcq_id = mcq.dataValues.id

        mcqsToReturn.push({
            Question: mcq.dataValues.question,
            Options: mcq.dataValues.options,
            Answer: mcq.dataValues.answer,
            explanation: mcq.dataValues.explanation,
        })
    }

    try {
        return res.status(status.SUCCESS)
            .send(mcqsToReturn)
    }catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR)
            .json({
                error: "Something went wrong"
            })
    }
}

module.exports = findMcq
