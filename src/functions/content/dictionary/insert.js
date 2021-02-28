const dictionaryModel = require('../../../models/dictionary')
const status_codes = require('../../../utils/status_code/status_codes')

const insertIntoDictionary = async (req, res) => {
    const word = await dictionaryModel.create(req.body)

    if(word){
        return res.status(status_codes.SUCCESS)
            .send({
                message: "Word inserted successfully"
            })
    }
    else {
        return res.status(status_codes.INTERNAL_SERVER_ERROR)
            .send({
                error: "Something went wrong"
            })
    }
}

module.exports = insertIntoDictionary

