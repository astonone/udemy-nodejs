import express, {NextFunction, Request, Response, Router} from 'express';

const userRouter: Router = express.Router();

userRouter.use((req: Request, res: Response, next: NextFunction) => {
    console.log('Request time for users: ', new Date());
    next();
});

userRouter.post('/login', (req: Request, res: Response) => {
    res.send('login');
});

userRouter.post('/register', (req: Request, res: Response) => {
    res.send('register');
});

export {userRouter};