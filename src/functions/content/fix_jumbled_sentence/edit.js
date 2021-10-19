const fixJumbledSentenceModel = require("../../../models/jumbled_sentence");
const status_codes = require("../../../utils/status_code/status_codes");

const updateJumbledSentence = async (req, res) => {
    const toUpdate = req.body.question
    toUpdate.forEach((question) => {
        fixJumbledSentenceModel.update({
            original_sentence: question.chunks,
            paragraph: question.paragraph,
            explanation: question.explanation
        }, {
            where: {
                subTask_id: question.subTaskId
            }
        }).then(() => {
            return res.status(status_codes.SUCCESS).json({
                message: "Content updated successfully"
            })
        }).catch(() => {
            return res.status(status_codes.INTERNAL_SERVER_ERROR).json({
                error: "Something went wrong"
            })
        })
    })

};

module.exports = updateJumbledSentence;
