import express, {Express, NextFunction, Request, Response} from 'express';
import {userRouter} from './users/users.js';

const port: number = 8000;
const app: Express = express();

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log('Request time for main: ', new Date());
    next();
});

app.get('/hello', (req: Request, res: Response) => {
    throw new Error('My error!');
});

app.use('/users', userRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err.message);
    res.status(400).send(err.message);
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});