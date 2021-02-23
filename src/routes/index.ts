import { Application } from 'express';
import * as Version from './version';
import * as Users from './users';

export const register = (app: Application) => {
    // Register routes
    Version.register(app.route('/:version'));
    Users.register(app.route('/:version/users'));
    Users.registerDetail(app.route('/:version/users/:username'));
};
