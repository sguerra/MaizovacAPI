import { Application } from 'express';
import * as Version from './version';
import * as Users from './users';
import * as Services from './services';
import * as Records from './records';

export const register = (app: Application) => {
    // Register routes
    Version.register(app.route('/:version'));
    Users.register(app.route('/:version/users'));
    Users.registerDetail(app.route('/:version/users/:username'));
    Services.register(app.route('/:version/services'));
    Services.registerDetail(app.route('/:version/services/:service'));
    Services.registerOperation(
        app.route('/:version/services/:service/calculate')
    );
    Records.register(app.route('/:version/records'));
};
