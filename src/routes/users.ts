import { IRoute } from 'express';
import { APISuccess } from '../api/schema/types/success';
import { APICollection } from '../api/schema/types/collection';
import { User } from '../services/database/models';

const successMessage: APISuccess = {
    $schema: 'api:success',
    message: ''
};

export const register = (route: IRoute) => {
    route.get(async (req, res) => {
        const userCollection = await User.findAll();

        const responseBody: APICollection = {
            $schema: 'api:collection',
            items: userCollection
        };

        res.send(responseBody);
    });

    route.post(async (req, res) => {
        let user = req.body as User;

        user = await User.create(user);
        res.status(201).send(user);
    });
};

export const registerDetail = (route: IRoute) => {
    route.get(async (req, res) => {
        const username = req.params['username'];

        const user = await User.findOne({
            where: {
                username: username
            }
        });

        res.send(user);
    });

    route.patch(async (req, res) => {
        const username = req.params['username'];

        const user = await User.update(req.body, {
            where: {
                username: username
            }
        });
        res.status(200).send(user);
    });

    route.delete(async (req, res) => {
        const username = req.params['username'];

        await User.destroy({
            where: {
                username: username
            }
        });

        successMessage.message = 'User deleted';
        res.status(201).send(successMessage);
    });
};
