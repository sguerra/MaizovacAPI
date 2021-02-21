import { Application } from 'express';

export const register = (app: Application) => {
    app.get('/', (req, res) => {
        res.send('root');
    });
};
