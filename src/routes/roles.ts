import { IRoute } from 'express';
import { errorHandler } from '../utils';
import { APICollection } from '../api/schema/types/collection';
import { User } from '../services/database/models';

export const register = (route: IRoute) => {
    route.get(async (req, res) => {
        try {
            const collection = User.rawAttributes.role.values as any;

            const responseBody: APICollection = {
                $schema: 'api:collection',
                items: collection
            };

            res.send(responseBody);
        } catch (err) {
            errorHandler(err, res);
        }
    });
};
