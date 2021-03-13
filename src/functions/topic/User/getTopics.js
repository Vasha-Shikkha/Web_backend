const topicModel = require('../../../models/topic')
const status_codes = require('../../../utils/status_code/status_codes')
const UserModel = require('../../../models/User')
const { verifyToken } = require('../../../utils/token/token')

const getTopics = async (req, res) => {
    const token = req.header('Authorization').replace('Bearer ','')
    const data = verifyToken(token)
    let user = await UserModel.findOne({
        where: {
            id: data.userID
        }
    })

    const topics = []

    if (!user){
        return res.status(status.DATA_NOT_FOUND)
            .json({
                error: "Could not process request at this moment"
            })
    }

    const allTopics = await topicModel.findAll()

    for (let topic of allTopics){
        topics.push(topic.dataValues)
    }

    try {
        return res.status(status_codes.SUCCESS)
            .send(topics)
    }catch (error) {
        return res.status(status_codes.INTERNAL_SERVER_ERROR)
            .json({
                error: "Something went wrong"
            })
    }
}

module.exports = getTopics
