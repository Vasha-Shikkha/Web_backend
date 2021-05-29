const express = require("express");
const router = express.Router();
const database = require("../utils/database/database");
const registration = require("../functions/Authentication/User/registration");
const signIn = require("../functions/Authentication/User/signIn");
const signOut = require("../functions/Authentication/User/signOut");
const findMcq = require("../functions/tasks/mcq/_mcq");
const findJumbledWord = require("../functions/tasks/fix_jumbled_word/fix_jumbled_word");
const findSentenceToMatch = require("../functions/tasks/sentence_matching/sentence_matching");
const findParagraphs = require("../functions/tasks/fill_in_the_blanks/fill_in_the_blanks");
const findWordPicture = require("../functions/tasks/word_to_picture/word_picture");
const lookUpWord = require("../functions/dictionary/dictionary");
const recentWordSearches = require("../functions/dictionary/flashcard");
const getTopics = require("../functions/topic/User/getTopics");
const getAvailableExercises = require("../functions/topic/User/getAvailableExercises");
const findJumbledSentence = require("../functions/tasks/fix_jumbled_sentence/fix_jumbled_sentence");
const findPictureWord = require("../functions/tasks/picture_to_word/picture_word");
const findMatchingCaption = require("../functions/tasks/caption_matching/caption_matching");
const findErrorInSentence = require("../functions/tasks/error_in_sentence/error_in_sentence");
const findTrueFalse = require("../functions/tasks/true_false/true_false");
const user_middleware = require("../middlewares/user_auth");
const verify_jwt = require("../functions/Authentication/User/jwtVerifier");
const GetTasks = require("../functions/tasks/Get_Tasks");

//Authentication
router.post("/user/register", registration);
router.post("/user/login", signIn);
router.delete("/user/logout", signOut);
router.get("/user/verifyToken", verify_jwt);

//Topics
router.get("/user/topics", user_middleware.user_auth, getTopics);

// Available Exercises
router.get("/user/exercises", user_middleware.user_auth, getAvailableExercises);

//Tasks
router.get("/user/task/all", user_middleware.user_auth, GetTasks);

router.get("/user/task/mcq", user_middleware.user_auth, findMcq);
router.get("/user/task/fix_jumbled_word", user_middleware.user_auth, findJumbledWord);
router.get("/user/task/sentence_matching", user_middleware.user_auth, findSentenceToMatch);
router.get("/user/task/fill_in_the_blanks", user_middleware.user_auth, findParagraphs);
router.get("/user/task/word_to_picture", user_middleware.user_auth, findWordPicture);
router.get("/user/task/picture_to_word", user_middleware.user_auth, findPictureWord);
router.get("/user/task/caption_matching", user_middleware.user_auth, findMatchingCaption);
router.get("/user/task/fix_jumbled_sentence", user_middleware.user_auth, findJumbledSentence);
router.get("/user/task/error_in_sentence", user_middleware.user_auth, findErrorInSentence);
router.get("/user/task/true_false", user_middleware.user_auth, findTrueFalse);

//dictionary
router.get("/dictionary", user_middleware.user_auth, lookUpWord);

//flashCard
router.post("/flashcard/find", user_middleware.user_auth, recentWordSearches);

module.exports = router;
