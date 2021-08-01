const solveHistoryModel = require('../../models/solve_history')
const status_codes = require('../../utils/status_code/status_codes')

const updateAttempt = async (req, res) => {
    let userID = req.user.id,
        taskID = req.body.taskID,
        solved = (req.body.solved === true) ? 2 : 1;

    let existingRecord = await solveHistoryModel.findOne({
        where: {
            user_id: userID,
            task_id: taskID
        }
    })

    if (existingRecord === null){
        solveHistoryModel.create({
            user_id: userID,
            task_id: taskID
        }).then(() => {
            return res.status(status_codes.SUCCESS).json({
                message: "Success"
            })
        }).catch(err =>{
            console.log(err)
            return res.status(status_codes.SUCCESS).json({
                error: "Something went wrong"
            })
        })
    }
    else {
        solveHistoryModel.update({
            solved_status: solved
        },{
            where: {
                task_id: taskID,
                user_id: userID
            }
        }).then(() => {
            solveHistoryModel.increment({
                attempted: 1
            },{
                where: {
                    task_id: taskID,
                    user_id: userID
                }
            })
        }).then(() => {
            return res.status(status_codes.SUCCESS).json({
                message: "Success"
            })
        }).catch(err =>{
            console.log(err)
            return res.status(status_codes.SUCCESS).json({
                error: "Something went wrong"
            })
        })
    }
}

module.exports = updateAttempt
