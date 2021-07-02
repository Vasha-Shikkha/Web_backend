const express = require("express");
const router = express.Router();

const {getTopicTable, getTopicLevelCountTable} = require("../functions/OfflineDB/getAllTable");
const getAllEntries = require("../functions/dictionary/getDictionary");
const user_middleware = require("../middlewares/user_auth");

router.get("/offline/topic/all", user_middleware.user_auth, getTopicTable);
router.get("/offline/topicLevelCount/all", user_middleware.user_auth, getTopicLevelCountTable);
router.get("/offline/dictionary",user_middleware.user_auth,getAllEntries);

module.exports = router;