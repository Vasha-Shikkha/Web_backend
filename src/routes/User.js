const express = require('express');
const router = express.Router();
const database = require('../utils/database/database');
const registration = require('../functions/Authentication/User/registration');
const signIn = require('../functions/Authentication/User/signIn');
const signOut = require('../functions/Authentication/User/signOut');
const findMcq = require('../functions/tasks/mcq/mcq');
const findSentenceToJumble = require('../functions/tasks/fix_jumbled_sentence/fix_jumbled_sentence');
const findSentenceToMatch = require('../functions/tasks/sentence_matching/sentence_matching');
const findParagraphs = require('../functions/tasks/fill_in_the_blanks/fill_in_the_blanks');
const findWordPicture = require('../functions/tasks/word_to_picture/word_picture');
const lookUpWord = require('../functions/dictionary/dictionary');
const recentWordSearches = require('../functions/dictionary/flashcard');
const getTopics = require('../functions/topic/User/getTopics');

const user_middleware = require('../middlewares/user_auth');

//Authentication
router.post('/user/register', registration);
router.post('/user/login', signIn);
router.delete('/user/logout', signOut);

//Topics
router.get('/user/topics', user_middleware.user_auth, getTopics);

//Tasks
router.get('/user/task/mcq', findMcq);
router.get('/user/task/fix_jumbled_sentence', findSentenceToJumble);
router.get('/user/task/sentence_matching', findSentenceToMatch);
router.get('/user/task/fill_in_the_blanks', findParagraphs);
router.get('/user/task/word_to_picture', findWordPicture);

//dictionary
router.get('/dictionary', lookUpWord);

//flashCard
router.get('/flashcard/find', recentWordSearches);

module.exports = router;
