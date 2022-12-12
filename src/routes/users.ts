import { IRoute } from 'express';
import { errorHandler } from '../utils';
import { APISuccess } from '../api/schema/types/success';
import { APICollection } from '../api/schema/types/collection';
import { User } from '../services/database/models';

const successMessage: APISuccess = {
    $schema: 'api:success',
    message: ''
};

export const register = (route: IRoute) => {
    route.get(async (req, res) => {
        try {
            const userCollection = (await User.findAll()) as any;

            const responseBody: APICollection = {
                $schema: 'api:collection',
                items: userCollection
            };

            res.send(responseBody);
        } catch (err) {
            errorHandler(err, res);
        }
    });

    route.post(async (req, res) => {
        try {
            let user = req.body as any;

            user = await User.create(user);
            res.status(201).send(user);
        } catch (err) {
            errorHandler(err, res);
        }
    });
};

export const registerDetail = (route: IRoute) => {
    route.get(async (req, res) => {
        try {
            const username = req.params['username'];

            const user = await User.findOne({
                where: {
                    username: username
                }
            });

            res.send(user);
        } catch (err) {
            errorHandler(err, res);
        }
    });

    route.patch(async (req, res) => {
        try {
            const username = req.params['username'];

            const user = await User.update(req.body, {
                where: {
                    username: username
                }
            });
            res.status(200).send(user);
        } catch (err) {
            errorHandler(err, res);
        }
    });

    route.delete(async (req, res) => {
        try {
            const username = req.params['username'];

            await User.destroy({
                where: {
                    username: username
                }
            });

            successMessage.message = 'User deleted';
            res.status(201).send(successMessage);
        } catch (err) {
            errorHandler(err, res);
        }
    });
};
