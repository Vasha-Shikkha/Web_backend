const UserModel = require('../../../models/User')
const topicModel = require('../../../models/topic')
const taskModel = require('../../../models/task')
const subTaskModel = require('../../../models/sub_task')
const McqModel = require('../../../models/mcq')
const status = require('../../../utils/status_code/status_codes')
const { verifyToken } = require('../../../utils/token/token')
const { Op } = require('sequelize')

const findMcq = async (req, res) => {
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

    const mcqs = await McqModel.findAll({
        where: {
            subTask_id: {
                [Op.in]: allSubTasks
            }
        },
    })

    for (mcq of mcqs){
        let mcqsToReturn = {
            Question: mcq.dataValues.question,
            Options: mcq.dataValues.options,
            Answer: mcq.dataValues.answer,
            explanation: mcq.dataValues.explanation,
        }

        taskArray[subTaskToTaskMap.get(sentence.dataValues.subTask_id)-1].push(mcqsToReturn)
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

module.exports = findMcq
