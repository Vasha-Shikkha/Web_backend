const UserModel = require('../../../models/User')
const topicModel = require('../../../models/topic')
const taskModel = require('../../../models/task')
const subTaskModel = require('../../../models/sub_task')
const JumbledSentenceModel = require('../../../models/jumbled_sentence')
const status = require('../../../utils/status_code/status_codes')
const { verifyToken } = require('../../../utils/token/token')
const { Op } = require('sequelize')

const findSentenceToJumble = async (req, res) => {
    let offset = parseInt(req.query.offset)
    let limit = parseInt(req.query.limit)
    let level = parseInt(req.query.level)
    let topic_id = parseInt(req.query.topic_id)
    const token = req.header('Authorization').replace('Bearer ','')
    const data = verifyToken(token)
    let  allTasks = [],
        allSubTasks = [], taskArray = [],
        subTaskToTaskMap = new Map()
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

    const tasks = await taskModel.findAll({
        offset,
        limit,
        where: {
            topic_id,
            level
        }
    })

    for (let task of tasks){
        taskArray.push([])
        allTasks.push(task.dataValues.id)
    }

    const subTasks = await subTaskModel.findAll({
        where: {
            task_id: {
                [Op.in] : allTasks
            }
        }
    })

    for (let subTask of subTasks){
        subTaskToTaskMap.set(subTask.dataValues.id, subTask.dataValues.task_id)
        allSubTasks.push(subTask.dataValues.id)
    }


    const sentences = await JumbledSentenceModel.findAll({
        where: {
            subTask_id: {
                [Op.in]: allSubTasks
            }
        },
    })

    for (let sentence of sentences){
        let sentenceToReturn = {
            original_sentence: sentence.dataValues.original_sentence,
            explanation: sentence.dataValues.explanation,
            context: sentence.dataValues.context
        }
        taskArray[subTaskToTaskMap.get(sentence.dataValues.subTask_id)-1].push(sentenceToReturn)
    }

    try {
        return res.status(status.SUCCESS)
            .send(taskArray)
    }catch (error) {
        return res.status(status.INTERNAL_SERVER_ERROR)
            .json({
                error: "Something went wrong"
            })
    }
}

module.exports = findSentenceToJumble
