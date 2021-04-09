const {getTopicTable, getTopicLevelCountTable} = require("../functions/OfflineDB/getAllTable");
const user_middleware = require("../middlewares/user_auth");

router.get("/offline/topic/all", user_middleware.user_auth, getTopicTable);
router.get("/offline/topicLevelCount/all", user_middleware.user_auth, getTopicLevelCountTable);
