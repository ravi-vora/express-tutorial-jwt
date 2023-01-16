import express from 'express';
import cookieParse from 'cookie-parser';
import { connectToDatabase } from './services/database.service.js';
import dotenv from 'dotenv';
/**
 * importing all routers
 */
import userRouter from './routes/user.router.js';
import blogRouter from './routes/blog.router.js';
dotenv.config();
connectToDatabase().then(() => {
    const app = express();
    const port = process.env.PORT || '3000';
    /**
     * global middleware
     */
    app.use(express.json());
    app.use(cookieParse());
    /**
     * configuring routes
     */
    app.use('/user', userRouter);
    app.use('/blog', blogRouter);
    app.get('/', (request, response) => {
        response.status(200).json({
            msg: 'hello world'
        });
    });
    if (port)
        app.listen(port, () => console.log(`Server is listening on port :: ${port} ✔`));
}).catch((e) => {
    /**
     * send mail to the manager of this project.
     */
    console.log('Server has been crashed.');
    process.exit(0);
});
//# sourceMappingURL=index.js.map