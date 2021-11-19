const fixJumbledWordModel = require("../../../models/jumbled_word");
const status_codes = require("../../../utils/status_code/status_codes");

const updateJumbledWord = async (req, res) => {
    const toUpdate = req.body.question
    // console.log(toUpdate);
    toUpdate.forEach((question) => {
        fixJumbledWordModel.update({
            original_word: question.word,
            paragraph: question.paragraph,
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

module.exports = updateJumbledWord;
