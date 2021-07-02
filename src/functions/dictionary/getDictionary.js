const dictionaryModel = require("../../models/dictionary");
const flashCardModel = require('../../models/flashcard')
const status = require("../../utils/status_code/status_codes");

const getAllEntries = async(req,res) => {
	const entries=[];
    const dictionaryEntries = await dictionaryModel.findAll();

    for(dictionaryEntry of dictionaryEntries)
        entries.push(dictionaryEntry.dataValues);
    
	try{
		return res.status(status.SUCCESS).send({
			dictionary:entries
		});
	}catch(error){
		return res.status(status.INTERNAL_SERVER_ERROR).json({
			error: "Something went wrong",
		});
	}
    
}

module.exports = getAllEntries