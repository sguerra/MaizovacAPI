import { Application } from 'express';
import * as Version from './version';

export const register = (app: Application) => {
    // Register routes
    Version.register(app.route('/:version'));
};
