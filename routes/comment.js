const express = require('express')
const router  = express.Router();
const commentsController = require('../controllers/comment')
router.post('/:postId',commentsController.addComment);
router.get('/:postId',commentsController.getComments);

module.exports = router;