const express = require('express');
const router = express.Router();

const { userController } = require('../controller');
const { UserVerifier } = require('../middleware/credMiddleware');

const {
    ChangeProfile,
    FindUserEmail,
    FindUserByID,
    FindUserSearch,
    GetFriends
} = userController;

// @route    GET /api/user/:email
// @desc     Get user by email
router.put('/:id',UserVerifier,ChangeProfile);

// @route    GET /api/user/:email 
// @desc     Get user by email
router.get('/:email',UserVerifier,FindUserEmail);

// @route    GET /api/user/:_id
// @desc     Get user by id
router.get('/ID/:id',UserVerifier,FindUserByID);

// @route    GET /api/user/search
// @desc     Search users   
router.get('/search/:query',FindUserSearch);

// @route    GET /api/user/friends
// @desc     Get friends of a user
router.get('/friends/:id',UserVerifier,GetFriends);
module.exports = router;