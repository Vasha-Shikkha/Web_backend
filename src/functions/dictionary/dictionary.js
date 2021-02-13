const dictionaryModel = require('../../models/dictionary')
const status = require('../../utils/status_code/status_codes')

const lookUpDictionary = async (req, res) => {
    const dictionaryResult = await dictionaryModel.findOne({
        where:{
            word: req.query.word
        }
    })

    if (!dictionaryResult){
        return res.status(status.DATA_NOT_FOUND)
            .send({
                error: "Word does not exist in dictionary"
            })
    }

    try{
        return res.status(status.SUCCESS)
            .send({
                meaning: dictionaryResult.dataValues.meaning,
                example: dictionaryResult.dataValues.example
            })
    }catch (error){
        return res.status(status.INTERNAL_SERVER_ERROR)
            .json({
                error: "Something went wrong"
            })
    }
}

module.exports = lookUpDictionary
