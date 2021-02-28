import { Application } from 'express';
import * as Version from './version';
import * as Users from './users';
import * as Services from './services';

export const register = (app: Application) => {
    // Register routes
    Version.register(app.route('/:version'));
    Users.register(app.route('/:version/users'));
    Users.registerDetail(app.route('/:version/users/:username'));
    Services.register(app.route('/:version/services'));
    Services.registerDetail(app.route('/:version/services/:service'));
    Services.registerAddition(
        app.route('/:version/services/addition/calculate')
    );
    Services.registerSubstraction(
        app.route('/:version/services/substraction/calculate')
    );
    Services.registerMultiplication(
        app.route('/:version/services/multiplication/calculate')
    );
    Services.registerDivision(
        app.route('/:version/services/division/calculate')
    );
    Services.registerSquareRoot(
        app.route('/:version/services/square_root/calculate')
    );
    Services.registerRandomString(
        app.route('/:version/services/random_string/calculate')
    );
};
