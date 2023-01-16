import express, { Server, Request, Response } from 'express';
import cookieParse from 'cookie-parser';
import { connectToDatabase } from './services/database.service.js'
import dotenv from 'dotenv';

/**
 * importing all routers
 */
import userRouter from './routes/user.router.js';

dotenv.config();

connectToDatabase().then( () : void => {
    const app: Server = express();
    const port : string = process.env.PORT || '3000';

    /**
     * global middleware
     */
    app.use(express.json())
    app.use(cookieParse())

    /**
     * configuring routes
     */
    app.use('/user', userRouter)

    app.get('/', ( request: Request, response: Response ) : void => {
        response.status(200).json({
            msg: 'hello world'
        })
    })

    if (port) app.listen(port, () : void => console.log(`Server is listening on port :: ${port} ✔`) )
}).catch( (e: Error) => {
    /**
     * send mail to the manager of this project.
     */
    console.log('Server has been crashed.');
    process.exit(0);
})