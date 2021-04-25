const express = require("express");
const router = express.Router();
const signIn = require("../functions/Authentication/Admin/signIn");
const signOut = require("../functions/Authentication/Admin/signOut");
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

const SMinsert = require("../functions/content/sentence_matching/insert");
const SMupdate = require("../functions/content/sentence_matching/edit");
const SMdelete = require("../functions/content/sentence_matching/delete");
const WPinsert = require("../functions/content/word_to_picture/insert");
const WPupdate = require("../functions/content/word_to_picture/edit");
const WPdelete = require("../functions/content/word_to_picture/delete");
const PWInsert = require("../functions/content/picture_to_word/insert");
// const PWupdate = require("../functions/content/picture_to_word/edit");
// const PWdelete = require("../functions/content/picture_to_word/delete");

const getAllTopics = require("../functions/topic/Admin/allTopics");
const topicInsert = require("../functions/topic/Admin/insert");
const topicUpdate = require("../functions/topic/Admin/edit");
const topicDelete = require("../functions/topic/Admin/delete");

const {upload, singleUploadMiddleware} = require('../utils/storage/storage')

//Authentication
router.post("/admin/login", signIn);
router.delete("/admin/logout", signOut);
router.post("/admin/create_admin", createAdmin);
router.patch("/admin/update_role", updateRole);
router.post("/admin/initial", initialSuperAdmin); //Somehow need to make it one time use

//topic table
router.get("/admin/topic/all", getAllTopics);
router.post("/admin/topic/insert",[upload.single('topicImage'), singleUploadMiddleware], topicInsert);
router.patch("/admin/topic/update", topicUpdate);
router.delete("/admin/topic/delete", topicDelete);

//Dictionary and content

//---Dictionary
router.post("/dictionary/insert", insertIntoDictionary);
router.delete("/dictionary/deleteAll", dumpDictionary);

//---Fill in the blanks
router.post("/content/fill_in_the_blanks/insert", FBinsert);
router.patch("/content/fill_in_the_blanks/update", FBupdate);
router.delete("/content/fill_in_the_blanks/delete", FBdelete);

//---Sentence matching
router.post("/content/sentence_matching/insert", SMinsert);
router.patch("/content/sentence_matching/update", SMupdate);
router.delete("/content/sentence_matching/delete", SMdelete);

//---Jumbled word
router.post("/content/jumbled_word/insert", JWinsert);
router.patch("/content/jumbled_word/update", JWupdate);
router.delete("/content/jumbled_word/delete", JWdelete);

//---Jumbled sentence

router.post("/content/jumbled_sentence/insert", JSinsert);
router.patch("/content/jumbled_sentence/update", JSupdate);
router.delete("/content/jumbled_sentence/delete", JSdelete);

//---mcq
router.post("/content/mcq/insert", mcqInsert);
router.patch("/content/mcq/update", mcqUpdate);
router.delete("/content/mcq/delete", mcqDelete);

//---Word to picture
router.post("/content/word_to_picture/insert", WPinsert);
router.patch("/content/word_to_picture/update", WPupdate);
router.delete("/content/word_to_picture/delete", WPdelete);

//---Picture to word
router.post("/content/picture_to_word/insert", PWInsert);
// router.patch("/content/picture_to_word/update", PWupdate);
// router.delete("/content/picture_to_word/delete", PWdelete);

module.exports = router;
