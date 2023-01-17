import { Router, Request, Response } from 'express';

/**
 * import middleware
 */
import { validateUser, verifyUser, validateAuthUser } from '../middlewares/user.middleware.js'

/**
 * import controllers methods
 */
import { loginUser, registerUser, sendAuthUser } from '../controllers/user.controller.js'

const router : Router = Router();

router.get('/', verifyUser, sendAuthUser);

router.post('/', validateUser, registerUser);

router.post('/auth', validateAuthUser, loginUser);

router.put('/:id', ( request: Request, response: Response ) : void => {
    response.status(201).json({
        msg: 'record updated'
    })
})

router.delete('/:id', ( request: Request, response: Response ) : void => {
    response.status(200).json({
        msg: 'record deleted'
    })
})

export default router;