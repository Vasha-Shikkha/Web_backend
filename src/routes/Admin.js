const express = require("express");
const router = express.Router();
const signIn = require("../functions/Authentication/Admin/signIn");
const signOut = require("../functions/Authentication/Admin/signOut");
const admin_middleware = require("../middlewares/admin_auth");
const createAdmin = require("../functions/Authentication/Admin/createAdmin");
const updateRole = require("../functions/Authentication/Admin/changeRole");
const initialSuperAdmin = require("../functions/Authentication/Admin/initialCreate");
const insertIntoDictionary = require("../functions/content/dictionary/insert");
const dumpDictionary = require("../functions/content/dictionary/deleteAll");
const FBinsert = require("../functions/content/fill_in_the_blanks/insert");
const FBupdate = require("../functions/content/fill_in_the_blanks/edit");
const FBdelete = require("../functions/content/fill_in_the_blanks/delete");
const mcqInsert = require("../functions/content/mcq/insert");
const mcqUpdate = require("../functions/content/mcq/edit");
const mcqDelete = require("../functions/content/mcq/delete");
const JWinsert = require("../functions/content/fix_jumbled_word/insert");
const JWupdate = require("../functions/content/fix_jumbled_word/edit");
const JWdelete = require("../functions/content/fix_jumbled_word/delete");

const JSinsert = require("../functions/content/fix_jumbled_sentence/insert");
const JSupdate = require("../functions/content/fix_jumbled_sentence/edit");
const JSdelete = require("../functions/content/fix_jumbled_sentence/delete");

const TFinsert = require("../functions/content/true_false/insert");
//const TFupdate = require("../functions/content/true_false/edit");
//const TFdelete = require("../functions/content/true_false/delete");

const ErrorInsert = require("../functions/content/error_in_sentence/insert");
const ErrorUpdate = require("../functions/content/error_in_sentence/edit");
const ErrorDelete = require("../functions/content/error_in_sentence/delete");

const SMinsert = require("../functions/content/sentence_matching/insert");
const SMupdate = require("../functions/content/sentence_matching/edit");
const SMdelete = require("../functions/content/sentence_matching/delete");
const WPinsert = require("../functions/content/word_to_picture/insert");
const WPupdate = require("../functions/content/word_to_picture/edit");
const WPdelete = require("../functions/content/word_to_picture/delete");
const PWInsert = require("../functions/content/picture_to_word/insert");
// const PWupdate = require("../functions/content/picture_to_word/edit");
// const PWdelete = require("../functions/content/picture_to_word/delete");

const CMInsert = require("../functions/content/caption_matching/insert");
// const CMupdate = require("../functions/content/caption_matching/edit");
// const CMdelete = require("../functions/content/caption_matching/delete");

const getAllTopics = require("../functions/topic/Admin/allTopics");
const topicInsert = require("../functions/topic/Admin/insert");
const topicUpdate = require("../functions/topic/Admin/edit");
const topicDelete = require("../functions/topic/Admin/delete");

const getTaskDetails = require("../functions/tasks/GetTaskDetails");
const getTaskByID = require("../functions/tasks/getTaskByID");
const getExerciseById = require("../functions/tasks/GetExerciseById");

const editTask = require("../functions/tasks/editTask");

const {upload, singleUploadMiddleware} = require("../utils/storage/storage");

//Authentication
router.post("/admin/login", signIn);
router.delete("/admin/logout", signOut);
router.post("/admin/create_admin", admin_middleware.admin_auth, createAdmin);
router.patch("/admin/update_role", admin_middleware.admin_auth, updateRole);
router.post("/admin/initial", initialSuperAdmin); //Somehow need to make it one time use

//topic table
router.get("/admin/topic/all", admin_middleware.admin_auth, getAllTopics);
router.post("/admin/topic/insert", admin_middleware.admin_auth, topicInsert);
router.patch("/admin/topic/update", admin_middleware.admin_auth, topicUpdate);
router.delete("/admin/topic/delete", admin_middleware.admin_auth, topicDelete);

//Task
router.get("/admin/task/all", admin_middleware.admin_auth, getTaskDetails);
router.get("/admin/task/byID", admin_middleware.admin_auth, getTaskByID);
router.post("/admin/task/update", admin_middleware.admin_auth, editTask);
router.get("/admin/task/exercise/id", admin_middleware.admin_auth, getExerciseById);
//Dictionary and content

//---Dictionary
router.post("/dictionary/insert", admin_middleware.admin_auth, insertIntoDictionary);
router.delete("/dictionary/deleteAll", admin_middleware.admin_auth, dumpDictionary);

//---Fill in the blanks
router.post("/content/fill_in_the_blanks/insert", admin_middleware.admin_auth, FBinsert);
router.patch("/content/fill_in_the_blanks/update", admin_middleware.admin_auth, FBupdate);
router.delete("/content/fill_in_the_blanks/delete", admin_middleware.admin_auth, FBdelete);

//---Sentence matching
router.post("/content/sentence_matching/insert", admin_middleware.admin_auth, SMinsert);
router.patch("/content/sentence_matching/update", admin_middleware.admin_auth, SMupdate);
router.delete("/content/sentence_matching/delete", admin_middleware.admin_auth, SMdelete);

//---Jumbled word
router.post("/content/jumbled_word/insert", admin_middleware.admin_auth, JWinsert);
router.patch("/content/jumbled_word/update", admin_middleware.admin_auth, JWupdate);
router.delete("/content/jumbled_word/delete", admin_middleware.admin_auth, JWdelete);

//---Jumbled sentence

router.post("/content/jumbled_sentence/insert", admin_middleware.admin_auth, JSinsert);
router.patch("/content/jumbled_sentence/update", admin_middleware.admin_auth, JSupdate);
router.delete("/content/jumbled_sentence/delete", admin_middleware.admin_auth, JSdelete);

//---mcq
router.post("/content/mcq/insert", admin_middleware.admin_auth, mcqInsert);
router.patch("/content/mcq/update", admin_middleware.admin_auth, mcqUpdate);
router.delete("/content/mcq/delete", admin_middleware.admin_auth, mcqDelete);

//---Word to picture
router.post("/content/word_to_picture/insert", admin_middleware.admin_auth, WPinsert);
router.patch("/content/word_to_picture/update", admin_middleware.admin_auth, WPupdate);
router.delete("/content/word_to_picture/delete", admin_middleware.admin_auth, WPdelete);

//---Picture to word
router.post("/content/picture_to_word/insert", admin_middleware.admin_auth, PWInsert);
// router.patch("/content/picture_to_word/update", admin_middleware.admin_auth, PWupdate);
// router.delete("/content/picture_to_word/delete", admin_middleware.admin_auth, PWdelete);

//---Caption to Picture
router.post("/content/caption_matching/insert", admin_middleware.admin_auth, CMInsert);
// router.patch("/content/caption_matching/update", admin_middleware.admin_auth, CMpdate);
// router.delete("/content/caption_matching/delete", admin_middleware.admin_auth, CMdelete);

//--True-False
router.post("/content/true_false/insert", admin_middleware.admin_auth, TFinsert);
// router.post("/content/true_false/edit", admin_middleware.admin_auth, TFupdate);
// router.post("/content/true_false/delete", admin_middleware.admin_auth, TFdelete);

//--Error In Sentence
router.post("/content/error_in_sentence/insert", admin_middleware.admin_auth, ErrorInsert);
// router.post("/content/error_in_sentence/edit", admin_middleware.admin_auth, ErrorUpdate);
// router.post("/content/error_in_sentence/delete", admin_middleware.admin_auth, ErrorDelete);

module.exports = router;
