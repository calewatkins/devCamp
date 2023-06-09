const express = require('express');
const router = express.Router({ mergeParams: true });

// controllers
const { getUsers, getUser, createUser, updateUser, deleteUser } = require('../controllers/userController');

// models
const User = require('../models/User');

// middleware
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.use(authorize('admin'));

router
  .route('/')
    .get(advancedResults(User), getUsers)
    .post(createUser);
    
router
  .route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser)

module.exports = router;


