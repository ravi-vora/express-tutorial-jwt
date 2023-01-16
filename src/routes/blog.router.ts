import { Router } from 'express'
import { validateBlog, validateBlogUpdate, verifyBlogId } from '../middlewares/blog.middleware.js';
import { verifyUser } from '../middlewares/user.middleware.js';
import { createBlog, deleteBlog, getBlog, updateBlog } from '../controllers/blog.controller.js';

const router = Router();

router.get('/:id?', verifyUser, getBlog)
router.post('/', verifyUser, validateBlog, createBlog);
router.put('/:id', verifyUser, verifyBlogId, validateBlogUpdate, updateBlog);
router.delete('/:id', verifyUser, verifyBlogId, deleteBlog)

export default router;