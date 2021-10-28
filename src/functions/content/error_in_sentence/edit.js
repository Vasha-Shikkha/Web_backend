const errorSentenceModel = require("../../../models/error_in_sentence");
const status_codes = require("../../../utils/status_code/status_codes");

const updateErrorInASentence = async (req, res) => {
    const toUpdate = req.body.question
    toUpdate.forEach((question) => {
        errorSentenceModel.update({
            sentence: question.sentence,
            options: question.options,
            answer: question.answer,
            explanation: question.explanation
        }, {
            where: {
                subTask_id: question.subTask_id
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

module.exports = updateErrorInASentence;
