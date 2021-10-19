const pictureWordModel = require("../../../models/picture_word");
const status_codes = require("../../../utils/status_code/status_codes");

const updatePictureToWord = async (req, res) => {
    const toUpdate = req.body.question
    toUpdate.forEach((question) => {
        pictureWordModel.update({
            question: question.question,
            image: question.image,
            options: question.options,
            answer: question.answer,
            explanation: question.explanation,
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

module.exports = updatePictureToWord;
