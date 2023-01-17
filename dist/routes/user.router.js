import { Router } from 'express';
/**
 * import middleware
 */
import { validateUser, verifyUser, validateAuthUser } from '../middlewares/user.middleware.js';
/**
 * import controllers methods
 */
import { loginUser, registerUser, sendAuthUser } from '../controllers/user.controller.js';
const router = Router();
router.get('/', verifyUser, sendAuthUser);
router.post('/', validateUser, registerUser);
router.post('/auth', validateAuthUser, loginUser);
router.put('/:id', (request, response) => {
    response.status(201).json({
        msg: 'record updated'
    });
});
router.delete('/:id', (request, response) => {
    response.status(200).json({
        msg: 'record deleted'
    });
});
export default router;
//# sourceMappingURL=user.router.js.map