import { Router } from 'express'
import { createComment, deleteComment, getComments, updateComment } from '../controllers/comment.controller.js';
import { verifyBlogId } from '../middlewares/blog.middleware.js';
import { validateComment, verifyCommentId } from '../middlewares/comment.middleware.js';
import { verifyUser } from '../middlewares/user.middleware.js';

const router = Router();

router.get('/:id', verifyUser, verifyBlogId, getComments);
router.post('/:id', verifyUser, verifyBlogId, validateComment, createComment);
router.put('/:id', verifyUser, verifyCommentId, validateComment, updateComment);
router.delete('/:id', verifyUser, verifyCommentId, deleteComment)

export default router;